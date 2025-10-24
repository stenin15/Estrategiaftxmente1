import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useEmblaCarousel from "embla-carousel-react";
import { OfertaFinal } from "./OfertaFinal";
import { Footer } from "./Footer";

/** =========================
 * CONFIGURÁVEIS
 * ========================= */
const CHECKOUT_URL = "#checkout";
const WHATSAPP_LINK = "https://wa.me/5599999999999?text=Tenho%20d%C3%BAvidas%20sobre%20a%20Estrat%C3%A9gia%20TFX%20Mente";
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
    className={`px-6 py-8 md:py-12 max-w-6xl mx-auto ${className}`}
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
 * ARRAY DE IMAGENS GLOBAL
 * ========================= */
const imagens = [
  // Resultados de Crypto
  "/eth'1.webp",
  "/eth2.webp",
  "/libra1.webp",
  "/libra2.webp",
  "/pepe1.webp",
  "/pepe2.webp",
  
  // Resultados de Forex
  "/usd1.webp",
  "/usd2.webp",
  "/xau1.webp",
  "/xau2.webp",
  
  // Screenshots de resultados
  "/resultado cripto 1  (1).jpeg",
  "/resultado cripto 1  (3).jpeg",
  "/resultado cripto 1  (8).jpeg",
  "/resultado cripto 2.jpeg",
  "/resultado forex 1  (6).jpeg",
  "/resultado forex 2  (2).jpeg",
  "/resultado forex 3  (5).jpeg",
  "/resultado forex 4  (7).jpeg",
  
  // Imagens originais
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

/** =========================
 * COMPONENTE CARROSSEL
 * ========================= */
const ProvasCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    autoplay: { delay: 3000 },
    align: "start"
  });

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
 * FUNÇÃO PARA MODAL DE IMAGENS
 * ========================= */
const openImageModal = (src: string, index: number) => {
  // Criar modal dinamicamente
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm';
  modal.innerHTML = `
    <div class="relative max-w-4xl max-h-[90vh] mx-4">
      <img 
        src="${src}" 
        alt="Resultado ${index + 1}" 
        class="w-full h-auto rounded-2xl shadow-2xl"
      />
      <button 
        onclick="this.closest('.fixed').remove()"
        class="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        ✕
      </button>
      <div class="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg">
        <div class="text-sm font-semibold">Resultado ${index + 1}</div>
        <div class="text-xs text-green-400">Operação Real - TFX Mente</div>
      </div>
    </div>
  `;
  
  // Adicionar ao body
  document.body.appendChild(modal);
  
  // Fechar com ESC
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleKeyPress);
    }
  };
  document.addEventListener('keydown', handleKeyPress);
  
  // Fechar clicando fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      document.removeEventListener('keydown', handleKeyPress);
    }
  });
};

/** =========================
 * LANDING PAGE
 * ========================= */
