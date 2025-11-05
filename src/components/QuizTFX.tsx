import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type QuizTFXProps = {
  onStart?: () => void;
  onComplete: () => void;
  primaryCtaHref?: string; // ex.: WhatsApp/Checkout
};

const CHECKOUT_URL = "/checkout/tfx-mind";
const STORAGE_KEY = "tfx_quiz_session_v2"; // versão atualizada

// Helpers — estética cinematográfica aprimorada
const fade = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -25, transition: { duration: 0.45, ease: "easeIn" } },
};

const bgPhaseByStep = (step: number): string => {
  if (step < 3) return "from-[#160404] via-[#2b0a0a] to-[#3f1010]"; // baixa (vermelho mais intenso)
  if (step < 8) return "from-[#0b1224] via-[#142440] to-[#1f3055]"; // consciência (azul mais profundo)
  return "from-[#0d1c14] via-[#123926] to-[#1e5739]"; // alta (verde mais vibrante)
};

// Modelo das perguntas
const LEVELS = ["iniciante", "intermediario", "avancado"] as const;
type Level = typeof LEVELS[number];

// Q1 — segmentação inicial
const Q1 = {
  id: 1,
  title: "Em qual momento você está na sua jornada no mercado?",
  microcopy: "Antes de entender o gráfico, entenda onde você está na jornada.",
  options: [
    { label: "Estou começando agora (Iniciante)", value: "iniciante" },
    { label: "Já opero, mas quero consistência (Intermediário)", value: "intermediario" },
    { label: "Já vivo disso, quero aprimorar performance (Avançado)", value: "avancado" },
  ],
};

// Perguntas 2–8 — copy adaptativa por nível com microcopy emocional
const ADAPTIVE_QUESTIONS = [
  {
    id: 2,
    titleByLevel: {
      iniciante: "O mercado parece complicado, cheio de segredos e termos?",
      intermediario: "Você sente que entende o básico, mas falta consistência?",
      avancado: "Mesmo sabendo operar, o emocional ainda interfere?",
    },
    microcopy: "O primeiro passo para a clareza é reconhecer o caos.",
    options: ["Sim", "Às vezes", "Não"],
  },
  {
    id: 3,
    title: "Quando as coisas não saem como o esperado — seja no mercado ou na vida — como você costuma reagir?",
    microcopy: "O controle emocional é o divisor de águas entre quem reage e quem age com consciência.",
    subtitleByLevel: {
      iniciante: "Você vai entender por que o preço se move assim e nunca mais será pego de surpresa.",
      intermediario: "Você vai identificar onde o dinheiro inteligente entra e sai do mercado.",
      avancado: "Você vai refinar liquidez e reversão (IFC / ChoCh / IDM) com controle mental.",
    },
    options: ["Fico irritado e perco o foco facilmente", "Me frustro, mas tento entender o que errei", "Respiro fundo e espero o momento certo"],
  },
  {
    id: 4,
    title: "O que te motiva a buscar resultados no mercado?",
    microcopy: "Toda tendência de alta começa com uma decisão de mudar.",
    subtitleByLevel: {
      iniciante: "Base para liberdade financeira com consciência.",
      intermediario: "Transformar conhecimento em consistência e resultado.",
      avancado: "Alinhar mentalidade e técnica para multiplicar performance.",
    },
    options: ["Liberdade financeira", "Mudar de vida", "Viver do que gosto"],
  },
  {
    id: 5,
    title: "Quando você vê alguém tendo resultado, o que passa na sua mente?",
    microcopy: "A comparação pode ser gatilho de dúvida ou inspiração — depende de como você reage ao progresso dos outros.",
    options: ["Motivação — se eles conseguiram, eu também consigo.", "Dúvida — será que é possível pra mim?", "Pressa — quero chegar lá logo."],
  },
  {
    id: 6,
    title: "Acesso a estratégias usadas por grandes players te interessa?",
    microcopy: "O verdadeiro conhecimento está nas entrelinhas do gráfico.",
    mediaMicrocopy: "A Comunidade TFX é onde traders aprendem, evoluem e compartilham análises em tempo real. O conhecimento cresce quando é vivido em grupo.",
    options: ["Sim — quero entender o que move o mercado", "Talvez — se for realmente prático", "Já estudo — quero ver o quão avançado é"],
  },
  {
    id: 7,
    titleByLevel: {
      iniciante: "Quer materiais que expliquem o mercado de dentro pra fora e 1 mês na Comunidade TFX?",
      intermediario: "Quer dominar leitura institucional + 1 mês de Comunidade com análises em tempo real?",
      avancado: "Quer refinar entradas IFC/ChoCh/IDM + 1 mês de Comunidade com traders experientes?",
    },
    microcopy: "Você não compra um curso. Você entra em uma nova mentalidade.",
    mediaMicrocopy: "Aqui você entende o mercado de dentro pra fora. Aulas claras, diretas e baseadas em estrutura real — sem enrolação, sem achismo.",
    options: ["Quero sim", "Quero entender melhor", "Prefiro ver exemplos"],
  },
  {
    id: 8,
    title: "O que mais representa sucesso pra você?",
    microcopy: "Sucesso é consistência mental antes de ser financeira.",
    options: ["Liberdade financeira", "Paz mental e consistência", "Operar com clareza e controle"],
  },
];

