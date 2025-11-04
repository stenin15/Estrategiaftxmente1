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
    title: "Quando o preço vai contra você, o que sente?",
    microcopy: "O mercado testa sua mente antes de testar sua estratégia.",
    subtitleByLevel: {
      iniciante: "Você vai entender por que o preço se move assim e nunca mais será pego de surpresa.",
      intermediario: "Você vai identificar onde o dinheiro inteligente entra e sai do mercado.",
      avancado: "Você vai refinar liquidez e reversão (IFC / ChoCh / IDM) com controle mental.",
    },
    options: ["Raiva – parece que o mercado me caça", "Frustração – sinto que chego atrasado", "Paciência – sigo o plano"],
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
    title: "Você acredita mais em promessas ou em resultados reais?",
    microcopy: "Resultados reais incluem ganhos e perdas analisados em tempo real.",
    options: ["Quero ver resultados reais", "Prefiro conteúdo de valor antes", "Quero entender o processo"],
  },
  {
    id: 6,
    title: "Acesso a estratégias usadas por grandes players te interessa?",
    microcopy: "O verdadeiro conhecimento está nas entrelinhas do gráfico.",
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
  const [proofIndex, setProofIndex] = useState<number>(0);

  // Imagens de prova social (rotacionando automaticamente)
  const proofs = [
    "/resultado forex 1  (6).jpeg",
    "/resultado forex 2  (2).jpeg",
    "/resultado forex 3  (5).jpeg",
    "/resultado forex 4  (7).jpeg",
    "/resultado cripto 1  (1).jpeg",
    "/resultado cripto 1  (3).jpeg",
  ];

  // Troca automática de imagens a cada 4 segundos
  useEffect(() => {
    if (step === 5 || step === 8) {
      const interval = setInterval(() => {
        setProofIndex((i) => (i + 1) % proofs.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const totalSteps = 12;
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step]);

  // Função para obter imagem conforme a etapa (dentro do card)
  const getImageForStep = (step: number): string => {
    switch (step) {
      case 0:
        return "/g3.webp";
      case 1:
        return "/g4.webp";
      case 2:
        return "/g9.webp";
      case 3:
        return "/AULAS COM EXPICAÇÕES CLARAS.png";
      case 4:
        return "/resultado cripto 1  (1).jpeg";
      case 5:
        return "/binance resultado futuro.jpeg";
      case 6:
        return "/DISCORD AO VIVO.png";
      case 7:
        return "/TFX DISCORD.png";
      case 8:
        return "/resultado forex 2  (2).jpeg";
      case 9:
        return "/g12.webp";
      case 10:
        return "/resultado forex 1  (6).jpeg";
      case 11:
        return "/resultado forex 3  (5).jpeg";
      default:
        return "/g1.webp";
    }
  };

  // Função para obter background conforme a etapa (fundo)
  const getBackgroundForStep = (step: number): string => {
    switch (step) {
      case 1:
      case 2:
        return "/g4.webp";
      case 3:
      case 4:
        return "/g9.webp";
      case 5:
      case 6:
        return "/resultado cripto 2.jpeg";
      case 7:
      case 8:
        return "/DISCORD AO VIVO.png";
      case 9:
      case 10:
        return "/g12.webp";
      case 11:
      case 12:
        return "/TFX DISCORD.png";
      default:
        return "/g1.webp";
    }
  };

  // Limpa localStorage ao carregar - sempre começa do zero
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

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

      {/* Overlay com imagem de fundo dinâmica conforme etapa */}
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${getBackgroundForStep(step)})`,
          opacity: 0.3, // Mantém o gráfico visível
        }}
      />

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

          {/* Bloco de prova social entre etapas */}
          {(step === 5 || step === 8) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl shadow-emerald-500/20"
            >
              <div className="p-4 md:p-6 text-center">
                <h2 className="mb-3 text-lg md:text-2xl font-semibold text-emerald-400 animate-pulse">
                  Resultado Real • Operação TFX
                </h2>
                <p className="mb-4 text-sm text-white/70">
                  Entrada baseada em liquidez — Mitigação completa 🎯
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={proofIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      src={proofs[proofIndex]}
                      alt="Resultado real TFX"
                      className="w-full h-auto rounded-xl border border-white/10 shadow-lg object-cover max-h-[300px]"
                    />
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={(proofIndex + 1) % proofs.length}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      src={proofs[(proofIndex + 1) % proofs.length]}
                      alt="Resultado real TFX"
                      className="w-full h-auto rounded-xl border border-white/10 shadow-lg object-cover max-h-[300px]"
                    />
                  </AnimatePresence>
                </div>
                <p className="mt-4 text-xs text-emerald-400/70 italic">
                  A precisão que só quem entende fluxo institucional consegue.
                </p>
              </div>
            </motion.div>
          )}

          {/* Card da pergunta */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8 shadow-2xl backdrop-blur-xl z-10 text-center"
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

              {/* Imagem dinâmica dentro do card */}
              <motion.img
                key={step}
                src={getImageForStep(step)}
                alt="Visual TFX"
                className="rounded-2xl border border-white/10 shadow-xl mb-6 w-full md:w-[85%] mx-auto object-cover"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              />

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



