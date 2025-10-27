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

  useEffect(() => {
    const liberadoAntes = localStorage.getItem("tfxLiberado");
    if (liberadoAntes) setLiberado(true);
  }, []);

  const desbloquear = () => {
    localStorage.setItem("tfxLiberado", "true");
    setLiberado(true);
    setTimeout(() => {
      const target = document.getElementById("conteudoPrincipal");
      target?.scrollIntoView({ behavior: "smooth" });
    }, 400);
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
        // 🔒 TELA DE BLOQUEIO
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A141F] text-white text-center px-6">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-5">
              🎁 Bônus Promocional Liberado
            </h1>

            <p className="text-lg text-slate-300 mb-8">
              Você acaba de receber um <span className="font-semibold text-white">bônus especial de desconto</span> 
              da Estratégia TFX — mas este benefício <span className="font-semibold text-cyan-400">só pode ser resgatado</span> 
              se você realmente se encaixar em uma das situações abaixo.
            </p>

            <div className="grid md:grid-cols-2 gap-3 text-left">
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                💭 Sente que trabalha, se esforça... mas continua parado no mesmo lugar?
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                ⚡ Entra confiante e o mercado parece virar contra você em questão de segundos?
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                💸 Busca liberdade financeira, mas sente que algo sempre te puxa pra trás?
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                ⏱ Sai da operação antes da hora e assiste o preço bater exatamente onde queria entrar?
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                🧠 Falta foco, confiança e clareza pra seguir o plano e parar de sabotar seus próprios resultados?
              </div>
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                📉 Já lucrou, mas nunca conseguiu manter consistência — sempre volta pro zero?
              </div>
            </div>

            <button
              onClick={desbloquear}
              className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Sim, me identifico e quero resgatar meu bônus
            </button>

            <p className="text-slate-400 text-sm mt-4">
              (Se nenhuma dessas situações te representa, este bônus não se aplica pra você.)
            </p>
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

            {/* SEÇÃO DE IDENTIFICAÇÃO DE DORES INTEGRADA */}
            <section className="text-center mt-12 bg-gradient-to-b from-[#0b1e23] to-[#081518] p-8 rounded-2xl shadow-lg border border-[#0a2a33] max-w-4xl mx-auto">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
              😔 Você se identifica com isso?
            </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                {/* COLUNA 1 — público geral */}
                <div className="space-y-4">
                  <div className="bg-[#0c2024] p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 motion-safe:hover:scale-[1.02]">
                    💭 Sente que trabalha, se esforça… mas continua parado no mesmo lugar?
                  </div>
                  <div className="bg-[#0c2024] p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 motion-safe:hover:scale-[1.02]">
                    💸 Busca liberdade financeira, mas parece que algo sempre te puxa pra trás?
                  </div>
                  <div className="bg-[#0c2024] p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 motion-safe:hover:scale-[1.02]">
                    ⚖️ Falta foco, confiança e clareza pra seguir o plano e parar de sabotar seus próprios resultados?
                  </div>
              </div>

                {/* COLUNA 2 — público trader */}
                <div className="space-y-4">
                  <div className="bg-[#0c2024] p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 motion-safe:hover:scale-[1.02]">
                    📉 Entra confiante e o mercado parece virar contra você em questão de segundos?
                  </div>
                  <div className="bg-[#0c2024] p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 motion-safe:hover:scale-[1.02]">
                    ⏰ Sai da operação antes da hora e assiste o preço bater exatamente onde queria entrar?
              </div>
                  <div className="bg-[#0c2024] p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 motion-safe:hover:scale-[1.02]">
                    🧩 Já lucrou, mas nunca conseguiu manter consistência — sempre volta pro zero?
              </div>
              </div>
            </div>

              <p className="text-gray-400 mt-8 text-base max-w-2xl mx-auto leading-relaxed">
                A <span className="text-cyan-400 font-semibold">TFX</span> não é só um método — é o ponto de virada entre quem sobrevive e quem prospera.
                Aqui, você aprende o que realmente muda o jogo: <span className="text-yellow-300 font-semibold">mentalidade, método e disciplina.</span>
              </p>

              <a
                href="#beneficios"
                className="inline-block mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg shadow-md hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              >
                Sim, me identifico e quero resgatar meu bônus
              </a>
              <p className="text-sm text-gray-400 mt-4 italic">
                Abaixo você vai ver o que está travando a maioria — e como a TFX resolve isso passo a passo.
              </p>
            </section>
          </div>
        </section>

        {/* SEÇÃO DE BENEFÍCIOS - SOLUÇÃO */}
        <section id="beneficios" className="bg-gradient-to-b from-[#071e26] to-[#0a0f14] text-white py-20">
          <div className="section-box text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              O que acontece quando você muda a forma de pensar — sobre o mercado e sobre você
          </h2>
          
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              A <span className="text-cyan-300 font-medium">Estratégia TFX</span> foi criada pra transformar traders comuns  
              em operadores conscientes — com mentalidade e setups que funcionam na vida real.
            </p>

          {/* BLOCO DE TRANSFORMAÇÃO MENTAL E PESSOAL */}
          <section className="text-center mt-8 sm:mt-12 bg-gradient-to-b from-[#0b1e23] to-[#081518] p-6 sm:p-8 rounded-2xl shadow-lg border border-[#0a2a33] max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3 leading-tight">
              O que acontece quando você muda a forma de pensar — sobre o mercado e sobre você
            </h2>

            <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4 sm:px-0">
              Dentro da <span className="text-cyan-400 font-semibold">Estratégia TFX</span>, você vai desenvolver os mesmos princípios mentais que moldam traders consistentes — 
              e pessoas que conquistam resultados em qualquer área da vida.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-gray-300 mb-6">
              <div className="bg-[#0c2024] p-4 sm:p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 text-sm sm:text-base">
                ⚡ O ponto de virada entre agir por impulso e operar com clareza — entenda o que realmente move o mercado (e suas decisões).
              </div>
              <div className="bg-[#0c2024] p-4 sm:p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 text-sm sm:text-base">
                🧠 O código mental dos consistentes — como alinhar disciplina, foco e paciência para vencer sem depender da sorte.
              </div>
              <div className="bg-[#0c2024] p-4 sm:p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 text-sm sm:text-base">
                🔄 O poder dos hábitos certos — estrutura sua rotina como quem vive de resultados, não de expectativas.
              </div>
              <div className="bg-[#0c2024] p-4 sm:p-5 rounded-xl border border-[#14343c] hover:border-cyan-400 hover:bg-[#0e2428] transition-all duration-300 text-sm sm:text-base">
                💰 A visão que separa liberdade de ilusão — aprenda a usar o dinheiro e o tempo como ferramentas, não prisões.
              </div>
            </div>
            
          </section>

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