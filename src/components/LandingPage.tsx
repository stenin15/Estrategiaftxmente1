import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

/** =========================
 * CONFIGURÁVEIS
 * ========================= */
const CHECKOUT_URL = "#checkout";
const WHATSAPP_LINK = "https://wa.me/5599999999999?text=Tenho%20d%C3%BAvidas%20sobre%20a%20Estrat%C3%A9gia%20FTX%20Mente";
const TIMER_STORAGE_KEY = "ftx_timer_start_ts";
const TIMER_DURATION_MS = 72 * 60 * 60 * 1000; // 72 horas

/** =========================
 * UTILS
 * ========================= */
function formatTime(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSec % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/** =========================
 * COMPONENTES AUXILIARES
 * ========================= */
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 px-3 py-1 text-xs font-semibold">
    {children}
  </span>
);

const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`px-6 py-16 md:py-24 max-w-6xl mx-auto ${className}`}
  >
    {children}
  </section>
);

const CTA = ({
  href = CHECKOUT_URL,
  children,
  variant = "primary",
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) => {
  const base = "inline-flex items-center justify-center rounded-2xl px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-extrabold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 animate-pulse",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600",
    outline: "border border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-black",
  } as const;
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
};

const FAQItem = ({
  q,
  a,
  openDefault = false,
}: {
  q: string;
  a: React.ReactNode;
  openDefault?: boolean;
}) => {
  const [open, setOpen] = useState(openDefault);
  return (
    <div className="rounded-2xl bg-zinc-800/60 border border-zinc-700 p-4 md:p-5">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-white">{q}</span>
        <span className="text-zinc-400">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-3 text-zinc-300 text-sm">{a}</div>}
    </div>
  );
};

const ValueStack = () => (
  <div className="bg-zinc-900/60 rounded-2xl border border-zinc-700 p-6 md:p-8 text-left max-w-xl mx-auto">
    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
      O que você recebe hoje:
    </h3>
    <ul className="space-y-3 text-zinc-300">
      <li>✅ Estratégia FTX completa (R$ 299,90)</li>
      <li>✅ Guia de Gestão & Mindset dos Insiders (R$ 99,90)</li>
      <li>✅ Checklist operacional e atualizações (R$ 49,90)</li>
      <li>✅ Suporte direto por 7 dias (R$ 49,90)</li>
    </ul>
    <div className="mt-5">
      <p className="text-zinc-400 line-through">Total: R$ 499,60</p>
      <p className="text-white text-2xl md:text-3xl font-extrabold">
        Hoje: <span className="text-emerald-400">R$ 49,90</span> 🔥
      </p>
      <p className="text-xs text-zinc-400 mt-1">
        Oferta de lançamento por tempo limitado.
      </p>
    </div>
  </div>
);

const ROICalculator = () => {
  const [capital, setCapital] = useState(500);
  const [rr, setRr] = useState(1.5);
  const [riskPct, setRiskPct] = useState(1);

  const result = React.useMemo(() => {
    const risk = (riskPct / 100) * capital;
    const expected = Math.round(risk * rr);
    return { risk, expected };
  }, [capital, rr, riskPct]);

  return (
    <div className="bg-zinc-900/60 rounded-2xl border border-zinc-700 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
        Calculadora rápida de ROI (simulação)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-zinc-300">
        <label className="flex flex-col">
          Capital (R$)
          <input
            type="number"
            min={100}
            step={50}
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
          />
        </label>
        <label className="flex flex-col">
          Risco por trade (%)
          <input
            type="number"
            step={0.5}
            value={riskPct}
            onChange={(e) => setRiskPct(Number(e.target.value))}
            className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
          />
        </label>
        <label className="flex flex-col">
          R:R médio
          <input
            type="number"
            step={0.1}
            value={rr}
            onChange={(e) => setRr(Number(e.target.value))}
            className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-white"
          />
        </label>
      </div>
      <div className="mt-4 text-zinc-300">
        <p>
          Risco por operação:{" "}
          <span className="font-bold text-white">
            R$ {result.risk.toFixed(2)}
          </span>
        </p>
        <p>
          Potencial de lucro (1 trade):{" "}
          <span className="font-bold text-emerald-400">
            R$ {result.expected.toFixed(2)}
          </span>
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          *Simulação educativa — resultados variam conforme execução e mercado.
        </p>
      </div>
    </div>
  );
};

/** =========================
 * LANDING PAGE
 * ========================= */
