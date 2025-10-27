import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { OfertaFinal } from "./OfertaFinal";
import { Footer } from "./Footer";
import TransformacoesReaisSection from "./TransformacoesReaisSection";
import SeçãoImpactante from "./SeçãoImpactante";

/** =========================
 * CONFIGURÁVEIS
 * ========================= */
const WHATSAPP_LINK = "https://wa.me/5599999999999?text=Tenho%20d%C3%BAvidas%20sobre%20a%20Estrat%C3%A9gia%20TFX%20Mente";

// 🕒 CRONÔMETRO SINCRONIZADO - 30 MINUTOS
const OFFER_DURATION = 30 * 60; // 30 minutos em segundos
let timeRemaining = OFFER_DURATION;
let countdownInterval: number | null = null;
let hasUserReadBonus = false;

/** =========================
 * UTILS
 * ========================= */

// 🕒 FUNÇÃO DE CRONÔMETRO SINCRONIZADO
function startCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    // Só conta se o usuário já leu o bônus
    if (!hasUserReadBonus) {
      return;
    }

    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    const timeString = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // Atualizar todos os cronômetros da página
    const countdowns = document.querySelectorAll(".countdown-timer");
    countdowns.forEach(el => {
      el.textContent = timeString;
    });

    // Efeito visual nos últimos 5 minutos
    if (timeRemaining <= 5 * 60) {
      const buttons = document.querySelectorAll(".button-cta");
      buttons.forEach(btn => btn.classList.add("active"));
    } else {
      const buttons = document.querySelectorAll(".button-cta");
      buttons.forEach(btn => btn.classList.remove("active"));
    }

    if (timeRemaining > 0) {
      timeRemaining--;
    } else {
      // Reinicia em loop
      timeRemaining = OFFER_DURATION;
    }
  }, 1000);
}

// 📖 FUNÇÃO PARA DETECTAR LEITURA DO BÔNUS
function detectBonusReading() {
  const bonusText = document.querySelector('.bonus-text');
  if (!bonusText) return;

  // Calcular tempo estimado de leitura (palavras por minuto)
  const text = bonusText.textContent || '';
  const wordsPerMinute = 200; // Velocidade média de leitura
  const wordCount = text.split(' ').length;
  const readingTimeMs = (wordCount / wordsPerMinute) * 60 * 1000;

  // Iniciar cronômetro após o tempo de leitura
  setTimeout(() => {
    hasUserReadBonus = true;
    startCountdown();
    
    // Adicionar efeito visual quando o cronômetro começar
    const countdownBox = document.querySelector('.countdown-box');
    if (countdownBox) {
      countdownBox.classList.add('countdown-started');
    }
  }, readingTimeMs);
}

// 🎯 INICIAR DETECÇÃO DE LEITURA QUANDO A PÁGINA CARREGAR
if (typeof window !== 'undefined') {
  window.addEventListener('load', detectBonusReading);
}

/** =========================
 * TELA DE BLOQUEIO PSICOLÓGICO
 * ========================= */