// Perguntas 9–12 — comuns com microcopy
const COMMON_QUESTIONS = [
  {
    id: 9,
    title: "Você quer ter contato diário com traders, análises e alertas em tempo real?",
    microcopy: "A Comunidade TFX é onde a teoria encontra a execução.",
    mediaMicrocopy: "Na Comunidade TFX, teoria e execução andam juntas. Você acompanha operações, análises e resultados de traders reais — todos os dias.",
    options: ["Quero sim", "Talvez", "Quero conhecer antes"],
  },
  {
    id: 10,
    title: "Você já investiu em algo de trading?",
    microcopy: "Cada tentativa passada foi apenas preparação para o que realmente funciona.",
    subtitleByLevel: {
      iniciante: "Esse é o ponto de partida com base sólida e acompanhamento real.",
      intermediario: "Aqui você evolui de setup para consistência.",
      avancado: "Refine o que já domina e melhore sua execução mental.",
    },
    options: ["Sim, mas não vi resultado", "Nunca investi", "Já estudo há um tempo"],
  },
  {
    id: 11,
    title: "Pronto para entender como os grandes players realmente operam e aplicar isso?",
    microcopy: "Você está a um clique de acessar algo que poucos têm coragem de mostrar.",
    options: ["Sim — quero dominar o método TFX", "Quero começar pelo primeiro passo", "Quero ver resultados primeiro"],
  },
  {
    id: 12,
    title: "O mercado recompensa quem entende e age com consciência.",
    microcopy: "Agora é sua vez de sair da tendência de baixa.",
    options: ["Quero acesso agora →"],
  },
];

function OptionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 px-5 py-4 hover:from-emerald-400/10 hover:to-emerald-600/10 transition backdrop-blur-md shadow-md"
    >
      <span className="text-base md:text-lg leading-snug text-white">{label}</span>
    </motion.button>
  );
}