const LandingPage: React.FC = () => {
  const [remaining, setRemaining] = useState<number>(TIMER_DURATION_MS);

  // Cronômetro regressivo de 2 horas
  useEffect(() => {
    let timeLeft = 2 * 60 * 60; // 2 horas em segundos
    
    function updateTimer() {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;
      
      const timerElement = document.getElementById('timer');
      if (timerElement) {
        timerElement.textContent = 
          String(hours).padStart(2, '0') + ':' +
          String(minutes).padStart(2, '0') + ':' +
          String(seconds).padStart(2, '0');
      }
      
      if (timeLeft <= 0) {
        if (timerElement) {
          timerElement.textContent = '00:00:00';
          timerElement.style.color = '#ff0000';
        }
        return;
      }
      
      timeLeft--;
      setTimeout(updateTimer, 1000);
    }
    
    updateTimer();
  }, []);

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
        <title>Estratégia TFX Mente — Domine o mercado com método</title>
        <meta
          name="description"
          content="Método validado que transforma traders comuns em lucrativos. Curso + Guia de Gestão & Mindset por R$49,90. Oferta de lançamento."
        />
        
        {/* Meta tags para tradução automática */}
        <meta http-equiv="Content-Language" content="pt-BR" />
        <meta name="language" content="Portuguese" />
        <meta name="google" content="translate" />
        <meta name="googlebot" content="translate" />
        
        {/* SEO internacional */}
        <meta name="keywords" content="trading, forex, crypto, estratégia, mercado financeiro, lucro, investimento, trading strategy, forex trading, cryptocurrency" />
        
        {/* Open Graph internacional */}
        <meta property="og:title" content="Estratégia TFX Mente" />
        <meta
          property="og:description"
          content="Curso completo + Guia de Gestão & Mindset — R$49,90."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="es_ES" />
        <meta property="og:locale:alternate" content="fr_FR" />
        <meta property="og:locale:alternate" content="de_DE" />
      </Helmet>

      <div className="bg-gradient-to-b from-black via-zinc-950 to-black text-white min-h-screen">
        {/* HERO SECTION - MELHORADO E MAIS CHAMATIVO */}
        <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#001a1a] to-[#000] text-white py-24 overflow-hidden">
          {/* EFEITOS VISUAIS DE FUNDO */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
          
          <div className="section-box text-center relative z-10">
            {/* TAG PROMOCIONAL MELHORADA */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,0,0.3)] animate-pulse">
                🔥 OFERTA EXCLUSIVA POR TEMPO LIMITADO
              </span>
            </div>

            {/* CRONÔMETRO REGRESSIVO MELHORADO */}
            <div className="mb-10 w-full max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white px-8 py-6 rounded-2xl w-full text-2xl font-bold shadow-[0_0_30px_rgba(255,0,0,0.4)] border-2 border-red-400/50">
                <div id="countdown" className="text-center">
                  <div className="text-sm mb-2 font-semibold">⏰ OFERTA EXPIRA EM:</div>
                  <div className="text-4xl md:text-5xl font-black text-yellow-300 drop-shadow-lg" id="timer">02:00:00</div>
                  <div className="text-xs mt-2 opacity-90">Não perca esta oportunidade única!</div>
                </div>
              </div>
            </div>

            {/* HEADLINE PRINCIPAL MELHORADA */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent">
                Domine o Mercado
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                com a Estratégia TFX
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold mt-6 mb-4 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Transforme traders comuns em lucrativos — em apenas 1h ou 2h por dia.
            </p>

            <p className="mt-6 text-gray-200 text-xl leading-relaxed max-w-4xl mx-auto">
              Aprenda o mesmo método que <span className="text-cyan-300 font-bold">insiders e market makers</span> usam 
              para operar com confiança — <span className="text-yellow-300 font-bold">sem depender da sorte</span>.
            </p>

            {/* BLOCO DE DESCOBERTA MELHORADO */}
            <div className="mt-12 bg-gradient-to-br from-[#021d1d] via-[#001a1a] to-[#000] border-2 border-cyan-400/30 rounded-3xl p-8 text-left shadow-[0_0_30px_rgba(0,255,255,0.2)] backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                O que você vai descobrir:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <span className="text-2xl">💎</span>
                  <div>
                    <div className="font-bold text-green-300">O segredo dos 0.1%</div>
                    <div className="text-gray-300 text-sm">como os insiders realmente leem o mercado</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <div className="font-bold text-blue-300">A manipulação exposta</div>
                    <div className="text-gray-300 text-sm">os 3 sinais que os market makers deixam escapar</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="font-bold text-purple-300">Setup de reversão</div>
                    <div className="text-gray-300 text-sm">como entrar na direção certa antes da maioria</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <div className="font-bold text-orange-300">Gestão de elite</div>
                    <div className="text-gray-300 text-sm">o sistema que os profissionais usam para nunca quebrar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÃO CTA MELHORADO */}
            <div className="mt-12">
              <a 
                href="https://app.cakto.com.br/pay/SEU_ID_DO_PRODUTO" 
                target="_blank" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-black text-xl px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.5)] border-2 border-cyan-300/50 hover:shadow-[0_0_60px_rgba(0,255,255,0.8)]">
                <span className="text-3xl">🚀</span>
                <span>QUERO O GUIA + ACESSO AO GRUPO VIP</span>
                <span className="text-2xl">⚡</span>
              </a>
              <p className="text-sm text-gray-400 mt-4">
                ✅ Garantia de 7 dias • ✅ Acesso imediato • ✅ Suporte VIP
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE IDENTIFICAÇÃO - DOR */}
        <section className="bg-[#050505] text-white py-20">
          <div className="section-box text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-cyan-400">
              😔 Você se identifica com isso?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-left text-lg text-gray-300">
              <div className="bg-[#0a0a0a]/70 border border-cyan-500/20 rounded-xl p-5 hover:bg-[#0f1a1a] transition-all duration-300 hover:shadow-[0_0_15px_#00ffff40]">
                <p>😤 Entra em operações e o mercado parece sempre ir contra você?</p>
              </div>

              <div className="bg-[#0a0a0a]/70 border border-cyan-500/20 rounded-xl p-5 hover:bg-[#0f1a1a] transition-all duration-300 hover:shadow-[0_0_15px_#00ffff40]">
                <p>📉 Sente que sempre sai antes da hora ou entra no pior momento?</p>
              </div>

              <div className="bg-[#0a0a0a]/70 border border-cyan-500/20 rounded-xl p-5 hover:bg-[#0f1a1a] transition-all duration-300 hover:shadow-[0_0_15px_#00ffff40]">
                <p>🧠 Falta disciplina, confiança e clareza pra seguir seu plano?</p>
              </div>

              <div className="bg-[#0a0a0a]/70 border border-cyan-500/20 rounded-xl p-5 hover:bg-[#0f1a1a] transition-all duration-300 hover:shadow-[0_0_15px_#00ffff40]">
                <p>💭 Já estudou tudo, mas ainda não consegue lucrar com consistência?</p>
              </div>
            </div>

            <a 
              href="#beneficios"
              className="inline-block mt-10 bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-bold text-lg px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_25px_#00ffff40]">
              ⚡ Quero mudar meu jogo agora
            </a>
          </div>
        </section>

        {/* SEÇÃO DE BENEFÍCIOS - SOLUÇÃO */}
        <section id="beneficios" className="bg-gradient-to-b from-[#071e26] to-[#0a0f14] text-white py-20">
          <div className="section-box text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              O que você vai descobrir na Estratégia TFX
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              A <span className="text-cyan-300 font-medium">TFX Mente</span> foi criada pra transformar traders comuns  
              em operadores conscientes — com mentalidade e setups que funcionam na vida real.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="bg-[#0e1a22]/70 border border-[#1e2d38] hover:border-cyan-400 transition-all duration-300 rounded-2xl shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                    Domínio da mente e controle emocional
                  </h3>
                  <p className="text-gray-300">Como pensar como os traders que realmente lucram e manter o foco mesmo nas piores fases.</p>
                </div>
              </div>

              <div className="bg-[#0e1a22]/70 border border-[#1e2d38] hover:border-cyan-400 transition-all duration-300 rounded-2xl shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                    Gestão e comportamento diário
                  </h3>
                  <p className="text-gray-300">Aprenda como se comportar no dia a dia para operar com clareza, disciplina e propósito.</p>
                </div>
              </div>

              <div className="bg-[#0e1a22]/70 border border-[#1e2d38] hover:border-cyan-400 transition-all duration-300 rounded-2xl shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                    Acesso ao grupo VIP no Telegram
                  </h3>
                  <p className="text-gray-300">Entre em um grupo exclusivo com traders e receba sinais, análises e orientações diretas.</p>
                </div>
              </div>

              <div className="bg-[#0e1a22]/70 border border-[#1e2d38] hover:border-cyan-400 transition-all duration-300 rounded-2xl shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                    O mapa do iniciante ao avançado
                  </h3>
                  <p className="text-gray-300">Mesmo que nunca tenha operado, siga o passo a passo que transforma curiosos em traders confiantes.</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <a 
                href="https://app.cakto.com.br/pay/SEU_ID_DO_PRODUTO" 
                target="_blank" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
                Quero acesso completo agora 
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* RESULTADOS REAIS - SEÇÃO PREMIUM */}
        <section className="bg-[#000814] text-white py-20">
          <div className="section-box">
          <div className="mb-8">
            <Badge>📈 RESULTADOS COMPROVADOS</Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            <span className="text-cyan-300">Resultados Reais</span> na Tela
          </h2>
          
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-12">
            Operações reais capturadas diretamente do app — <span className="text-emerald-400 font-bold">consistência comprovada</span>.
          </p>


          {/* GALERIA MESCLADA: GRÁFICOS + LUCROS DA CORRETORA */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6">Gráficos + Lucros Reais da Corretora</h3>
            
            {/* GRID ANTES E DEPOIS: GRÁFICO + RESULTADO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* OPERAÇÃO 1 */}
              <div className="results-card p-4 result">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cyan-400 text-sm">Operação Real</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/eth'1.webp", 0)}>
                    <img
                      src="/eth'1.webp"
                      alt="Gráfico Antes"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">📊</div>
                        <div className="text-xs font-semibold">Ver gráfico</div>
                      </div>
                    </div>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/resultado cripto 1  (1).jpeg", 10)}>
                    <img
                      src="/resultado cripto 1  (1).jpeg"
                      alt="Resultado Depois"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">💰</div>
                        <div className="text-xs font-semibold">Ver resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPERAÇÃO 2 */}
              <div className="results-card p-4 result">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cyan-400 text-sm">Operação Real</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/usd1.webp", 6)}>
                    <img
                      src="/usd1.webp"
                      alt="Gráfico Antes"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">📊</div>
                        <div className="text-xs font-semibold">Ver gráfico</div>
                      </div>
                    </div>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/resultado forex 1  (6).jpeg", 14)}>
                    <img
                      src="/resultado forex 1  (6).jpeg"
                      alt="Resultado Depois"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">💰</div>
                        <div className="text-xs font-semibold">Ver resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPERAÇÃO 3 */}
              <div className="results-card p-4 result">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cyan-400 text-sm">Operação Real</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/xau1.webp", 8)}>
                    <img
                      src="/xau1.webp"
                      alt="Gráfico Antes"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">📊</div>
                        <div className="text-xs font-semibold">Ver gráfico</div>
                      </div>
                    </div>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/resultado forex 2  (2).jpeg", 15)}>
                    <img
                      src="/resultado forex 2  (2).jpeg"
                      alt="Resultado Depois"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">💰</div>
                        <div className="text-xs font-semibold">Ver resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPERAÇÃO 4 */}
              <div className="results-card p-4 result">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cyan-400 text-sm">Operação Real</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/pepe1.webp", 4)}>
                    <img
                      src="/pepe1.webp"
                      alt="Gráfico Antes"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">📊</div>
                        <div className="text-xs font-semibold">Ver gráfico</div>
                      </div>
                    </div>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/resultado cripto 1  (3).jpeg", 11)}>
                    <img
                      src="/resultado cripto 1  (3).jpeg"
                      alt="Resultado Depois"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">💰</div>
                        <div className="text-xs font-semibold">Ver resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* OPERAÇÕES ADICIONAIS OCULTAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* OPERAÇÃO 5 - OCULTA */}
              <div className="results-card p-4 result hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cyan-400 text-sm">Operação Real</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/eth2.webp", 1)}>
                    <img
                      src="/eth2.webp"
                      alt="Gráfico Antes"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">📊</div>
                        <div className="text-xs font-semibold">Ver gráfico</div>
                      </div>
                    </div>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/resultado cripto 1  (8).jpeg", 12)}>
                    <img
                      src="/resultado cripto 1  (8).jpeg"
                      alt="Resultado Depois"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">💰</div>
                        <div className="text-xs font-semibold">Ver resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPERAÇÃO 6 - OCULTA */}
              <div className="results-card p-4 result hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cyan-400 text-sm">Operação Real</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/xau2.webp", 9)}>
                    <img
                      src="/xau2.webp"
                      alt="Gráfico Antes"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">📊</div>
                        <div className="text-xs font-semibold">Ver gráfico</div>
                      </div>
                    </div>
                  </div>
                  <div className="group relative cursor-pointer overflow-hidden rounded-lg" onClick={() => openImageModal("/resultado forex 3  (5).jpeg", 16)}>
                    <img
                      src="/resultado forex 3  (5).jpeg"
                      alt="Resultado Depois"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-lg mb-1">💰</div>
                        <div className="text-xs font-semibold">Ver resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* BOTÃO VER MAIS RESULTADOS */}
            <div className="text-center mt-8">
              <button 
                id="load-more-results" 
                className="load-more-btn"
                onClick={() => {
                  const hiddenResults = document.querySelectorAll('.result.hidden');
                  hiddenResults.forEach((card, index) => {
                    setTimeout(() => {
                      card.classList.remove('hidden');
                      card.classList.add('fade-in');
                    }, index * 150);
                  });
                  document.getElementById('load-more-results').style.display = 'none';
                }}
              >
                📈 Ver Mais Resultados Reais
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-zinc-400 text-sm">
                Clique em qualquer imagem para ver em tamanho completo • Gráficos + Lucros reais da corretora
              </p>
            </div>
          </div>

          {/* CTA FORTE */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-8">
            <h3 className="highlight-title mb-4">
              <span className="text-emerald-400">R$ 47.000</span> em Lucros Reais
            </h3>
            <p className="text-zinc-300 mb-6 text-lg">
              Lucros reais gerados por alunos aplicando o método TFX Mente — <span className="text-emerald-400 font-bold">100% verificáveis</span>.
            </p>
            
            {/* CONCEITOS FTX APLICADOS */}
            <div className="bg-zinc-800/50 border border-cyan-400/30 rounded-xl p-6 mb-6">
              <h4 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                🧠 Conceitos TFX Aplicados Nestas Operações
              </h4>
              <ul className="ftx-concepts">
                <li><strong>Leitura de Fluxo:</strong> Identificação de zonas de liquidez e pontos de reversão</li>
                <li><strong>Timing Perfeito:</strong> Entrada nos momentos de maior probabilidade</li>
                <li><strong>Gestão de Risco:</strong> Stop loss e take profit calculados matematicamente</li>
                <li><strong>Análise de Confluência:</strong> Múltiplos fatores confirmando a operação</li>
              </ul>
            </div>
            <div className="cta-group">
              <button className="cta-button-pulse text-lg px-8 py-4">
                🚀 Quero aplicar a Estratégia TFX agora
              </button>
              <CTA variant="outline" href="#vsl">
                Ver Método Completo →
              </CTA>
            </div>
          </div>
          </div>
        </section>

        {/* DIVISOR ANIMADO */}
        <div className="section-divider"></div>

        {/* VSL - VIDEO SALES LETTER */}
        <Section id="vsl" className="text-center section-container">
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
                  <h3 className="text-2xl font-bold text-white mb-2">MÉTODO TFX MENTE</h3>
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


        </Section>



        {/* OFERTA FINAL COM ANIMAÇÕES */}
        <OfertaFinal />


        {/* FAQ ANIMADO */}
        <section className="py-12 bg-zinc-950 text-white text-center">
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


        {/* FOOTER PROFISSIONAL */}
        <Footer />

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
        .countdown-timer {
          animation: pulseCTA 2s infinite;
        }
      `}</style>

    </>
  );
};

export default LandingPage;