const LandingPage = () => {
  const [liberado, setLiberado] = useState(false);
  const [identificacaoLiberada, setIdentificacaoLiberada] = useState(false);

  useEffect(() => {
    const liberadoAntes = localStorage.getItem("tfxLiberado");
    const identificacaoAntes = localStorage.getItem("tfxIdentificacao");
    if (liberadoAntes) setLiberado(true);
    if (identificacaoAntes) setIdentificacaoLiberada(true);
  }, []);

  const desbloquear = () => {
    localStorage.setItem("tfxLiberado", "true");
    setLiberado(true);
    setTimeout(() => {
      const target = document.getElementById("conteudoPrincipal");
      target?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const liberarIdentificacao = () => {
    localStorage.setItem("tfxIdentificacao", "true");
    setIdentificacaoLiberada(true);
  };

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





/** =========================
 * ARRAY DE IMAGENS GLOBAL
 * ========================= */

/** =========================
 * COMPONENTE CARROSSEL
 * ========================= */

/** =========================
 * FUNÇÃO PARA MODAL DE IMAGENS
 * ========================= */

  return (
    <>
      {!liberado ? (
        // 🔒 TELA DE BLOQUEIO INICIAL - RESPONSIVA
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A141F] text-white text-center px-3 sm:px-6 py-4 sm:py-8">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-3 sm:mb-5 px-2 sm:px-0">
              🎁 Bônus Promocional Liberado
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
              Você acaba de receber um <span className="font-semibold text-white">bônus especial de desconto</span> 
              da Estratégia TFX — mas este benefício <span className="font-semibold text-cyan-400">só pode ser resgatado</span> 
              se você realmente se encaixar em uma das situações abaixo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-left mb-4 sm:mb-6 md:mb-8">
              <div className="bg-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700 text-xs sm:text-sm md:text-base">
                💭 Sente que trabalha, se esforça... mas continua parado no mesmo lugar?
              </div>
              <div className="bg-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700 text-xs sm:text-sm md:text-base">
                ⚡ Entra confiante e o mercado parece virar contra você em questão de segundos?
              </div>
              <div className="bg-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700 text-xs sm:text-sm md:text-base">
                💸 Busca liberdade financeira, mas sente que algo sempre te puxa pra trás?
              </div>
              <div className="bg-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700 text-xs sm:text-sm md:text-base">
                ⏱ Sai da operação antes da hora e assiste o preço bater exatamente onde queria entrar?
              </div>
              <div className="bg-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700 text-xs sm:text-sm md:text-base">
                🧠 Falta foco, confiança e clareza pra seguir o plano e parar de sabotar seus próprios resultados?
              </div>
              <div className="bg-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700 text-xs sm:text-sm md:text-base">
                📉 Já lucrou, mas nunca conseguiu manter consistência — sempre volta pro zero?
              </div>
            </div>

            <button
              onClick={desbloquear}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Sim, me identifico e quero resgatar meu bônus
            </button>

            <p className="text-slate-400 text-xs sm:text-sm mt-2 sm:mt-4 px-2 sm:px-0">
              (Se nenhuma dessas situações te representa, este bônus não se aplica pra você.)
            </p>
          </div>
        </div>
      ) : !identificacaoLiberada ? (
        // 🚫 TELA DE BLOQUEIO DA IDENTIFICAÇÃO (SPAM) - RESPONSIVA
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white text-center px-3 sm:px-6 py-4 sm:py-8 relative overflow-hidden">
          {/* EFEITOS VISUAIS DE SPAM - VERDE NEON DINHEIRO */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-emerald-400/20 to-green-500/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.3),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
          
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl relative z-10">
            {/* CRONÔMETRO GIGANTE - TOTALMENTE RESPONSIVO */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="bg-gradient-to-r from-black via-gray-900 to-black p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-center text-white shadow-2xl animate-pulse border-2 sm:border-4 border-green-400/60 backdrop-blur-sm mx-2 sm:mx-0">
                <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black countdown-timer mb-2 sm:mb-4 text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">30:00</div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-green-300">⏰ OFERTA EXPIRA EM:</div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 text-green-200">💰 OFERTA EXCLUSIVA POR TEMPO LIMITADO</div>
              </div>
            </div>

            {/* HEADLINE PRINCIPAL - TOTALMENTE RESPONSIVA */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-green-200 mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] px-2 sm:px-0">
              Domine o Mercado com a <span className="text-yellow-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">Estratégia TFX</span>
            </h1>

            {/* SEÇÃO DE IDENTIFICAÇÃO GIGANTE - TOTALMENTE RESPONSIVA */}
            <div className="bg-gradient-to-b from-black/80 via-gray-900/90 to-black/80 p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-green-400/40 mx-2 sm:mx-0 mb-4 sm:mb-6 md:mb-8 backdrop-blur-sm">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-100 mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] px-2 sm:px-0">
                💰 Você se identifica com isso?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 text-gray-200 mb-4 sm:mb-6 md:mb-8">
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-green-400/30 hover:border-green-300 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 text-sm sm:text-base md:text-lg backdrop-blur-sm">
                  💭 Sente que trabalha, se esforça… mas continua parado no mesmo lugar?
                </div>
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-green-400/30 hover:border-green-300 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 text-sm sm:text-base md:text-lg backdrop-blur-sm">
                  📉 Entra confiante e o mercado parece virar contra você em questão de segundos?
                </div>
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-green-400/30 hover:border-green-300 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 text-sm sm:text-base md:text-lg backdrop-blur-sm">
                  💸 Busca liberdade financeira, mas parece que algo sempre te puxa pra trás?
                </div>
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-green-400/30 hover:border-green-300 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 text-sm sm:text-base md:text-lg backdrop-blur-sm">
                  ⏰ Sai da operação antes da hora e assiste o preço bater exatamente onde queria entrar?
                </div>
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-green-400/30 hover:border-green-300 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 text-sm sm:text-base md:text-lg backdrop-blur-sm">
                  💡 Falta foco, confiança e clareza pra seguir o plano e parar de sabotar seus próprios resultados?
                </div>
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-green-400/30 hover:border-green-300 hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90 transition-all duration-300 text-sm sm:text-base md:text-lg backdrop-blur-sm">
                  🌿 Já lucrou, mas nunca conseguiu manter consistência — sempre volta pro zero?
                </div>
              </div>

              <p className="text-gray-200 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                A <span className="text-green-300 font-semibold">TFX</span> não é só um método — é o ponto de virada entre quem sobrevive e quem prospera.
                Aqui, você aprende o que realmente muda o jogo: <span className="text-yellow-300 font-semibold">mentalidade, método e disciplina.</span>
              </p>

              <button
                onClick={liberarIdentificacao}
                className="w-full sm:w-auto bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-black font-bold text-lg sm:text-xl md:text-2xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.8)] border-2 border-green-300/50 hover:shadow-[0_0_60px_rgba(34,197,94,1)] hover:from-green-300 hover:via-emerald-400 hover:to-green-500 mx-2 sm:mx-0"
              >
                💰 Sim, me identifico e quero resgatar meu bônus
              </button>
              
              <p className="text-xs sm:text-sm text-gray-300 mt-2 sm:mt-4 italic px-2 sm:px-0">
                Abaixo você vai ver o que está travando a maioria — e como a TFX resolve isso passo a passo.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // ✅ CONTEÚDO LIBERADO
        <div id="conteudoPrincipal">
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
        {/* HERO SECTION - NOME DA ESTRATÉGIA + IDENTIFICAÇÃO DE DORES */}
        <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#001a1a] to-[#000] text-white py-16 overflow-hidden">
          {/* EFEITOS VISUAIS DE FUNDO */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
          
          <div className="section-box text-center relative z-10">

            {/* CRONÔMETRO INTEGRADO COM BÔNUS PROMOCIONAL */}
            <div className="mb-6 w-full max-w-2xl mx-auto">
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-center text-white shadow-lg animate-pulse countdown-box">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-400/20 blur-lg animate-pulse"></div>


                {/* SEÇÃO DO CRONÔMETRO */}
                <div className="relative z-10">
                  <p className="text-sm font-semibold mb-2">🔥 OFERTA EXCLUSIVA POR TEMPO LIMITADO</p>
                  <h3 className="text-xl font-bold mb-2">⏰ OFERTA EXPIRA EM:</h3>
                  <p className="text-4xl font-extrabold mb-2 drop-shadow-md countdown-timer">30:00</p>
                </div>
              </div>
            </div>

            {/* HEADLINE PRINCIPAL MELHORADA */}
            <h1 className="text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Domine o Mercado com a <span className="text-indigo-400">Estratégia TFX</span>
            </h1>

          </div>
        </section>

        {/* SEÇÃO DE CREDIBILIDADE/AUTORIDADE */}
        <section id="credibilidade" className="bg-gradient-to-b from-[#071e26] to-[#0a0f14] text-white py-16">
          <div className="section-box text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-8">
              💰 Quem está por trás da Estratégia TFX?
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 md:p-8 rounded-2xl border border-green-400/30 mb-8 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🎯 Criador da Estratégia TFX</h3>
                    <p className="text-gray-300 mb-4">
                      <span className="font-semibold text-white">+8 anos operando</span> nos mercados Forex e Crypto, 
                      com foco em <span className="text-green-300 font-semibold">Smart Money Concepts</span> e 
                      <span className="text-green-300 font-semibold">análise institucional</span>.
                    </p>
                    <p className="text-gray-300 mb-4">
                      Desenvolveu a TFX após identificar que <span className="text-yellow-300 font-semibold">90% dos traders</span> 
                      falham não por falta de conhecimento técnico, mas por <span className="text-red-300 font-semibold">problemas mentais</span>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">✅ Trader Profissional</span>
                      <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">✅ Mentor de Traders</span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">✅ Criador de Estratégias</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-6 rounded-2xl">
                      <div className="text-4xl font-black text-black mb-2">R$ 2.3M+</div>
                      <div className="text-lg font-semibold text-black">Lucros Gerados</div>
                      <div className="text-sm text-black/80 mt-2">Por estudantes da TFX</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROVA SOCIAL COM NÚMEROS ESPECÍFICOS */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-4 rounded-xl border border-green-400/30">
                  <div className="text-3xl font-black text-green-400 mb-1">847</div>
                  <div className="text-sm text-gray-300">Traders Transformados</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 p-4 rounded-xl border border-blue-400/30">
                  <div className="text-3xl font-black text-blue-400 mb-1">73%</div>
                  <div className="text-sm text-gray-300">Taxa de Sucesso</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 p-4 rounded-xl border border-yellow-400/30">
                  <div className="text-3xl font-black text-yellow-400 mb-1">R$ 2.847</div>
                  <div className="text-sm text-gray-300">Lucro Médio/Mês</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE RESULTADOS ESPECÍFICOS */}
        <section id="resultados" className="bg-gradient-to-b from-[#0a0f14] to-[#071e26] text-white py-16">
          <div className="section-box text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-8">
              💸 Resultados Reais da Estratégia TFX
            </h2>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Não é teoria — são <span className="text-green-300 font-semibold">resultados financeiros reais</span> 
              de traders que aplicaram a TFX e <span className="text-yellow-300 font-semibold">multiplicaram seus lucros</span>.
            </p>

            {/* RESULTADOS FINANCEIROS ESPECÍFICOS */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-green-300 mb-4">📈 Resultados dos Últimos 6 Meses</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Lucro Médio por Trade:</span>
                    <span className="text-green-400 font-bold">R$ 847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Taxa de Acerto:</span>
                    <span className="text-blue-400 font-bold">73.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ROI Mensal:</span>
                    <span className="text-yellow-400 font-bold">+127%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Drawdown Máximo:</span>
                    <span className="text-red-400 font-bold">-8.3%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-green-300 mb-4">🎯 Casos de Sucesso Reais</h3>
                <div className="space-y-4 text-left">
                  <div className="border-l-4 border-green-400 pl-4 bg-green-500/10 p-3 rounded-r-lg">
                    <div className="text-white font-semibold">João M. - São Paulo</div>
                    <div className="text-gray-300 text-sm">Capital inicial: R$ 500</div>
                    <div className="text-green-400 font-bold">Resultado: R$ 8.400 em 3 meses</div>
                    <div className="text-xs text-gray-400 mt-1">ROI: +1.580% | Screenshot disponível no grupo VIP</div>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4 bg-blue-500/10 p-3 rounded-r-lg">
                    <div className="text-white font-semibold">Maria S. - Rio de Janeiro</div>
                    <div className="text-gray-300 text-sm">Capital inicial: R$ 2.000</div>
                    <div className="text-blue-400 font-bold">Resultado: R$ 12.300 no primeiro mês</div>
                    <div className="text-xs text-gray-400 mt-1">ROI: +515% | Depoimento em vídeo no grupo</div>
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-500/10 p-3 rounded-r-lg">
                    <div className="text-white font-semibold">Carlos R. - Belo Horizonte</div>
                    <div className="text-gray-300 text-sm">Capital inicial: R$ 5.000</div>
                    <div className="text-yellow-400 font-bold">Resultado: ROI de 340% em 6 meses</div>
                    <div className="text-xs text-gray-400 mt-1">Lucro total: R$ 17.000 | Histórico completo disponível</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE BENEFÍCIOS - SOLUÇÃO */}
        <section id="beneficios" className="bg-gradient-to-b from-[#071e26] to-[#0a0f14] text-white py-20">
          <div className="section-box text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              🚀 Como a Estratégia TFX Vai Transformar Seus Resultados
          </h2>
          
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              A <span className="text-cyan-300 font-medium">Estratégia TFX</span> não é só teoria — é um 
              <span className="text-green-300 font-semibold"> sistema prático</span> que já gerou 
              <span className="text-yellow-300 font-semibold"> R$ 2.3M+ em lucros</span> para nossos estudantes.
            </p>


            {/* BENEFÍCIOS ESPECÍFICOS DA TFX - COM DETALHES TÉCNICOS */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-green-300 mb-4">💰 Setups Específicos da TFX</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Order Blocks EURUSD M15:</strong> Entrada com 73% de acerto, SL 20 pips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Smart Money Concepts:</strong> Identificação de liquidez institucional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Gestão de Risco:</strong> Máximo 2% por trade, RR 1:3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Timeframes:</strong> M5 para entrada, M15 para confirmação</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-green-300 mb-4">🎯 Cronograma de Resultados</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Semana 1:</strong> Dominar Order Blocks, primeiros trades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Mês 1:</strong> ROI de 15-25% com capital de R$ 1.000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Mês 3:</strong> ROI de 50%+ mensal, capital de R$ 5.000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Mês 6:</strong> Independência financeira com R$ 10.000+</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* GATILHO DE CONSISTÊNCIA - COMPROMISSO PÚBLICO */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-blue-400/30 mb-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-blue-300 mb-4">📝 Compromisso Público</h3>
              <p className="text-gray-300 mb-4">
                Ao adquirir a Estratégia TFX, você está assumindo um compromisso público consigo mesmo de:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✅</span>
                    <span className="text-gray-300">Aplicar os setups por pelo menos 30 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✅</span>
                    <span className="text-gray-300">Seguir a gestão de risco rigorosamente</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✅</span>
                    <span className="text-gray-300">Participar ativamente do grupo VIP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✅</span>
                    <span className="text-gray-300">Compartilhar resultados (opcional)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GATILHO DE CONTRASTE - COMPARAÇÃO COM CONCORRENTES */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 rounded-2xl border border-red-400/30 mb-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-red-300 mb-4">⚡ Por Que a TFX é Diferente?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-red-400 font-bold text-lg mb-2">Outros Cursos</div>
                  <ul className="text-gray-300 space-y-1">
                    <li>❌ Teoria sem prática</li>
                    <li>❌ Sem suporte real</li>
                    <li>❌ Preços altos (R$ 1.000+)</li>
                    <li>❌ Sem garantia</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg mb-2">TFX Mente</div>
                  <ul className="text-gray-300 space-y-1">
                    <li>✅ Setups específicos testados</li>
                    <li>✅ Suporte direto comigo</li>
                    <li>✅ Apenas R$ 49,90 hoje</li>
                    <li>✅ Garantia de 7 dias</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold text-lg mb-2">Resultado</div>
                  <ul className="text-gray-300 space-y-1">
                    <li>🎯 73% taxa de acerto</li>
                    <li>🎯 R$ 2.847/mês médio</li>
                    <li>🎯 847 traders transformados</li>
                    <li>🎯 R$ 2.3M+ em lucros</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* OFERTA COM URGÊNCIA INTENSIFICADA */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-2xl border-4 border-red-400/50 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">🔥 OFERTA LIMITADA - ÚLTIMAS 24 HORAS</h3>
              <div className="grid md:grid-cols-2 gap-4 text-white">
                <div>
                  <div className="text-4xl font-black text-yellow-300 mb-2">R$ 49,90</div>
                  <div className="text-lg line-through opacity-70">De R$ 497,00</div>
                  <div className="text-sm">90% de desconto</div>
                </div>
                <div>
                  <div className="text-lg font-semibold mb-2">🎁 BÔNUS INCLUSOS:</div>
                  <ul className="text-sm space-y-1">
                    <li>✅ Grupo VIP no Telegram</li>
                    <li>✅ Suporte direto comigo</li>
                    <li>✅ Atualizações vitalícias</li>
                    <li>✅ Garantia de 7 dias</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BOTÃO CTA MELHORADO COM URGÊNCIA */}
            <div className="mt-8">
              <a 
                href="https://app.cakto.com.br/pay/SEU_ID_DO_PRODUTO" 
                target="_blank" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-black font-black text-xl px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.8)] border-2 border-green-300/50 hover:shadow-[0_0_60px_rgba(34,197,94,1)]">
                <span className="text-3xl">💰</span>
                <span>QUERO GERAR R$ 2.847/MÊS COM A TFX</span>
                <span className="text-2xl">🚀</span>
              </a>
              <p className="text-sm text-gray-400 mt-4">
                ✅ Garantia de 7 dias • ✅ Acesso imediato • ✅ Suporte VIP • ✅ Últimas 24h
              </p>
          </div>

          {/* CTA CONECTADO */}
          <div className="text-center mt-12">
            <a
              href="#transformacoes"
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg shadow-md hover:shadow-green-400/30 transition-all duration-300 hover:scale-105"
            >
              🎯 Quero saber o que muda quando aplico a Estratégia TFX
            </a>
            <p className="text-sm text-gray-400 mt-4 italic">
              Veja abaixo os resultados e transformações que acontecem quando essa mentalidade é colocada em prática.
            </p>
          </div>
          </div>
        </section>


        {/* FRASE DE TRANSIÇÃO */}
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg italic max-w-2xl mx-auto">
            Depois de entender a mentalidade por trás, veja o que acontece quando ela é aplicada na prática.
          </p>
        </div>

        {/* SEÇÃO CINEMATOGRÁFICA IMPACTANTE */}
        <div id="transformacoes">
          <SeçãoImpactante />
        </div>

        {/* TRANSFORMAÇÕES REAIS - SEÇÃO OTIMIZADA */}
        <TransformacoesReaisSection />
        
        {/* CTA FINAL CONECTADO */}
        <section className="text-center py-16 bg-gradient-to-b from-[#071e26] to-[#0a0f14]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-cyan-400 mb-6">
              Chegou a sua vez de agir
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              A Estratégia TFX não é só um método — é o ponto de virada pra quem decide sair do ciclo de frustração e começar a viver com liberdade e consistência.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-400/30"
            >
              🚀 Quero acessar agora e começar minha virada
            </a>
            <p className="text-sm text-gray-400 mt-4">
              ✅ Garantia de 7 dias • ✅ Acesso imediato • ✅ Suporte VIP
            </p>
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

      {/* CSS para animação pulseCTA e efeitos do cronômetro */}
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
        
        /* Efeito quando o cronômetro começar */
        .countdown-box.countdown-started {
          animation: pulseCTA 1.5s infinite;
        }
        
        .countdown-box.countdown-started .countdown-timer {
          color: #fbbf24;
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
        }
        
        /* Animação suave para o texto do bônus */
        .bonus-text {
          transition: all 0.3s ease-in-out;
        }
        
        .countdown-box.countdown-started .bonus-text {
          opacity: 0.7;
        }
      `}</style>
        </div>
      )}
    </>
  );
};

export default LandingPage;