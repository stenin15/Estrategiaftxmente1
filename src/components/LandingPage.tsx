import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useEmblaCarousel from "embla-carousel-react";

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
 * COMPONENTE CARROSSEL
 * ========================= */
const ProvasCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    autoplay: { delay: 3000 },
    align: "start"
  });

  const imagens = [
    "/WhatsApp Image 2025-10-22 at 00.13.37.jpeg",
    "/WhatsApp Image 2025-10-21 at 17.07.38 (1).jpeg",
    "/WhatsApp Image 2025-10-21 at 17.07.37 (1).jpeg",
    "/WhatsApp Image 2025-10-21 at 17.07.37.jpeg",
    "/WhatsApp Image 2025-10-21 at 17.10.12 (1).jpeg",
    "/WhatsApp Image 2025-10-21 at 17.10.24 (1).jpeg",
    "/WhatsApp Image 2025-10-21 at 17.10.24.jpeg",
    "/WhatsApp Image 2025-10-21 at 17.10.34.jpeg",
    "/image (6).png",
  ];

  return (
    <div className="mt-8 overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {imagens.map((src, i) => (
          <div
            key={i}
            className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%] mx-2"
          >
            <div className="bg-zinc-900 rounded-xl shadow-lg p-2 hover:scale-105 transition-all duration-300">
              <img
                src={src}
                alt={`Prova real ${i + 1}`}
                className="rounded-lg w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
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
            <CTA variant="primary" href="#vsl">
              🎬 ASSISTIR VÍDEO GRATUITO
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

        {/* VSL - VIDEO SALES LETTER */}
        <Section id="vsl" className="text-center">
          <div className="mb-6">
            <Badge>🎥 VÍDEO EXCLUSIVO</Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            🔥 O que os <span className="text-cyan-300">Insiders</span> não querem que você saiba sobre o mercado
          </h2>
          
          <p className="text-xl text-zinc-300 max-w-4xl mx-auto mb-8">
            Neste vídeo de <span className="text-emerald-400 font-bold">15 minutos</span>, você vai descobrir o método exato que os market makers usam para manipular o mercado — e como <span className="text-white font-bold">virar o jogo a seu favor</span>.
          </p>

          {/* VÍDEO PLACEHOLDER */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">MÉTODO FTX MENTE</h3>
                  <p className="text-zinc-300">Como os insiders realmente operam</p>
                </div>
                
                {/* OVERLAY DE URGÊNCIA */}
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    ⏰ AO VIVO
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COPY PODEROSA */}
          <div className="max-w-4xl mx-auto text-left space-y-6 mb-8">
            <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-emerald-300 mb-4">🎯 O que você vai descobrir:</h3>
              <ul className="space-y-3 text-zinc-200">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>O segredo dos 0.1%</strong> — como os insiders realmente leem o mercado (não é o que você pensa)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>A manipulação exposta</strong> — os 3 sinais que os market makers deixam escapar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Setup de reversão</strong> — como entrar na direção certa antes da maioria</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Gestão de elite</strong> — o sistema que os profissionais usam para nunca quebrar</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-orange-300 mb-4">⚠️ ATENÇÃO:</h3>
              <p className="text-zinc-200 leading-relaxed">
                Este vídeo contém informações que <strong>mudarão completamente</strong> sua perspectiva sobre trading. 
                Se você está cansado de perder dinheiro e quer finalmente entender como o mercado realmente funciona, 
                <span className="text-orange-300 font-bold">assista até o final</span>.
              </p>
            </div>
          </div>

          {/* CTA SUPER FORTE */}
          <div className="space-y-4">
            <CTA variant="primary" href="#vsl" className="text-xl px-12 py-6 animate-pulse">
              🎬 ASSISTIR VÍDEO AGORA — GRÁTIS
            </CTA>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <CTA variant="outline" href="#provas">
                Ver provas reais primeiro →
              </CTA>
              <CTA variant="secondary" href="#oferta">
                Pular direto para a oferta
              </CTA>
            </div>
          </div>

          <div className="mt-6 text-sm text-zinc-400">
            ⏱️ Duração: 15 minutos • 📱 Funciona em qualquer dispositivo • 🔒 100% gratuito
          </div>
        </Section>

        {/* PROVAS COM CARROSSEL AUTOMÁTICO */}
        <Section id="provas" className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Resultados Reais na Tela 📈
          </h2>
          <p className="text-zinc-300 mt-2">
            Operações reais capturadas diretamente do app — consistência comprovada.
          </p>

          <ProvasCarousel />

          <p className="text-center text-zinc-300 max-w-2xl mx-auto mt-8">
            Cada um desses resultados é uma operação real feita por traders que aplicaram o método
            <span className="text-cyan-400 font-semibold"> FTX Mente </span>.
            Não é sorte — é estratégia.
          </p>

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