// Componente Canvas para estrutura SMC realista (HH/HL/LH/LL, BOS/ChoCH, EQH/EQL)
function CandlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animationFrameId: number;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    // --- CONFIG ---
    const total = 160;
    const speed = 0.025;
    const amplitude = 80;
    const baseHeight = 25;
    let t = 0;

    // Estrutura com HH / HL / LL / LH
    const structure: Array<{ x: number; y: number }> = [];
    let dir = 1;
    let y = h / 2;
    for (let i = 0; i < total; i++) {
      const range = amplitude * (0.5 + Math.random() * 0.5);
      y += dir * range * (Math.random() * 0.8 + 0.4);
      if (Math.random() > 0.6) dir *= -1; // inverte a tendência (ChoCH)
      structure.push({ x: (i / total) * w, y });
    }

    const candles = structure.map((p, i) => ({
      x: p.x,
      y: p.y,
      height: baseHeight + Math.random() * 40,
      color: "rgba(16,185,129,0.85)",
      wick: 8 + Math.random() * 12,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += speed;

      // fundo institucional
      ctx.fillStyle = "rgba(255,255,255,0.01)";
      ctx.fillRect(0, 0, w, h);

      // zonas de liquidez (blocos)
      ctx.fillStyle = "rgba(16,185,129,0.08)";
      ctx.fillRect(0, h * 0.65, w, h * 0.08);
      ctx.fillStyle = "rgba(239,68,68,0.08)";
      ctx.fillRect(0, h * 0.25, w, h * 0.08);

      // linha de estrutura
      ctx.beginPath();
      ctx.moveTo(structure[0].x, structure[0].y);
      for (let i = 1; i < structure.length; i++) {
        const offset =
          Math.sin(i * 0.3 + t * 2) * 5 + (Math.random() - 0.5) * 3;
        ctx.lineTo(structure[i].x, structure[i].y + offset);
      }
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.stroke();

      // candles com estrutura SMC
      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const next = candles[i + 1] || c;
        const diff = next.y - c.y;
        const isUp = diff < 0; // candle de alta
        c.color = isUp ? "rgba(16,185,129,0.8)" : "rgba(239,68,68,0.8)";

        const candleHeight = c.height * (1 + Math.abs(Math.sin(t + i * 0.2)) * 0.1);
        const posY = c.y + Math.sin(t + i * 0.2) * 10;

        // wick
        ctx.beginPath();
        ctx.moveTo(c.x + 2, posY - c.wick);
        ctx.lineTo(c.x + 2, posY + candleHeight + c.wick);
        ctx.strokeStyle = c.color.replace("0.8", "0.4");
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // corpo
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, posY, 4, candleHeight);
        ctx.shadowColor = c.color;
        ctx.shadowBlur = 8;

        // reset shadow para não afetar outros elementos
        ctx.shadowBlur = 0;
      }

      // EQH / EQL zones
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < w; i += 120) {
        const eq = h / 2 + Math.sin(t * 0.5 + i) * 60;
        ctx.moveTo(i, eq);
        ctx.lineTo(i + 80, eq);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{
        filter: "blur(0.5px) contrast(120%) saturate(130%)",
      }}
    />
  );
}

