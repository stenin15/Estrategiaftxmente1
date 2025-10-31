import { useMemo, useState } from "react";

type QuizTFXProps = {
  onStart?: () => void;
  onComplete: () => void;
  primaryCtaHref?: string; // ex.: WhatsApp/Checkout
};

export function QuizTFX({ onStart, onComplete, primaryCtaHref }: QuizTFXProps) {
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced" | null>(null);
  const [pains, setPains] = useState<string[]>([]);
  const [commitment, setCommitment] = useState<"10m" | "30m" | "60m" | null>(null);

  const stepsTotal = 4;

  const progressPct = useMemo(() => Math.round(((stepIdx + 1) / stepsTotal) * 100), [stepIdx]);

  function next() {
    if (!hasStarted) {
      setHasStarted(true);
      onStart?.();
    }
    setStepIdx((s) => Math.min(s + 1, stepsTotal - 1));
  }

  function prev() {
    setStepIdx((s) => Math.max(s - 1, 0));
  }

  function togglePain(id: string) {
    setPains((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  const canAdvance = useMemo(() => {
    if (stepIdx === 0) return level !== null;
    if (stepIdx === 1) return pains.length >= 1;
    if (stepIdx === 2) return commitment !== null;
    return true;
  }, [stepIdx, level, pains, commitment]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-cyan-400/30 rounded-2xl shadow-2xl backdrop-blur-sm p-6 sm:p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm text-cyan-300 font-semibold mb-2">
            <span>Quiz de Personalização</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-2 bg-gray-700/60 rounded-full overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {stepIdx === 0 && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Qual seu nível hoje?</h1>
            <p className="text-gray-300 mb-6">Vamos personalizar a TFX baseado na sua experiência.</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: "beginner", label: "Iniciante", sub: "Nunca estudei a fundo" },
                { id: "intermediate", label: "Intermediário", sub: "Já operei/estudei" },
                { id: "advanced", label: "Avançado", sub: "Busco consistência" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLevel(opt.id as typeof level)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    level === opt.id
                      ? "bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-cyan-400/70"
                      : "bg-gray-800/40 border-gray-600/40 hover:border-cyan-400/40"
                  }`}
                >
                  <div className="text-white font-bold">{opt.label}</div>
                  <div className="text-gray-300 text-sm">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {stepIdx === 1 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Onde dói mais hoje?</h2>
            <p className="text-gray-300 mb-6">Selecione pelo menos uma opção.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "losses", label: "Perdas e falta de estratégia" },
                { id: "no-plan", label: "Sem plano e sem rotina clara" },
                { id: "emotion", label: "Emoção dominando a execução" },
                { id: "no-time", label: "Pouco tempo e foco" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => togglePain(opt.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    pains.includes(opt.id)
                      ? "bg-gradient-to-br from-emerald-500/25 to-green-600/25 border-emerald-400/70"
                      : "bg-gray-800/40 border-gray-600/40 hover:border-emerald-400/40"
                  }`}
                >
                  <div className="text-white font-semibold">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {stepIdx === 2 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Compromisso diário</h2>
            <p className="text-gray-300 mb-6">Quanto tempo você consegue dedicar por dia nos próximos 30 dias?</p>
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { id: "10m", label: "10 min" },
                { id: "30m", label: "30 min" },
                { id: "60m", label: "1 hora" },
                { id: "120m", label: "2 horas" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCommitment(opt.id as any)}
                  className={`p-4 rounded-xl border transition-all text-center ${
                    commitment === (opt.id as any)
                      ? "bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400/70"
                      : "bg-gray-800/40 border-gray-600/40 hover:border-yellow-400/40"
                  }`}
                >
                  <div className="text-white font-bold">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {stepIdx === 3 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Seu plano personalizado</h2>
            <p className="text-gray-300 mb-6">
              Perfeito — vamos aplicar o Método TFX com foco em {level === "beginner" ? "base sólida" : level === "intermediate" ? "rotina e execução" : "performance e consistência"}. Com {commitment ?? "30m"}/dia por 30 dias.
            </p>
            <div className="grid gap-3 mb-6">
              <div className="bg-gray-800/40 border border-gray-600/40 rounded-xl p-4 text-left">
                <div className="text-green-300 font-bold mb-1">Você recebe hoje</div>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>PDF do Método TFX (do zero ao avançado)</li>
                  <li>1 mês no grupo VIP (acompanhamento e sinais)</li>
                  <li>Planilha de gerenciamento pronta</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={primaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition-all"
              >
                🚀 Começar agora
              </a>
              <button
                onClick={onComplete}
                className="flex-1 border border-gray-600 text-gray-300 hover:text-white hover:border-white font-medium py-3 rounded-xl transition-all"
              >
                Ver site primeiro
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={stepIdx === 0}
            className={`px-4 py-2 rounded-lg border text-sm transition-all ${
              stepIdx === 0 ? "opacity-40 cursor-not-allowed border-gray-700 text-gray-500" : "border-gray-600 text-gray-300 hover:border-white hover:text-white"
            }`}
          >
            Voltar
          </button>

          {stepIdx < stepsTotal - 1 ? (
            <button
              onClick={next}
              disabled={!canAdvance}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                canAdvance
                  ? "bg-cyan-500 hover:bg-cyan-400 text-black"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Avançar
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}


