import { useMemo, useState, useEffect } from "react";
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

// Componente de vela decorativa com glow
function Candle({ delay = 0, left = "10%", height = "40%", red = true }: { delay?: number; left?: string; height?: string; red?: boolean }) {
  return (
    <span
      className={`absolute bottom-0 w-[2px] ${
        red ? "bg-red-500/70 drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]" : "bg-emerald-400/70 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
      }`}
      style={{ left, height, animationDelay: `${delay}ms` }}
    />
  );
}

export function QuizTFX({ onStart, onComplete, primaryCtaHref }: QuizTFXProps) {
  const [step, setStep] = useState<number>(0); // 0..11 (12 passos)
  const [level, setLevel] = useState<Level | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const totalSteps = 12;
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step]);

  // Restaurar sessão
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { step: s, level: l, answers: a } = JSON.parse(raw);
        if (Array.isArray(a)) setAnswers(a);
        if (l && LEVELS.includes(l as Level)) setLevel(l as Level);
        if (typeof s === "number" && s >= 0 && s < 12) setStep(s);
      }
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

    const checkoutUrl = primaryCtaHref || CHECKOUT_URL;
    const params = new URLSearchParams({
      src: "quiz",
      level: level || "na",
    });

    if (checkoutUrl.startsWith("http") || checkoutUrl.startsWith("/")) {
      window.location.href = `${checkoutUrl}?${params.toString()}`;
    } else {
      onComplete();
    }
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

      {/* Candles decorativos (descendo nas primeiras etapas, subindo nas finais) com glow */}
      <div className={`absolute inset-0 ${step < 8 ? "animate-candlesDown" : "animate-candlesUp"}`}>
        {useMemo(() => {
          const heights = [35, 55, 28, 48, 38, 60, 40, 52, 30, 44]; // alturas fixas para consistência
          return [10, 18, 27, 36, 45, 54, 63, 72, 81, 90].map((left, i) => (
            <Candle key={i} delay={i * 50} left={`${left}%`} height={`${heights[i]}%`} red={step < 8} />
          ));
        }, [step])}
      </div>

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

        {/* Card da pergunta */}
        <AnimatePresence mode="wait">
          <motion.div key={step} {...fade} className="relative rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 space-y-2">
              {resolveMicro() && (
                <p className="text-xs text-emerald-400/70 uppercase tracking-wide">{resolveMicro()}</p>
              )}
              <h1 className="text-3xl md:text-4xl font-semibold leading-snug">{resolveTitle()}</h1>
              {resolveSubtitle() ? <p className="text-white/70 md:text-lg">{resolveSubtitle()}</p> : null}
            </div>

            <div className="grid gap-3 md:gap-4">
              {step === 0
                ? Q1.options.map((op, idx) => (
                    <OptionButton key={idx} label={op.label} onClick={() => handleSelect(op.label)} />
                  ))
                : current.options.map((op, idx) => (
                    <OptionButton key={idx} label={op} onClick={() => handleSelect(op)} />
                  ))}
            </div>

            {/* Rodapé auxiliar */}
            <div className="mt-6 flex items-center justify-between text-xs text-white/60">
              <span>
                Etapa {step + 1} de {totalSteps}
              </span>
              {level && <span className="rounded-full bg-white/10 px-3 py-1">Nível: {level}</span>}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Disclaimers/autoridade sutil */}
        <div className="mt-8 text-center text-xs text-white/60 italic">
          <p>"TFX não é sobre sorte. É sobre leitura, mente e execução."</p>
        </div>
      </div>
    </motion.div>
  );
}