export function QuizTFX({ onStart, onComplete, primaryCtaHref }: QuizTFXProps) {
  const [step, setStep] = useState<number>(0); // 0..11 (12 passos)
  const [level, setLevel] = useState<Level | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageIndex, setImageIndex] = useState<number>(0); // Para carrossel na etapa 9

  const totalSteps = 12;
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step]);

  // Função para verificar se deve usar imagem ou vídeo
  const shouldUseImage = (step: number): boolean => {
    return step === 5 || step === 6 || step === 8 || step === 10; // Etapas 6, 7, 9 e 11 (steps 5, 6, 8, 10)
  };

  // Função para obter a imagem conforme a etapa e nível
  const getImageForStep = (step: number, level: Level | null): string[] => {
    if (step === 5) return ["/DISCORD AO VIVO.png"];
    if (step === 6) return ["/CONTEUDO E COMUNIDADE ETAPA 7.png"];
    if (step === 8) return ["/DISCORD 1.png"];
    if (step === 10) return ["/DISCORD 2.png"];
    return [];
  };

  // Função para obter o vídeo conforme a etapa e nível
  const getVideoForStep = (step: number, level: Level | null): string => {
    // Etapa 3 (step 2) - todos os níveis
    if (step === 2) {
      return "/pergunta 3.mp4";
    }
    // Etapa 4 (step 3) - todos os níveis
    if (step === 3) {
      return "/pergunta 4.mp4";
    }
    // Etapa 5 (step 4) - todos os níveis
    if (step === 4) {
      return "/pergunta 5.mp4";
    }
    // Etapa 2 (step 1) - nível avançado
    if (step === 1 && level === "avancado") {
      return "/pergunta 2 ( avançado).mp4";
    }
    // Etapa 2 (step 1) - nível intermediário
    if (step === 1 && level === "intermediario") {
      return "/pergunta 2 ( intermediario).mp4";
    }
    // Etapa 2 (step 1) - nível iniciante
    if (step === 1 && level === "iniciante") {
      return "/pergunta 2 ( iniciante).mp4";
    }
    // Para outras etapas, usar o vídeo padrão
    return "/pergunta 1.mp4";
  };

  // Limpa localStorage ao carregar - sempre começa do zero
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Reset do índice de imagem sempre que mudar de etapa
  useEffect(() => {
    setImageIndex(0); // Reset sempre que mudar de etapa
    
    // Carrossel automático apenas se houver mais de uma imagem (não usado mais na etapa 9)
    if (step === 8) {
      const images = getImageForStep(step, level);
      if (images.length > 1) {
        const interval = setInterval(() => {
          setImageIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Trocar a cada 3 segundos
        return () => clearInterval(interval);
      }
    }
  }, [step, level]);

  // Garantir que o vídeo seja reproduzido quando o componente for montado ou step mudar
  // IMPORTANTE: NÃO reproduzir vídeo se deveria usar imagem
  useEffect(() => {
    // Se deve usar imagem, pausar e ocultar o vídeo completamente
    if (shouldUseImage(step) && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.load();
      return;
    }
    
    // Só reproduzir vídeo se NÃO deveria usar imagem
    if (videoRef.current && !shouldUseImage(step)) {
      const video = videoRef.current;
      const videoSrc = getVideoForStep(step, level);
      
      // Forçar recarregamento do vídeo se o src mudar
      if (video.src !== window.location.origin + videoSrc) {
        video.src = videoSrc;
        video.load();
      }
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Vídeo iniciado com sucesso!');
          })
          .catch((error) => {
            console.log('⚠️ Erro ao reproduzir vídeo automaticamente:', error);
            // Tentar novamente após interação do usuário
            const tryPlay = () => {
              video.play().catch(() => {});
              document.removeEventListener('click', tryPlay);
              document.removeEventListener('touchstart', tryPlay);
            };
            document.addEventListener('click', tryPlay, { once: true });
            document.addEventListener('touchstart', tryPlay, { once: true });
          });
      }
    }
  }, [step, level]);

  // Salvar sessão
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, level, answers }));
      if (level) localStorage.setItem("tfx_segment", level);
    } catch {}
  }, [step, level, answers]);

  // Conteúdo da etapa atual
  const current = useMemo(() => {
    if (step === 0) return Q1;
    if (step >= 1 && step <= 7) return ADAPTIVE_QUESTIONS[step - 1];
    return COMMON_QUESTIONS[step - 8];
  }, [step]);

  // Título/subtítulo/microcopy adaptativos
  const resolveTitle = (): string => {
    if (!current) return "";
    if ("titleByLevel" in current && current.titleByLevel && level) {
      return current.titleByLevel[level] || current.title || "";
    }
    return current.title || "";
  };

  const resolveSubtitle = (): string => {
    if (!current) return "";
    if ("subtitleByLevel" in current && current.subtitleByLevel && level) {
      return current.subtitleByLevel[level] || "";
    }
    return current.subtitle || "";
  };

  const resolveMicro = (): string => {
    if (!current) return "";
    return current.microcopy || "";
  };

  const resolveMediaMicro = (): string => {
    if (!current) return "";
    if ("mediaMicrocopy" in current && current.mediaMicrocopy) {
      return current.mediaMicrocopy;
    }
    return "";
  };

  // Avançar
  const handleSelect = (label: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      onStart?.();
    }

    // Define nível na primeira pergunta
    if (step === 0) {
      const chosenLevel = Q1.options.find((o) => o.label === label)?.value;
      if (chosenLevel) setLevel(chosenLevel as Level);
    }

    // Registra resposta
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = label;
      return next;
    });

    // Tracking
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "tfx_quiz_answer",
        step: step + 1,
        level: step === 0 ? (Q1.options.find((o) => o.label === label)?.value || level) : level,
        label,
      });

      if ((window as any).ttq && typeof (window as any).ttq.track === "function") {
        (window as any).ttq.track("Browse", { step: step + 1, level: level || "undefined" });
      }
    } catch {}

    // Última etapa → checkout
    if (step === totalSteps - 1) {
      finalizeAndGo();
    } else {
      setStep((s) => s + 1);
    }
  };

  const finalizeAndGo = () => {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "tfx_quiz_complete", level, answers });

      if ((window as any).ttq && typeof (window as any).ttq.track === "function") {
        (window as any).ttq.track("CompleteRegistration", { level });
      }
    } catch {}

    // Limpa o localStorage ao completar para permitir reinício
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}

    const checkoutUrl = primaryCtaHref || CHECKOUT_URL;
    const params = new URLSearchParams({
      src: "quiz",
      level: level || "na",
    });

    // Transição final com brilho dourado
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background =
      "radial-gradient(circle at center, rgba(255,215,0,0.6) 0%, rgba(0,0,0,0.9) 70%)";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 1s ease";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    setTimeout(() => {
      if (checkoutUrl.startsWith("http") || checkoutUrl.startsWith("/")) {
        window.location.href = `${checkoutUrl}?${params.toString()}`;
      } else {
        onComplete();
      }
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative min-h-[100dvh] overflow-hidden bg-gradient-to-br ${bgPhaseByStep(step)} text-white transition-all duration-700`}
    >
      {/* Backdrop film grain + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.5))]" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8, %3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.7\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/%3E%3CfeColorMatrix type=\\'saturate\\' values=\\'0\\'/%3E%3C/filter%3E%3Crect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
        }}
      />

      {/* Fundo com candles realistas animados */}
      <CandlesCanvas />


      {/* Conteúdo */}
      <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        {/* Logo/heading pequeno */}
        <div className="mb-8 flex items-center gap-3 opacity-80">
          <div className="h-8 w-8 rounded-lg bg-white/10 backdrop-blur" />
          <span className="text-sm uppercase tracking-widest text-white/70">TFX Mind Quiz</span>
        </div>

        {/* Barra de progresso */}
        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-xs text-white/70">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-emerald-400/80 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Container relativo para o glow e card */}
        <div className="relative">
          {/* Glow dinâmico atrás do cartão */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[120px] animate-pulseGlow" />
          </div>


          {/* Card da pergunta */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8 shadow-2xl backdrop-blur-xl z-10 text-center quiz-card"
            >
              <div className="mb-6 space-y-2">
                {resolveMicro() && (
                  <p className="text-xs text-emerald-400/70 uppercase tracking-wide mb-3">
                    {resolveMicro()}
                  </p>
                )}
                <h1 className="text-2xl md:text-3xl font-bold leading-snug text-white mb-6">
                  {resolveTitle()}
                </h1>
              </div>

              {/* SEÇÃO DE MÍDIA (VÍDEO OU IMAGEM) */}
              <div className="w-full flex justify-center mb-6">
                {shouldUseImage(step) ? (
                  (() => {
                    const images = getImageForStep(step, level);
                    console.log('🔍 DEBUG - Etapa:', step + 1, 'Step:', step, 'Images:', images);
                    
                    if (images.length === 0) {
                      console.warn('⚠️ Nenhuma imagem para etapa', step + 1);
                      return null;
                    }
                    
                    return (
                      <div className="w-full md:w-[85%] flex flex-col gap-4">
                        {images.map((imgPath, idx) => {
                          const imageSrc = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
                          const encodedSrc = encodeURI(imageSrc);
                          const fullUrl = window.location.origin + encodedSrc;
                          
                          console.log(`📸 Imagem ${idx + 1}:`, {
                            original: imgPath,
                            src: imageSrc,
                            encoded: encodedSrc,
                            fullUrl: fullUrl
                          });
                          
                          return (
                            <div
                              key={`image-wrapper-${step}-${idx}`}
                              className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/30 backdrop-blur-md"
                              style={{ height: "320px", minHeight: "320px" }}
                            >
                              <img
                                key={`img-${step}-${idx}-${encodedSrc}`}
                                src={encodedSrc}
                                alt={`Media etapa ${step + 1}`}
                                className="w-full h-full object-contain"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  width: "100%",
                                  height: "100%",
                                  display: "block",
                                }}
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement;
                                  console.error('❌ ERRO ao carregar:', {
                                    src: encodedSrc,
                                    fullUrl: fullUrl,
                                    currentSrc: target.currentSrc,
                                    error: target.error
                                  });
                                  
                                  // Parar loop infinito de tentativas
                                  if (target.dataset.retryAttempted === 'true') {
                                    console.error('🛑 Parando tentativas - arquivo não encontrado');
                                    return;
                                  }
                                  
                                  // Marcar como tentado
                                  target.dataset.retryAttempted = 'true';
                                  
                                  // Tentar sem codificação apenas uma vez
                                  setTimeout(() => {
                                    if (target.src !== imageSrc) {
                                      target.src = imageSrc;
                                    }
                                  }, 500);
                                }}
                                onLoad={() => {
                                  console.log('✅ Imagem carregada:', imageSrc);
                                }}
                                loading="eager"
                                decoding="async"
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()
                ) : null}
                
                {/* SEÇÃO DE VÍDEO EM LOOP INFINITO - APENAS SE NÃO DEVERIA USAR IMAGEM */}
                {!shouldUseImage(step) && (
                  <motion.div
                    key={`video-container-${step}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-full md:w-[85%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/30 backdrop-blur-md"
                    style={{
                      height: "320px",
                      minHeight: "320px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <video
                      key={`video-element-${step}-${level}-${Date.now()}`}
                      ref={videoRef}
                      src={getVideoForStep(step, level)}
                      autoPlay
                      loop
                      playsInline
                      muted
                      preload="auto"
                      controls={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "#000000",
                        display: "block",
                      }}
                      className="transition-transform duration-500 hover:scale-105"
                      onLoadStart={() => {
                        console.log('🔄 Iniciando carregamento do vídeo:', getVideoForStep(step, level));
                      }}
                      onLoadedMetadata={(e) => {
                        const video = e.currentTarget;
                        console.log('✅ Metadados do vídeo carregados');
                        video.play().catch((err) => {
                          console.warn('⚠️ Autoplay bloqueado, tentando novamente...', err);
                        });
                      }}
                      onLoadedData={(e) => {
                        const video = e.currentTarget;
                        console.log('✅ Dados do vídeo carregados, tentando reproduzir...');
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                          playPromise
                            .then(() => {
                              console.log('✅ Vídeo reproduzindo com sucesso!');
                            })
                            .catch((err) => {
                              console.warn('⚠️ Erro ao reproduzir automaticamente:', err);
                              setTimeout(() => {
                                video.play().catch(() => {
                                  console.warn('❌ Não foi possível reproduzir após retry');
                                });
                              }, 200);
                            });
                        }
                      }}
                      onCanPlay={(e) => {
                        const video = e.currentTarget;
                        if (video.paused) {
                          video.play().catch(() => {
                            console.warn('⚠️ Vídeo pausado, tentando reproduzir...');
                          });
                        }
                      }}
                      onCanPlayThrough={(e) => {
                        const video = e.currentTarget;
                        console.log('✅ Vídeo pode ser reproduzido completamente');
                        if (video.paused) {
                          video.play().catch(() => {});
                        }
                      }}
                      onError={(e) => {
                        const video = e.currentTarget;
                        const error = video.error;
                        console.error('❌ ERRO ao carregar vídeo:', {
                          error: error ? {
                            code: error.code,
                            message: error.message,
                          } : null,
                          networkState: video.networkState,
                          readyState: video.readyState,
                          src: video.src,
                          currentSrc: video.currentSrc,
                        });
                      }}
                      onLoadStart={() => {
                        console.log('🔄 Iniciando carregamento do vídeo...');
                      }}
                      onPlay={() => {
                        console.log('▶️ Vídeo começou a reproduzir');
                      }}
                      onPause={() => {
                        console.warn('⏸️ Vídeo pausado');
                      }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Microcopy adicional abaixo da mídia */}
              {resolveMediaMicro() && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-sm text-white/80 text-center mb-6 px-4 leading-relaxed"
                >
                  {resolveMediaMicro()}
                </motion.p>
              )}

              <div className="flex flex-col gap-4">
                {step === 0
                  ? Q1.options.map((op, idx) => (
                      <OptionButton
                        key={idx}
                        label={op.label}
                        onClick={() => handleSelect(op.label)}
                      />
                    ))
                  : current.options.map((op, idx) => (
                      <OptionButton key={idx} label={op} onClick={() => handleSelect(op)} />
                    ))}
              </div>

              {/* Rodapé auxiliar */}
              <div className="mt-6 flex items-center justify-center text-xs text-white/40">
                <span>
                  Etapa {step + 1} de {totalSteps}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Disclaimers/autoridade sutil */}
        <div className="mt-8 text-center text-xs text-white/60 italic">
          <p>"TFX não é sobre sorte. É sobre leitura, mente e execução."</p>
        </div>
      </div>
    </motion.div>
  );
}



