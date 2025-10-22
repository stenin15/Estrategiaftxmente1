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
    primary: "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 transform transition-all duration-300 hover:-translate-y-1",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 hover:scale-105 transform transition-all duration-300 hover:-translate-y-1",
    outline: "border border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-black hover:scale-105 transform transition-all duration-300 hover:-translate-y-1",
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

        {/* SEÇÃO DOR + SOLUÇÃO */}
        <section className="py-20 bg-zinc-950 text-white text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Você se identifica com isso?</h2>

          <div className="max-w-2xl mx-auto space-y-4 text-gray-300 mb-8">
            <p>😤 Entra em operações e vê o mercado ir contra você?</p>
            <p>📉 Sente que sempre sai antes da hora ou entra no pior momento?</p>
            <p>😔 Falta disciplina, confiança e clareza no gráfico?</p>
            <p>💭 Já tentou de tudo e ainda não consegue lucrar com consistência?</p>
          </div>

          <h3 className="text-2xl font-semibold mt-12 text-cyan-400">Então, respira… a solução está logo abaixo 👇</h3>
          <p className="text-gray-400 mt-3">
            A <span className="font-semibold text-white">FTX Mente</span> foi criada para transformar traders comuns em operadores conscientes,
            com mentalidade e setups replicáveis que funcionam no dia a dia real.
          </p>

          <button className="mt-8 bg-cyan-500 text-black font-bold px-8 py-3 rounded-full hover:bg-cyan-400 transition-all shadow-lg animate-pulseCTA">
            Quero mudar meu jogo agora →
          </button>
        </section>

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
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transform transition-all duration-300 hover:shadow-emerald-500/50">
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">MÉTODO FTX MENTE</h3>
                  <p className="text-zinc-300">Como os insiders realmente operam</p>
                </div>
                
                {/* OVERLAY DE URGÊNCIA */}
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg hover:scale-105 transform transition-all duration-300">
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
            <CTA variant="primary" href="#vsl" className="text-xl px-12 py-6">
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


        {/* BLOCO FINAL COMPACTO E CONVERSIVO */}
        <section className="py-20 bg-gradient-to-b from-zinc-950 to-zinc-900 text-white text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">🔥 Últimas Horas da Oferta</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Domine o mercado, transforme sua mentalidade e opere como os insiders.
            </p>

            <div className="bg-zinc-900 border border-cyan-500/40 rounded-2xl shadow-xl p-6 mb-8 transition hover:scale-[1.02]">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4">💎 Pacote Completo FTX Mente</h3>

              <ul className="text-gray-300 text-left mx-auto mb-6 max-w-md space-y-2">
                <li>✅ Estratégia completa (R$299,90)</li>
                <li>✅ Guia de Mindset & Gestão (R$99,90)</li>
                <li>✅ Checklist + atualizações</li>
                <li>✅ Suporte direto 7 dias</li>
              </ul>

              <p className="text-xl font-bold mb-4 text-cyan-400">
                De <span className="line-through text-gray-500">R$119,90</span> → <span className="text-white">Hoje: R$49,90</span> 🔥
              </p>

              <button className="bg-cyan-500 text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-cyan-400 transition-all animate-pulseCTA shadow-lg">
                QUERO GARANTIR MEU ACESSO AGORA →
              </button>

              <p className="text-sm text-gray-400 mt-4">
                ⏰ Oferta expira em <span className="text-cyan-400 font-semibold">{formatTime(remaining)}</span><br />
                💎 Bônus incluso apenas enquanto o cronômetro estiver ativo!
              </p>
            </div>

            <div className="flex justify-center gap-6 text-sm text-gray-400 mt-6">
              <span>💳 Pagamento seguro</span>
              <span>⚡ Acesso imediato</span>
              <span>🧠 Garantia 7 dias</span>
            </div>

            <p className="text-gray-500 text-xs mt-10 italic">
              "Quem hesita, perde o trade — e a oportunidade de virar o jogo."
            </p>
          </div>
        </section>


        {/* FAQ ANIMADO */}
        <section className="py-20 bg-zinc-950 text-white text-center">
          <h2 className="text-3xl font-bold mb-10">Perguntas Frequentes</h2>

          <div className="max-w-3xl mx-auto space-y-4 text-left">
            {[
              { q: "Preciso de muito dinheiro para começar?", a: "Não. Você aprende estratégias que funcionam mesmo com baixo capital, começando pequeno e escalando com segurança." },
              { q: "E se eu perder nas primeiras operações?", a: "O método ensina gestão de risco e mentalidade para transformar erros em aprendizado e consistência." },
              { q: "O conteúdo é atualizado?", a: "Sim. Você recebe atualizações e acesso vitalício a todo o material e novas estratégias." },
              { q: "Não tenho experiência, consigo acompanhar?", a: "Sim. O curso é didático, com passo a passo desde o zero até setups avançados." },
              { q: "As provas e prints são reais?", a: "Sim. Todas as provas são de operações reais, aplicando o mesmo setup ensinado dentro do curso." },
              { q: "Tem garantia?", a: "Sim. Você tem 7 dias de garantia incondicional para testar tudo sem risco." },
            ].map((item, i) => (
              <details key={i} className="group bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-cyan-500 transition overflow-hidden">
                <summary className="font-semibold cursor-pointer flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-cyan-400 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-gray-400 opacity-0 max-h-0 group-open:opacity-100 group-open:max-h-[200px] transition-all duration-500 ease-in-out">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10">
            <button className="bg-cyan-500 text-black font-semibold px-8 py-3 rounded-full hover:bg-cyan-400 transition-all shadow-lg animate-pulseCTA">
              Quero o acesso completo →
            </button>
          </div>
        </section>


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

      {/* CSS para animação pulseCTA */}
      <style>{`
        @keyframes pulseCTA {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-pulseCTA {
          animation: pulseCTA 2s infinite;
        }
      `}</style>
    </>
  );
};

export default LandingPage;