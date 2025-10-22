import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useEmblaCarousel from "embla-carousel-react";
import { OfertaFinal } from "./OfertaFinal";

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
        <div class="text-xs text-green-400">Operação Real - FTX Mente</div>
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
        {/* HERO + BLOCO "O QUE VOCÊ VAI DESCOBRIR" */}
        <section className="hero py-20 text-white text-center px-6">
          <div className="max-w-4xl mx-auto">
            {/* TAG PROMOCIONAL */}
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full uppercase tracking-widest font-semibold mb-4 inline-block">
              Oferta exclusiva por tempo limitado
            </span>

            {/* HEADLINE PRINCIPAL */}
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
              Domine o mercado com a <span className="text-cyan-400">Estratégia FTX</span><br />
              que transforma traders comuns em lucrativos.
            </h1>

            {/* SUBHEADLINE */}
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Aprenda o mesmo método que insiders e market makers usam para operar com confiança —
              sem depender da sorte. Em menos de <span className="text-white font-semibold">15 min/dia</span>.
            </p>

            {/* CTAS */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <button className="bg-cyan-500 text-black font-bold px-8 py-4 rounded-full hover:bg-cyan-400 transition-all shadow-lg">
                ▶️ Assistir vídeo gratuito
              </button>
              <button className="border border-cyan-400 text-cyan-400 font-semibold px-8 py-4 rounded-full hover:bg-cyan-400 hover:text-black transition-all">
                Ver como funciona →
              </button>
            </div>

            {/* BLOCO DE DESCOBERTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-left max-w-3xl mx-auto shadow-lg">
              <h2 className="text-green-400 font-bold text-xl sm:col-span-2 mb-2 flex items-center gap-2">
                🎯 O que você vai descobrir:
              </h2>
              <ul className="space-y-3 text-gray-300 col-span-2">
                <li>✅ <span className="font-semibold text-white">O segredo dos 0.1%</span> — como os insiders realmente leem o mercado (e o que ninguém comenta).</li>
                <li>✅ <span className="font-semibold text-white">A manipulação exposta</span> — os 3 sinais que os market makers deixam escapar.</li>
                <li>✅ <span className="font-semibold text-white">Setup de reversão</span> — como entrar na direção certa antes da maioria.</li>
                <li>✅ <span className="font-semibold text-white">Gestão de elite</span> — o sistema que os profissionais usam para nunca quebrar.</li>
              </ul>
            </div>

            {/* BADGES DE CONFIANÇA */}
            <div className="flex justify-center gap-4 text-gray-400 text-sm mt-6">
              <span>📚 Aulas práticas</span>
              <span>⚡ Acesso imediato</span>
              <span>💬 Suporte direto</span>
            </div>
          </div>
        </section>

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

        {/* RESULTADOS REAIS - SEÇÃO PREMIUM */}
        <Section id="resultados-reais" className="text-center">
          <div className="mb-8">
            <Badge>📈 RESULTADOS COMPROVADOS</Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            <span className="text-cyan-300">Resultados Reais</span> na Tela
          </h2>
          
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-12">
            Operações reais capturadas diretamente do app — <span className="text-emerald-400 font-bold">consistência comprovada</span>.
          </p>

          {/* GRID DE RESULTADOS MODERNO */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* CARD CRYPTO */}
            <div className="group bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-semibold text-yellow-400">CRYPTO</span>
                </div>
                <span className="text-xs text-green-400 font-bold">+127%</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">ETH/USDT</span>
                  <span className="text-green-400 font-bold">+$2,340</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">PEPE/USDT</span>
                  <span className="text-green-400 font-bold">+$1,890</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">LIBRA/USDT</span>
                  <span className="text-green-400 font-bold">+$3,120</span>
                </div>
              </div>
            </div>

            {/* CARD FOREX */}
            <div className="group bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-semibold text-blue-400">FOREX</span>
                </div>
                <span className="text-xs text-green-400 font-bold">+89%</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">GBP/USD</span>
                  <span className="text-green-400 font-bold">+$1,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">USD/JPY</span>
                  <span className="text-green-400 font-bold">+$980</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">XAU/USD</span>
                  <span className="text-green-400 font-bold">+$2,100</span>
                </div>
              </div>
            </div>

            {/* CARD ESTATÍSTICAS */}
            <div className="group bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm font-semibold text-emerald-400">ESTATÍSTICAS</span>
                </div>
                <span className="text-xs text-green-400 font-bold">94% WIN</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Taxa de Acerto</span>
                  <span className="text-emerald-400 font-bold">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Lucro Médio</span>
                  <span className="text-emerald-400 font-bold">+$1,850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Operações/Mês</span>
                  <span className="text-emerald-400 font-bold">47</span>
                </div>
              </div>
            </div>
          </div>

          {/* GALERIA DE IMAGENS CLICÁVEIS */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6">Screenshots Reais das Operações</h3>
            
            {/* GRID DE IMAGENS CLICÁVEIS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagens.slice(0, 8).map((src, i) => (
                <div
                  key={i}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900 border border-zinc-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                  onClick={() => openImageModal(src, i)}
                >
                  <img
                    src={src}
                    alt={`Resultado ${i + 1}`}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl mb-1">🔍</div>
                      <div className="text-xs font-semibold">Clique para ampliar</div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    +{Math.floor(Math.random() * 200) + 50}%
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-zinc-400 text-sm">
                Clique em qualquer imagem para ver em tamanho completo
              </p>
            </div>
          </div>

          {/* CTA FORTE */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-emerald-400">R$ 47.890</span> em Lucros Reais
            </h3>
            <p className="text-zinc-300 mb-6">
              Esses são apenas alguns dos resultados que nossos alunos estão obtendo aplicando o método FTX Mente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTA variant="primary" href={CHECKOUT_URL} className="text-lg px-8 py-4">
                🚀 QUERO RESULTADOS ASSIM TAMBÉM
              </CTA>
              <CTA variant="outline" href="#vsl">
                Ver Método Completo →
              </CTA>
            </div>
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


        {/* OFERTA FINAL COM ANIMAÇÕES */}
        <OfertaFinal />


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