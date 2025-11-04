import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type QuizTFXProps = {
  onStart?: () => void;
  onComplete: () => void;
  primaryCtaHref?: string; // ex.: WhatsApp/Checkout
};

const CHECKOUT_URL = "/checkout/tfx-mind"; // mesmo checkout para todos
const STORAGE_KEY = "tfx_quiz_session_v1"; // guarda nível e respostas

// Helpers — estética cinematográfica
const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: "easeIn" } },
};

const bgPhaseByStep = (step: number): string => {
  if (step < 3) return "from-[#0b0b0b] via-[#220b0b] to-[#3b0f10]"; // baixa (vermelho)
  if (step < 8) return "from-[#0a0f1a] via-[#0f1d33] to-[#1c2a42]"; // consciência (azul)
  return "from-[#10221a] via-[#0d3b2a] to-[#0b4d37]"; // alta (verde)
};

// Modelo das perguntas
const LEVELS = ["iniciante", "intermediario", "avancado"] as const;
type Level = typeof LEVELS[number];

// Q1 — segmentação inicial
const Q1 = {
  id: 1,
  title: "Em qual momento você está na sua jornada no mercado?",
  options: [
    { label: "Estou começando agora (Iniciante)", value: "iniciante" },
    { label: "Já opero, mas quero consistência (Intermediário)", value: "intermediario" },
    { label: "Já vivo disso, quero aprimorar performance (Avançado)", value: "avancado" },
  ],
};

// Perguntas 2–8 — copy adaptativa por nível
const ADAPTIVE_QUESTIONS = [
  {
    id: 2,
    titleByLevel: {
      iniciante: "O mercado parece complicado, cheio de segredos e termos?",
      intermediario: "Você sente que entende o básico, mas falta consistência?",
      avancado: "Mesmo sabendo operar, o emocional ainda interfere?",
    },
    options: ["Sim", "Às vezes", "Não"],
  },
  {
    id: 3,
    title: "Quando o preço vai contra você, o que sente?",
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
    subtitle: "Aqui você vê tudo — ganhos, perdas e análises reais dentro da Comunidade TFX.",
    options: ["Quero ver resultados reais", "Prefiro conteúdo de valor antes", "Quero entender o processo"],
  },
  {
    id: 6,
    title: "Acesso a conhecimentos raros e estratégias usadas por grandes players te interessa?",
    subtitle: "Método baseado em liquidez institucional, pontos de reversão reais e mentalidade de elite.",
    options: ["Sim — quero entender o que move o mercado", "Talvez — se for realmente prático", "Já estudo — quero ver o quão avançado é"],
  },
  {
    id: 7,
    titleByLevel: {
      iniciante: "Você quer materiais que expliquem o mercado de dentro pra fora — de forma simples — e 1 mês na Comunidade TFX?",
      intermediario: "Você quer dominar leitura institucional e ter 1 mês de Comunidade com análises em tempo real?",
      avancado: "Quer refinar entradas IFC/ChoCh/IDM + 1 mês de Comunidade com traders experientes?",
    },
    options: ["Quero sim", "Quero entender melhor", "Prefiro ver exemplos"],
  },
  {
    id: 8,
    title: "O que mais representa sucesso pra você?",
    subtitle: "O método TFX te leva a isso — com técnica, mente e comunidade.",
    options: ["Liberdade financeira", "Paz mental e consistência", "Operar com clareza e controle"],
  },
];

// Perguntas 9–12 — comuns
const COMMON_QUESTIONS = [
  {
    id: 9,
    title: "Você quer ter contato diário com traders, análises e alertas em tempo real?",
    subtitle: "Ao adquirir, você recebe 1 mês gratuito na Comunidade TFX (Discord).",
    options: ["Quero sim", "Talvez", "Quero conhecer antes"],
  },
  {
    id: 10,
    title: "Você já investiu em algo de trading?",
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
    subtitle: "Você está a um clique de acessar algo que poucos têm coragem de mostrar.",
    options: ["Sim — quero dominar o método TFX", "Quero começar pelo primeiro passo", "Quero ver resultados primeiro"],
  },
  {
    id: 12,
    title: "O mercado recompensa quem entende e age com consciência.",
    subtitle: "Agora é sua vez de sair da tendência de baixa.",
    options: ["Quero acesso agora →"],
  },
];

function OptionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/10 hover:scale-[1.02] transition-all shadow-sm backdrop-blur-md"
    >
      <span className="text-base md:text-lg leading-snug text-white">{label}</span>
    </button>
  );
}

// Componente de vela decorativa
function Candle({ delay = 0, left = "10%", height = "40%", red = true }: { delay?: number; left?: string; height?: string; red?: boolean }) {
  return (
    <span
      className={`absolute bottom-0 w-[2px] ${red ? "bg-red-500/60" : "bg-emerald-400/60"} animate-pulse`}
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

  // Título/subtítulo adaptativos
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
    <div className={`relative min-h-[100dvh] overflow-hidden bg-gradient-to-br ${bgPhaseByStep(step)} text-white`}>
      {/* Backdrop film grain + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.5))]" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8, %3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%\\' height=\\'100%\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.7\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/%3E%3CfeColorMatrix type=\\'saturate\\' values=\\'0\\'/%3E%3C/filter%3E%3Crect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
        }}
      />

      {/* Candles decorativos (descendo nas primeiras etapas, subindo nas finais) */}
      <div className={`absolute inset-0 ${step < 8 ? "animate-candlesDown" : "animate-candlesUp"}`}>
        <Candle delay={0} left="10%" height="35%" red={step < 8} />
        <Candle delay={200} left="18%" height="55%" red={step < 8} />
        <Candle delay={350} left="27%" height="28%" red={step < 8} />
        <Candle delay={120} left="36%" height="48%" red={step < 8} />
        <Candle delay={260} left="45%" height="38%" red={step < 8} />
        <Candle delay={500} left="54%" height="60%" red={step < 8} />
        <Candle delay={160} left="63%" height="40%" red={step < 8} />
        <Candle delay={260} left="72%" height="52%" red={step < 8} />
        <Candle delay={380} left="81%" height="30%" red={step < 8} />
        <Candle delay={450} left="90%" height="44%" red={step < 8} />
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
          <motion.div key={step} {...fade} className="relative rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold leading-snug">{resolveTitle()}</h1>
              {resolveSubtitle() ? <p className="text-white/70 md:text-lg">{resolveSubtitle()}</p> : null}
              {step === 2 && (
                <p className="text-xs text-white/50">
                  *Dica visual: a animação mostra um candle varrendo o stop — conexão direta com a pergunta.
                </p>
              )}
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
        <div className="mt-8 text-center text-xs text-white/60">
          <p>
            Resultados reais incluem ganhos e perdas analisados em tempo real. Conteúdo com conhecimentos raros aplicados por players institucionais.
          </p>
        </div>
      </div>

    </div>
  );
}