const LandingPage: React.FC = () => {
  const [remaining, setRemaining] = useState<number>(TIMER_DURATION_MS);

  useEffect(() => {
    let start = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!start) {
      start = Date.now().toString();
      localStorage.setItem(TIMER_STORAGE_KEY, start);
    }
    const startedAt = Number(start);
    const tick = () => {
      const now = Date.now();
      const delta = TIMER_DURATION_MS - (now - startedAt);
      setRemaining(Math.max(0, delta));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Helmet>
        <title>Estratégia FTX Mente — Domine o mercado com método</title>
        <meta
          name="description"
          content="Método validado que transforma traders comuns em lucrativos. Curso + Guia de Gestão & Mindset por R$49,90. Oferta de lançamento."
        />
        <meta property="og:title" content="Estratégia FTX Mente" />
        <meta
          property="og:description"
          content="Curso completo + Guia de Gestão & Mindset — R$49,90."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="bg-gradient-to-b from-black via-zinc-950 to-black text-white min-h-screen">
        {/* HERO */}
        <Section className="text-center">
          <div className="mb-3">
            <Badge>🎯 Oferta exclusiva por tempo limitado</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Domine o mercado com a{" "}
            <span className="text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
              Estratégia FTX
            </span>{" "}
            que transforma traders comuns em lucrativos.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto">
            Aprenda o mesmo método que insiders e{" "}
            <span className="font-semibold text-white">market makers</span> usam
            para operar com confiança — sem depender da sorte. Em menos de{" "}
            <span className="font-semibold text-white">15 min/dia</span>.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <CTA variant="primary" href={CHECKOUT_URL}>
              QUERO ACESSO IMEDIATO
            </CTA>
            <CTA variant="outline" href="#como-funciona">
              VER COMO FUNCIONA →
            </CTA>
          </div>

          <div className="mt-5 text-xs md:text-sm text-zinc-400">
            ✅ Aulas práticas • ✅ Acesso imediato • ✅ Suporte direto
          </div>
        </Section>

        {/* IDENTIFICAÇÃO */}
        <Section className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Você se identifica com isso?
          </h2>
          <ul className="mt-6 space-y-3 text-zinc-300 max-w-2xl mx-auto text-base md:text-lg">
            <li>😩 Entra em operações e sai no prejuízo?</li>
            <li>📉 Sente que o mercado está sempre contra você?</li>
            <li>⏰ Falta disciplina e gestão no dia a dia?</li>
            <li>💸 Já tentou de tudo e ainda não lucra consistentemente?</li>
          </ul>
          <p className="mt-5 text-emerald-300 text-sm md:text-base">
            Se respondeu "sim" a qualquer uma, a FTX Mente vai mudar seu jogo.
          </p>
          <div className="mt-6">
            <CTA href={CHECKOUT_URL}>COMEÇAR AGORA</CTA>
          </div>
        </Section>

        {/* BENEFÍCIOS */}
        <Section id="como-funciona" className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            O que você vai dominar dentro do método
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            {[
              "📊 Leitura de gráfico que revela a intenção dos grandes players",
              "⚙️ Gestão de risco e disciplina de elite",
              "🧠 Mindset dos insiders",
              "🚀 Setup validado e replicável",
              "💰 Estratégia que gera lucros consistentes",
            ].map((t) => (
              <div
                key={t}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 hover:border-emerald-500/40 transition-all"
              >
                <p className="text-zinc-200">{t}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CTA variant="outline" href="#antesdepois">
              Ver o Antes & Depois no Gráfico →
            </CTA>
          </div>
        </Section>

        {/* ANTES & DEPOIS SIMPLIFICADO */}
        <Section id="antesdepois" className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Veja a diferença entre operar às cegas e com método
          </h2>
          <p className="mt-3 text-zinc-300 max-w-2xl mx-auto">
            Compare o gráfico antes e depois da estratégia aplicada.
          </p>

          <div className="mt-8 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-800 p-6 rounded-xl">
                <h3 className="text-red-400 font-bold mb-4">❌ ANTES (Sem método)</h3>
                <div className="bg-gray-700 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Gráfico confuso</span>
                </div>
                <p className="text-sm text-zinc-400 mt-2">Entradas aleatórias, sem gestão</p>
              </div>
              <div className="bg-zinc-800 p-6 rounded-xl">
                <h3 className="text-emerald-400 font-bold mb-4">✅ DEPOIS (Com método)</h3>
                <div className="bg-gray-700 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Gráfico organizado</span>
                </div>
                <p className="text-sm text-zinc-400 mt-2">Entradas precisas, gestão clara</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CTA variant="secondary" href="#provas">
              Ver provas reais de resultados
            </CTA>
          </div>
        </Section>

        {/* PROVAS */}
        <Section id="provas" className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Resultados reais de quem aplicou
          </h2>
          <p className="text-zinc-300 mt-2">
            Prints e vídeos originais — sem manipulação.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/40 transition-all">
              <div className="bg-gray-700 h-48 flex items-center justify-center">
                <span className="text-gray-400">📊 Print 1</span>
              </div>
              <div className="p-4 text-left">
                <p className="text-emerald-400 font-semibold">+R$ 842</p>
                <p className="text-xs text-zinc-400">EURUSD — 10/10/2025</p>
                <p className="text-[11px] text-zinc-500 mt-1">Sem edição 🔒</p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/40 transition-all">
              <div className="bg-gray-700 h-48 flex items-center justify-center">
                <span className="text-gray-400">📈 Print 2</span>
              </div>
              <div className="p-4 text-left">
                <p className="text-emerald-400 font-semibold">+R$ 1.240</p>
                <p className="text-xs text-zinc-400">BTCUSD — 12/10/2025</p>
                <p className="text-[11px] text-zinc-500 mt-1">Sem edição 🔒</p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/40 transition-all">
              <div className="bg-gray-700 h-48 flex items-center justify-center">
                <span className="text-gray-400">🎥 Vídeo</span>
              </div>
              <div className="p-4 text-left">
                <p className="text-zinc-200 font-semibold">
                  Execução ao vivo (15s)
                </p>
                <p className="text-xs text-zinc-400">
                  Entrada explicada e saída técnica
                </p>
                <a
                  href="#video"
                  className="text-emerald-400 text-sm font-semibold inline-flex items-center gap-1 mt-2"
                >
                  Assistir agora →
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CTA href={CHECKOUT_URL}>Quero resultados assim também</CTA>
          </div>
        </Section>

        {/* VALOR PERCEBIDO */}
        <Section>
          <ValueStack />
        </Section>

        {/* OFERTA / PREÇO */}
        <Section id="oferta" className="text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Oferta especial por tempo limitado ⏰
          </h2>
          <p className="text-zinc-300 mt-2">
            Leve o curso completo + o Guia Prático de Gestão & Mindset dos
            Insiders por apenas{" "}
            <span className="text-emerald-400 font-extrabold">R$ 49,90</span>{" "}
            (de <span className="line-through text-zinc-500">R$ 119,90</span>).
          </p>

          <div className="mt-8 max-w-md mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-300">Oferta expira em:</p>
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 mt-1">
              {formatTime(remaining)}
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Bônus expira quando o timer zerar.
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <CTA href={CHECKOUT_URL}>QUERO O PACOTE COMPLETO AGORA</CTA>
            <CTA variant="outline" href="#faq">
              Ver detalhes da oferta
            </CTA>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6 text-xs text-zinc-400">
            <Badge>🛡️ Garantia 7 dias</Badge>
            <span>Pagamento 100% seguro</span>
            <span>•</span>
            <span>Acesso imediato</span>
          </div>
        </Section>

        {/* CALCULADORA ROI */}
        <Section>
          <ROICalculator />
        </Section>

        {/* FAQ */}
        <Section id="faq" className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">
            Perguntas Frequentes
          </h2>
          <div className="grid gap-4 max-w-3xl mx-auto text-left">
            <FAQItem
              q="E se eu não entender o conteúdo?"
              a="Você recebe suporte direto e pode reassistir as aulas quantas vezes quiser."
              openDefault
            />
            <FAQItem q="O acesso é vitalício?" a="Sim. Você poderá revisar o conteúdo sempre que quiser." />
            <FAQItem q="Preciso de muito capital?" a="Não. Você aprende a ajustar suas entradas ao tamanho do seu capital." />
            <FAQItem q="As provas são reais?" a="Sim — prints e vídeos originais, sem manipulação." />
            <FAQItem q="Tem garantia?" a="Sim — 7 dias de garantia incondicional." />
          </div>

          <div className="mt-8">
            <CTA href={CHECKOUT_URL}>Quero o acesso completo</CTA>
          </div>
        </Section>

        {/* CTA FINAL */}
        <div className="bg-gradient-to-r from-amber-900/40 via-zinc-900 to-emerald-900/40">
          <Section className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              🔥 Últimas horas da oferta.
            </h3>
            <p className="text-zinc-300 mt-2">
              Domine o mercado e transforme sua mentalidade de trader agora
              mesmo.
            </p>
            <div className="mt-6">
              <CTA href={CHECKOUT_URL}>GARANTIR MEU ACESSO COM DESCONTO</CTA>
            </div>
          </Section>
        </div>

        {/* RODAPÉ */}
        <footer className="text-center text-sm text-zinc-500 py-8">
          © {new Date().getFullYear()} Estratégia FTX Mente — Pagamento seguro •
          Suporte por e-mail/WhatsApp.
        </footer>

        {/* WHATSAPP FLOAT */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-50 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-full shadow-lg w-14 h-14 grid place-items-center"
          aria-label="Falar no WhatsApp"
        >
          WA
        </a>
      </div>
    </>
  );
};

export default LandingPage;