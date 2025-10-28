import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { OfertaFinal } from "./OfertaFinal";
import { Footer } from "./Footer";

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

      timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(countdownInterval!);
      countdownInterval = null;
    }
  }, 1000);
}

// 🎯 FUNÇÃO PARA DETECTAR LEITURA DO BÔNUS
function detectBonusReading() {
  // Simular tempo de leitura baseado no tamanho do texto
  const readingTime = 8000; // 8 segundos
  
  setTimeout(() => {
    hasUserReadBonus = true;
    startCountdown();
  }, readingTime);
}

export default function LandingPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já interagiu antes
    const hasInteracted = localStorage.getItem('userInteracted');
    if (hasInteracted === 'true') {
      setShowContent(true);
      detectBonusReading();
    }
  }, []);

  const handleInteraction = () => {
    setShowContent(true);
    localStorage.setItem('userInteracted', 'true');
    detectBonusReading();
  };

  if (!showContent) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-6">
            💰 Você Está Pronto para TRANSFORMAR Sua SITUAÇÃO FINANCEIRA?
            </h1>

          <div className="space-y-4 mb-8">
            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-white font-semibold">Você se identifica com alguma dessas situações?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-red-500/20 p-3 rounded-lg border border-red-400/30">
                <p className="text-red-200 font-bold">DIFICULDADES</p>
              </div>
              <div className="bg-orange-500/20 p-3 rounded-lg border border-orange-400/30">
                <p className="text-orange-200 font-bold">INVESTIMENTOS</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-400/30">
                <p className="text-blue-200 font-bold">LIBERDADE</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-400/30">
                <p className="text-purple-200 font-bold">FRUSTRAÇÃO</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-400/30">
                <p className="text-yellow-200 font-bold">OPORTUNIDADE</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg border border-green-400/30">
                <p className="text-green-200 font-bold">DETERMINAÇÃO</p>
              </div>
              </div>
            </div>

            <button
            onClick={handleInteraction}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
            💰 SIM! QUERO TRANSFORMAR MINHA VIDA
            </button>
        </div>
      </div>
    );
  }

  return (
    <>
          <Helmet>
        <title>Estratégia TFX Mente - Transforme Sua Vida Financeira</title>
        <meta name="description" content="Descubra como transformar sua situação financeira com a Estratégia TFX. Ganhos diários de até $ 500,00. Apenas 100 vagas disponíveis." />
        <meta name="keywords" content="trading, forex, bitcoin, estratégia, ganhos, transformação financeira" />
          </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0f14] to-[#071e26] text-white">
        
        {/* HERO SECTION OTIMIZADO */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* CRONÔMETRO CENTRALIZADO */}
            <div className="text-center mb-8">
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-xl text-center text-white shadow-lg animate-pulse max-w-md mx-auto">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-400/20 blur-lg animate-pulse"></div>
                <p className="text-sm font-semibold relative z-10">🔥 OFERTA EXCLUSIVA POR TEMPO LIMITADO</p>
                <h2 className="text-2xl font-bold mt-2 relative z-10">⏰ OFERTA EXPIRA EM:</h2>
                <p className="text-4xl font-extrabold mt-1 relative z-10 drop-shadow-md countdown-timer">29:39</p>
                <p className="text-sm mt-2 relative z-10">Não perca esta oportunidade única!</p>
              </div>
            </div>

            {/* HEADLINE COM PROMESSA TRANSFORMADORA */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-green-200 mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] px-2 sm:px-0">
              <span className="text-yellow-400">💰 COMO TRANSFORMAR SUA VIDA</span> e Gerar <span className="text-green-400">$ 10.000,00+ POR MÊS</span> com Trading
            </h1>
            
            {/* SUBHEADLINE COM ESCASSEZ ELEGANTE */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-4 rounded-xl border border-red-400/50 mb-6 backdrop-blur-sm">
              <p className="text-lg sm:text-xl text-white font-semibold text-center">
                <span className="text-red-400">⚠️ APENAS 100 VAGAS DISPONÍVEIS HOJE</span> — 
                <span className="text-yellow-300"> Não haverá segunda chance</span>
              </p>
            </div>

            {/* PROMESSA ELEGANTE */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-400/30 mb-6 backdrop-blur-sm">
              <p className="text-center text-white font-semibold text-sm sm:text-base mb-3">
                <span className="text-green-400">💰 OPORTUNIDADE:</span> Se você se identifica com pelo menos 3 situações abaixo, 
                <span className="text-yellow-300 font-bold"> você pode transformar sua vida em 30 dias</span>
              </p>
              <p className="text-center text-gray-300 text-xs sm:text-sm">
                Mas apenas se você estiver <span className="text-green-400">verdadeiramente comprometido</span> com sua transformação
              </p>
            </div>

            {/* IDENTIFICAÇÃO SIMPLIFICADA */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-3 sm:p-4 rounded-xl border border-red-400/30 backdrop-blur-sm text-center">
                <p className="text-red-200 font-bold text-xs sm:text-sm">DIFICULDADES FINANCEIRAS</p>
                  </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-3 sm:p-4 rounded-xl border border-orange-400/30 backdrop-blur-sm text-center">
                <p className="text-orange-200 font-bold text-xs sm:text-sm">INVESTIMENTOS PERDIDOS</p>
                  </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-3 sm:p-4 rounded-xl border border-blue-400/30 backdrop-blur-sm text-center">
                <p className="text-blue-200 font-bold text-xs sm:text-sm">BUSCA POR LIBERDADE</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-3 sm:p-4 rounded-xl border border-purple-400/30 backdrop-blur-sm text-center">
                <p className="text-purple-200 font-bold text-xs sm:text-sm">FRUSTRAÇÃO COM TRADING</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-3 sm:p-4 rounded-xl border border-yellow-400/30 backdrop-blur-sm text-center">
                <p className="text-yellow-200 font-bold text-xs sm:text-sm">OPORTUNIDADE ÚNICA</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-3 sm:p-4 rounded-xl border border-green-400/30 backdrop-blur-sm text-center">
                <p className="text-green-200 font-bold text-xs sm:text-sm">DETERMINAÇÃO TOTAL</p>
              </div>
            </div>

            <p className="text-gray-200 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              A <span className="text-green-300 font-semibold">TFX</span> é o método que vai te levar da <span className="text-orange-400 font-bold">situação atual</span> para a <span className="text-yellow-300 font-bold">LIBERDADE FINANCEIRA</span>.
              <span className="text-green-400 font-bold"> Ganhos diários de até $ 500,00</span> — você pode alcançar muito mais.
            </p>

            {/* CTA PRINCIPAL */}
            <div className="text-center mb-8">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold py-4 px-8 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-green-400/30 button-cta"
              >
                💰 SIM! QUERO TRANSFORMAR MINHA VIDA
              </a>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE CREDIBILIDADE SIMPLIFICADA */}
        <section id="credibilidade" className="bg-gradient-to-b from-[#071e26] to-[#0a0f14] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-8">
              💰 A Estratégia que Foi <span className="text-orange-400">CRIADA PARA VOCÊ</span>
          </h2>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Não é mais um curso genérico. A <span className="text-green-300 font-semibold">TFX</span> foi desenvolvida especificamente 
              para pessoas que estão <span className="text-orange-400 font-bold">cansadas de perder dinheiro</span> e querem 
              <span className="text-yellow-300 font-bold"> resultados reais</span>.
            </p>

            {/* CARDS DE CREDIBILIDADE */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-6 rounded-2xl mb-4">
                    <div className="text-4xl font-black text-black mb-2">$ 500,00</div>
                    <div className="text-lg font-semibold text-black">Por Dia</div>
                    <div className="text-sm text-black/80 mt-2">Ganhos Possíveis</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-blue-400/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-400 to-cyan-600 p-6 rounded-2xl mb-4">
                    <div className="text-4xl font-black text-black mb-2">30</div>
                    <div className="text-lg font-semibold text-black">Dias</div>
                    <div className="text-sm text-black/80 mt-2">Para Transformação</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-purple-400/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-600 p-6 rounded-2xl mb-4">
                    <div className="text-4xl font-black text-black mb-2">100</div>
                    <div className="text-lg font-semibold text-black">Vagas</div>
                    <div className="text-sm text-black/80 mt-2">Disponíveis</div>
                  </div>
              </div>
              </div>
          </div>
          </div>
        </section>

        {/* SEÇÃO DE CASOS DE TRANSFORMAÇÃO */}
        <section id="resultados" className="bg-gradient-to-b from-[#0a0f14] to-[#071e26] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-8">
              💰 Casos Reais: <span className="text-orange-400">TRANSFORMAÇÕES</span> em <span className="text-green-400">30 Dias</span>
            </h2>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Não é teoria — são <span className="text-green-300 font-semibold">transformações reais</span> de pessoas que 
              mudaram sua <span className="text-orange-400 font-semibold">situação financeira</span> e chegaram à <span className="text-yellow-300 font-semibold">liberdade financeira</span>.
            </p>

            {/* CASOS DE TRANSFORMAÇÃO */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-green-300 mb-4">🎯 João - Sem Renda → $ 300,00/dia</h3>
                <p className="text-gray-300 text-sm mb-4">
                  "Estava sem renda há 6 meses, sem perspectiva. Em 30 dias com a TFX, já estava ganhando $ 300,00 por dia. Hoje sou livre financeiramente."
                </p>
                <div className="text-xs text-gray-400 italic">
                  Antes: $ 0,00 | Depois: $ 300,00/dia
                </div>
        </div>

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-blue-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-blue-300 mb-4">🎯 Maria - Renda Baixa → $ 450,00/dia</h3>
                <p className="text-gray-300 text-sm mb-4">
                  "Ganhava pouco e vivia apertada. A TFX me ensinou a fazer dinheiro trabalhar para mim. Em 3 meses já estava ganhando $ 450,00 por dia."
                </p>
                <div className="text-xs text-gray-400 italic">
                  Antes: $ 1.200,00 | Depois: $ 450,00/dia
                </div>
        </div>

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-yellow-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-yellow-300 mb-4">🎯 Carlos - Endividado → $ 500,00/dia</h3>
                <p className="text-gray-300 text-sm mb-4">
                  "Estava endividado, sem saída. A TFX não só me tirou das dívidas como me fez ganhar $ 500,00 por dia. Minha vida mudou completamente."
                </p>
                <div className="text-xs text-gray-400 italic">
                  Antes: $ -20.000,00 | Depois: $ 500,00/dia
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO ANTES E DEPOIS - PRINTS REAIS */}
        <section className="bg-gradient-to-b from-[#071e26] to-[#0a0f14] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-8 text-center">
              📊 <span className="text-orange-400">ANTES E DEPOIS</span> - <span className="text-green-400">PRINTS REAIS</span>
            </h2>
            
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto text-center">
              Veja as <span className="text-green-300 font-semibold">transformações reais</span> de quem aplicou a estratégia TFX. 
              <span className="text-yellow-300 font-semibold"> Resultados comprovados</span> em diferentes moedas e mercados.
            </p>

            {/* GRID DE PRINTS REAIS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {/* Print 1 - Bitcoin */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-orange-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-orange-300 mb-4">₿ Bitcoin - Print Real</h3>
                <div className="bg-gray-900/50 p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border border-gray-600">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📈</div>
                    <p className="text-gray-400 text-sm">
                      📸 Espaço para print real<br/>
                      Bitcoin antes/depois
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 italic text-center">
                  Resultado real da estratégia TFX - Bitcoin
                </div>
          </div>
          
              {/* Print 2 - Forex */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-blue-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-blue-300 mb-4">💱 Forex - Print Real</h3>
                <div className="bg-gray-900/50 p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border border-gray-600">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📊</div>
                    <p className="text-gray-400 text-sm">
                      📸 Espaço para print real<br/>
                      Forex antes/depois
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 italic text-center">
                  Resultado real da estratégia TFX - Forex
                </div>
              </div>

              {/* Print 3 - Ethereum */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-purple-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-purple-300 mb-4">Ξ Ethereum - Print Real</h3>
                <div className="bg-gray-900/50 p-4 rounded-lg mb-4 min-h-[250px] flex items-center justify-center border border-gray-600">
                  <div className="text-center">
                    <div className="text-4xl mb-3">💎</div>
                    <p className="text-gray-400 text-sm">
                      📸 Espaço para print real<br/>
                      Ethereum antes/depois
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 italic text-center">
                  Resultado real da estratégia TFX - Ethereum
                </div>
              </div>
            </div>

            {/* COMPARAÇÃO ANTES E DEPOIS */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-400/30 mb-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-center text-green-300 mb-6">
                🔄 <span className="text-white">ANTES</span> vs <span className="text-green-400">DEPOIS</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-red-500/20 p-4 rounded-xl border border-red-400/30 mb-4">
                    <h4 className="text-xl font-bold text-red-300 mb-2">❌ ANTES</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Perdas constantes</li>
                      <li>• Sem estratégia definida</li>
                      <li>• Emoções controlando trades</li>
                      <li>• Resultados inconsistentes</li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-500/20 p-4 rounded-xl border border-green-400/30 mb-4">
                    <h4 className="text-xl font-bold text-green-300 mb-2">✅ DEPOIS</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Ganhos consistentes</li>
                      <li>• Estratégia TFX aplicada</li>
                      <li>• Controle emocional total</li>
                      <li>• Resultados previsíveis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DA PROMESSA TRANSFORMADORA */}
        <section id="beneficios" className="bg-gradient-to-b from-[#071e26] to-[#0a0f14] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              🎯 Sua <span className="text-green-400">IMERSÃO COMPLETA</span> em 30 Dias
            </h2>
            
            {/* PROMESSA ELEGANTE */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-400/30 mb-8 backdrop-blur-sm">
              <p className="text-lg text-white font-semibold mb-4">
                <span className="text-green-400">🎯 IMERSÃO:</span> Uma experiência completa de aprendizado e aplicação da estratégia TFX
              </p>
              <p className="text-gray-300 text-sm">
                Não é só um curso — é uma <span className="text-orange-400 font-bold">imersão total</span> onde você aprende, 
                <span className="text-orange-400 font-bold"> pratica</span> e <span className="text-orange-400 font-bold">recebe suporte</span> — 
                <span className="text-yellow-300 font-bold"> tudo em uma experiência única</span>.
              </p>
            </div>
            
            {/* EXCLUSIVIDADE DOS 30 DIAS NO GRUPO VIP */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-400/30 mb-12 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full mr-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  <span className="text-purple-300">Imersão VIP no Telegram</span>
                  <span className="text-gray-300"> (30 Dias)</span>
                </h3>
              </div>
              
              <p className="text-lg text-white font-semibold mb-6">
                <span className="text-purple-400">🎯 EXPERIÊNCIA:</span> 
                <span className="text-yellow-300"> 30 dias de imersão total</span> onde você aprende, 
                <span className="text-green-400 font-bold"> pratica e recebe suporte</span> em tempo real
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-green-400/20">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <h4 className="text-green-300 font-bold">Sinais Diários</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Oportunidades em tempo real</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-xl border border-blue-400/20">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <h4 className="text-blue-300 font-bold">Suporte Direto</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Suas dúvidas respondidas</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-xl border border-yellow-400/20">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <h4 className="text-yellow-300 font-bold">Atualizações</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Método sempre atualizado</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-xl border border-orange-400/30">
                <p className="text-orange-300 font-bold text-center">
                  ⚡ <span className="text-white">CHANCE ÚNICA:</span> Depois dos 30 dias, 
                  <span className="text-yellow-300"> você não terá mais acesso</span> a este grupo exclusivo
                </p>
              </div>
              
              {/* ESPAÇO PARA VÍDEO DO GRUPO */}
              <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-600/30">
                <h4 className="text-xl font-bold text-center text-gray-300 mb-4">
                  📹 Veja Como Funciona a Imersão VIP
                </h4>
                <div className="bg-gray-900/70 p-8 rounded-lg border border-gray-700 min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-gray-400 text-lg mb-2">
                      📸 Espaço para vídeo curto do grupo
                    </p>
                    <p className="text-gray-500 text-sm">
                      (Vídeo será carregado aqui)
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3 italic">
                  Vídeo demonstrativo da Imersão VIP no Telegram
                </p>
              </div>
            </div>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              A <span className="text-cyan-300 font-medium">Estratégia TFX</span> não é só teoria — é o 
              <span className="text-green-300 font-semibold"> método comprovado</span> que já transformou 
              <span className="text-yellow-300 font-semibold"> milhares de pessoas</span> para sempre.
              <span className="text-green-400 font-bold"> Ganhos diários de até $ 500,00</span>.
            </p>

            {/* O QUE VOCÊ VAI RECEBER */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-green-300 mb-4">📚 Imersão Completa TFX</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">PDF Iniciante:</strong> Estratégia do zero ao básico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">PDF Intermediário:</strong> Técnicas avançadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">PDF Avançado:</strong> Domínio total da estratégia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✅</span>
                    <span><strong className="text-white">Guia Prático:</strong> Aplicação passo a passo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-purple-400/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-purple-300 mb-4">🎯 Imersão VIP (30 Dias)</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✅</span>
                    <span><strong className="text-white">Grupo Exclusivo:</strong> Acompanhamento diário</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✅</span>
                    <span><strong className="text-white">Sinais em Tempo Real:</strong> Oportunidades ao vivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✅</span>
                    <span><strong className="text-white">Suporte Direto:</strong> Dúvidas respondidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">✅</span>
                    <span><strong className="text-white">Experiência Completa:</strong> Imersão total</span>
                  </li>
                </ul>
              </div>
          </div>

            {/* CTA FINAL */}
            <div className="text-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold py-4 px-8 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-green-400/30 button-cta"
              >
                💰 SIM! QUERO TRANSFORMAR MINHA VIDA
              </a>
            </div>
          </div>
        </section>

        {/* OFERTA FINAL */}
        <OfertaFinal />

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}