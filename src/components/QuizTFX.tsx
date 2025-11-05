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

function OptionButton({ label, onClick, isFinal = false }: { label: string; onClick: () => void; isFinal?: boolean }) {
  const [isClicked, setIsClicked] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({});

  const handleClick = () => {
    setIsClicked(true);
    // Efeito de flash dourado
    setTimeout(() => {
      setIsClicked(false);
      onClick();
    }, 300);
  };

  if (isFinal) {
    // Botão especial para a etapa final
  return (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`w-full text-center rounded-xl border-2 border-transparent px-8 py-5 transition-all duration-300 backdrop-blur-md shadow-2xl relative overflow-hidden ${
          isClicked ? 'animate-golden-flash' : ''
        }`}
        style={{
          background: 'linear-gradient(135deg, #EAC76B 0%, #00FFB3 100%)',
          boxShadow: '0 0 30px rgba(234, 199, 107, 0.5), 0 0 60px rgba(0, 255, 179, 0.3)',
          ...hoverStyle,
        }}
        onHoverStart={() => {
          setHoverStyle({
            boxShadow: '0 0 40px rgba(234, 199, 107, 0.8), 0 0 80px rgba(0, 255, 179, 0.5)',
            transform: 'scale(1.05)',
          });
        }}
        onHoverEnd={() => {
          setHoverStyle({});
        }}
      >
        <span className="text-lg md:text-xl font-bold text-black relative z-10">{label}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 2 }}
      onClick={handleClick}
      className={`w-full text-left rounded-xl border border-white/10 bg-[#1A1F24] px-5 py-4 transition-all duration-300 backdrop-blur-md shadow-md relative overflow-hidden ${
        isClicked ? 'animate-golden-flash' : ''
      }`}
      style={{
        transitionDelay: '0.15s',
        ...hoverStyle,
      }}
      onHoverStart={() => {
        setHoverStyle({
          background: 'linear-gradient(135deg, rgba(234, 199, 107, 0.2), rgba(0, 255, 179, 0.2))',
        });
      }}
      onHoverEnd={() => {
        setHoverStyle({
          background: '#1A1F24',
        });
      }}
    >
      <span className="text-base md:text-lg leading-snug text-white relative z-10">{label}</span>
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
    return step === 5 || step === 6 || step === 8 || step === 10; // Etapas 6, 7, 9 e 11 (steps 5, 6, 8, 10) - etapa 1 não tem mídia
  };

  // Função para verificar se deve mostrar mídia (imagem ou vídeo)
  const shouldShowMedia = (step: number): boolean => {
    return true; // Mostrar mídia em todas as etapas, incluindo etapa 1 com vídeo inicioquiz.mp4
  };

  // Função para obter a imagem conforme a etapa e nível
  const getImageForStep = (step: number, level: Level | null): string[] => {
    // Etapa 1 (step 0) - SEM imagem, apenas textos
    if (step === 5) return ["/DISCORDAOVIVO.png"];
    if (step === 6) return ["/CONTEUDOECOMUNIDADEETAPA7.png"];
    if (step === 8) return ["/DISCORD1.png"];
    if (step === 10) return ["/DISCORD2.png"];
    return [];
  };

  // Função para obter o vídeo conforme a etapa e nível (com encoding de espaços)
  const getVideoForStep = (step: number, level: Level | null): string => {
    let videoPath = "";
    
    // Etapa 1 (step 0) - vídeo inicial inicioquiz.mp4
    if (step === 0) {
      videoPath = "/inicioquiz.mp4";
    }
    // Etapa 3 (step 2) - todos os níveis
    else if (step === 2) {
      videoPath = "/pergunta 3.mp4";
    }
    // Etapa 4 (step 3) - todos os níveis
    else if (step === 3) {
      videoPath = "/pergunta 4.mp4";
    }
    // Etapa 5 (step 4) - todos os níveis
    else if (step === 4) {
      videoPath = "/pergunta 5.mp4";
    }
    // Etapa 2 (step 1) - nível avançado
    else if (step === 1 && level === "avancado") {
      videoPath = "/pergunta 2 ( avançado).mp4";
    }
    // Etapa 2 (step 1) - nível intermediário
    else if (step === 1 && level === "intermediario") {
      videoPath = "/pergunta 2 ( intermediario).mp4";
    }
    // Etapa 2 (step 1) - nível iniciante
    else if (step === 1 && level === "iniciante") {
      videoPath = "/pergunta 2 ( iniciante).mp4";
    }
    // Para outras etapas, usar o vídeo padrão
    else {
      videoPath = "/pergunta 1.mp4";
    }
    
    // Codificar espaços e caracteres especiais na URL
    // Dividir o caminho e codificar cada parte (exceto a barra inicial)
    return videoPath.split('/').map((part, i) => {
      if (i === 0) return part; // Manter a barra inicial
      return encodeURIComponent(part);
    }).join('/');
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

  // Garantir que o vídeo seja carregado e reproduzido quando step ou level mudar
  useEffect(() => {
    // Verificar se deve mostrar vídeo
    if (!shouldShowMedia(step) || shouldUseImage(step)) {
      console.log('🔍 useEffect vídeo: Não deve mostrar vídeo', { step, shouldShowMedia: shouldShowMedia(step), shouldUseImage: shouldUseImage(step) });
      return;
    }

    let reloadTimer: number | null = null;

    // Aguardar um pouco para garantir que o elemento video foi renderizado
    const timer = setTimeout(() => {
      // Verificar se o elemento video existe
      if (!videoRef.current) {
        console.warn('⚠️ useEffect vídeo: videoRef.current não existe após delay');
        return;
      }

      const video = videoRef.current;
      const videoSrc = getVideoForStep(step, level);
      
      console.log('📹 useEffect vídeo: Configurando', { step, level, videoSrc });
      
      if (!videoSrc) {
        console.warn('⚠️ Nenhum vídeo definido para step:', step, 'level:', level);
        return;
      }

      const fullUrl = window.location.origin + videoSrc;
      const currentSrc = video.src || '';
      
      console.log('📹 Configurando vídeo:', {
        step,
        level,
        videoSrc,
        fullUrl,
        currentSrc: currentSrc.replace(window.location.origin, '')
      });

      // Sempre forçar reload completo para garantir que o vídeo correto seja carregado
      // Limpar src anterior primeiro
      video.src = '';
      video.load();
      
      // Aguardar um momento antes de definir novo src
      reloadTimer = window.setTimeout(() => {
        if (!videoRef.current) return;
        
        videoRef.current.src = videoSrc;
        videoRef.current.load();
        console.log('📹 Novo src definido:', videoRef.current.src);
        
        // Tentar reproduzir imediatamente após carregar
        const handleLoadedMetadata = () => {
          console.log('✅ Metadata carregado, tentando reproduzir...', videoRef.current?.src);
          videoRef.current?.play().catch((err) => {
            console.warn('⚠️ Erro ao reproduzir após metadata:', err);
            // Retry após 1 segundo
            setTimeout(() => {
              videoRef.current?.play().catch(() => {});
            }, 1000);
          });
        };
        
        const handleCanPlay = () => {
          console.log('✅ Vídeo pronto, tentando reproduzir...', videoRef.current?.src);
          videoRef.current?.play().catch((err) => {
            console.warn('⚠️ Erro ao reproduzir após canplay:', err);
            // Retry após 1 segundo
            setTimeout(() => {
              videoRef.current?.play().catch(() => {});
            }, 1000);
          });
        };
        
        videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
        videoRef.current.addEventListener('canplay', handleCanPlay, { once: true });
        
        // Se já estiver pronto, tentar reproduzir imediatamente
        if (videoRef.current.readyState >= 2) {
          handleCanPlay();
        }
      }, 150);
    }, 200); // Delay inicial para garantir renderização
    
    return () => {
      clearTimeout(timer);
      if (reloadTimer !== null) {
        clearTimeout(reloadTimer);
      }
    };
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

  // Avançar com delay e transição suave
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

    // Delay de 0.4s antes de transicionar
    setTimeout(() => {
      // Avançar para próxima etapa (a tela final será exibida quando step === totalSteps - 1)
      setStep((s) => s + 1);
    }, 400);
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

    // Efeito de teleporte - energia fluindo para o centro
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "radial-gradient(circle at center, rgba(0,255,179,0.8) 0%, rgba(234,199,107,0.6) 30%, rgba(0,0,0,0.95) 70%)";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.4s ease-out";
    overlay.className = "animate-teleport";
    document.body.appendChild(overlay);

    // Animação de energia fluindo
    const energyLine = document.createElement("div");
    energyLine.style.position = "fixed";
    energyLine.style.inset = "0";
    energyLine.style.background = "linear-gradient(90deg, transparent, rgba(0,255,179,0.8), transparent)";
    energyLine.style.zIndex = "10000";
    energyLine.style.transform = "translateX(-100%)";
    energyLine.style.transition = "transform 0.4s ease-out";
    document.body.appendChild(energyLine);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      energyLine.style.transform = "translateX(100%)";
    });

    setTimeout(() => {
      if (checkoutUrl.startsWith("http") || checkoutUrl.startsWith("/")) {
        window.location.href = `${checkoutUrl}?${params.toString()}`;
      } else {
        onComplete();
      }
    }, 400);
  };

  // Componente de partículas ascendentes
  const ParticlesBackground = () => {
  return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    );
  };

  // Componente de barra de progresso interativa
  const InteractiveProgressBar = () => {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }, [progress]);

    return (
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between text-xs text-white/70">
          <span className="font-semibold">Progresso</span>
          <motion.span
            key={progress}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-bold"
            style={{
              color: '#00FFB3',
              animation: 'countUp 0.5s ease-out forwards',
            }}
          >
            {displayProgress}%
          </motion.span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              background: 'linear-gradient(90deg, #00FFB3 0%, #00845A 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Partículas de luz correndo sobre a barra */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px rgba(0, 255, 179, 0.8)',
                  top: '50%',
                  left: `${(i * 33) % 100}%`,
                  transform: 'translateY(-50%)',
                  animation: 'energyFlow 2s ease-in-out infinite',
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
            {/* Efeito de pulso ao atingir 100% */}
            {progress === 100 && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,255,179,0.5) 0%, transparent 70%)',
                  animation: 'unlockPulse 1s ease-in-out infinite',
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    );
  };

  // Componente de onda de energia entre etapas
  const EnergyWave = ({ isActive }: { isActive: boolean }) => {
    if (!isActive) return null;
    return (
      <motion.div
        className="absolute inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFB3]/30 to-transparent animate-energy-wave" />
      </motion.div>
    );
  };

  // Componente de partículas douradas para a tela final
  const GoldenParticles = () => {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#EAC76B] rounded-full animate-golden-particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              boxShadow: '0 0 10px rgba(234, 199, 107, 0.8)',
            }}
          />
        ))}
      </div>
    );
  };

  // Tela final especial (Etapa 12)
  const FinalScreen = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        {/* Efeito de escurecimento gradual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/80 z-10"
        />

        {/* Linha de energia atravessando o fundo */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-20"
        >
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFB3] to-transparent" />
        </motion.div>

        {/* Partículas douradas */}
        <GoldenParticles />

        {/* Conteúdo central */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-30 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
            }}
          >
            Você acaba de provar que não é o mercado que muda — é a mente que evolui.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-[#00FFB3] font-semibold mb-10 text-blur-glow"
          >
            Bem-vindo ao próximo nível da Consciência TFX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center"
          >
            <OptionButton
              label="Quero acesso agora →"
              onClick={() => finalizeAndGo()}
              isFinal={true}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  // Se for após a última pergunta (step === totalSteps), mostrar tela final
  // Quando o usuário responde a última pergunta (step === totalSteps - 1), step avança para totalSteps
  if (step === totalSteps) {
    return <FinalScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[100dvh] overflow-hidden text-white transition-all duration-700"
      style={{
        background: 'linear-gradient(to bottom right, #0B0C10, #10161A)',
        position: 'relative',
      }}
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

      {/* Partículas ascendentes no fundo */}
      <ParticlesBackground />

      {/* Fundo com candles realistas animados */}
      <CandlesCanvas />


      {/* Conteúdo - Centralizado vertical e horizontalmente */}
      <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24 flex flex-col justify-center min-h-[calc(100dvh-120px)]">
        {/* Título centralizado com animações - VERSÃO ATUALIZADA */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6"
          style={{ 
            marginBottom: '24px',
            paddingTop: '20px'
          }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{
              textShadow: '0 0 20px rgba(0, 255, 179, 0.5), 0 0 40px rgba(0, 255, 179, 0.3)',
              animation: 'titleGlow 3s ease-in-out infinite',
              color: '#FFFFFF',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            TFX MIND QUIZ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl font-semibold"
            style={{
              color: '#00FFB3',
              textShadow: '0 0 10px rgba(0, 255, 179, 0.5), 0 0 20px rgba(0, 255, 179, 0.3)',
              fontWeight: '600',
            }}
          >
            Ative sua mente. Decodifique o mercado.
          </motion.p>
        </motion.div>

        {/* Barra de progresso interativa */}
        <InteractiveProgressBar />

        {/* Container relativo para o glow e card */}
        <div className="relative">
          {/* Glow dourado externo atrás do cartão */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div 
              className="h-[500px] w-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(234, 199, 107, 0.3) 0%, transparent 70%)',
                filter: 'blur(120px)',
                animation: 'goldenGlow 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Card da pergunta com estilo melhorado - Centralizado e sem área de mídia */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-[18px] border border-white/10 p-8 md:p-10 lg:p-12 shadow-2xl z-10 text-center quiz-card"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 30px rgba(234, 199, 107, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Conteúdo centralizado - Microcopy, Título e Opções */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center space-y-6 md:space-y-8"
              >
                {/* Microcopy - Texto verde superior */}
                {resolveMicro() && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="text-sm md:text-base font-semibold text-center px-4 max-w-2xl"
                    style={{
                      color: '#00FFB3',
                      textShadow: '0 0 10px rgba(0, 255, 179, 0.5), 0 0 20px rgba(0, 255, 179, 0.3)',
                    }}
                  >
                    {resolveMicro()}
                  </motion.p>
                )}
                
                {/* Título da pergunta - Centralizado */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white text-center px-4 max-w-3xl"
                  style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {resolveTitle()}
                </motion.h1>

                {/* Botões de resposta - Centralizados com espaçamento harmonioso */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-4 w-full max-w-2xl px-4 mt-6 md:mt-8"
                >
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
              </motion.div>

              </motion.div>
              
              {/* Rodapé auxiliar - Etapa */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 md:mt-10 flex items-center justify-center text-xs text-white/40"
              >
                <span>
                  Etapa {step + 1} de {totalSteps}
                </span>
              </motion.div>
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



