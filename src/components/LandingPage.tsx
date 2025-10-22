import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 72,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Estratégia FTX Mente - Domine o Mercado com Método Comprovado</title>
        <meta name="description" content="Aprenda a estratégia que os insiders usam para operar com confiança. Método testado que transforma traders comuns em lucrativos. Acesso imediato por apenas R$49,90." />
        <meta property="og:title" content="Estratégia FTX Mente - Domine o Mercado" />
        <meta property="og:description" content="Método testado que transforma traders comuns em lucrativos. Acesso imediato por apenas R$49,90." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Estratégia FTX Mente - Domine o Mercado" />
        <meta name="twitter:description" content="Método testado que transforma traders comuns em lucrativos." />
      </Helmet>

      {/* ================================================
      🔥 HERO SECTION - TEMA TFX
      ================================================ */}
      <section className="bg-black text-white px-6 py-20 text-center flex flex-col items-center animate-fade-in relative overflow-hidden">
        {/* Background com efeito da marca */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-orange-900/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold max-w-4xl leading-tight">
            🔥 Domine o Mercado com a <span className="tfx-gradient-text animate-glow">Estratégia TFX</span> que Transforma Traders Comuns em Lucrativos!
          </h1>
          <p className="mt-6 text-xl max-w-3xl text-gray-300 leading-relaxed">
            Você vai aprender o método que os <span className="neon-teal font-semibold">insiders e market makers</span> usam para operar com confiança — <span className="text-white font-semibold">sem depender da sorte</span>.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-10">
            <a href="#oferta" className="tfx-gradient hover:opacity-90 text-black font-bold py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 animate-pulseCTA text-lg">
              QUERO ACESSO IMEDIATO
            </a>
            <a href="#antesdepois" className="border-2 border-teal-400 text-teal-400 font-bold py-4 px-10 rounded-2xl hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 text-lg">
              VER COMO FUNCIONA →
            </a>
          </div>
          <div className="mt-8 text-sm text-gray-400">
            ✅ Método validado por traders profissionais • ✅ Acesso vitalício • ✅ Suporte direto
          </div>
        </div>
      </section>

      {/* ===========================================================
      🧠 SEÇÃO: IDENTIFICAÇÃO / PROBLEMA - COPY OTIMIZADA
      =========================================================== */}
      <section className="bg-zinc-950 py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">Você se identifica com isso?</h2>
        <ul className="text-gray-300 max-w-3xl mx-auto space-y-4 text-lg">
          <li className="flex items-center justify-center gap-3">😩 Entra em operações e sai no prejuízo?</li>
          <li className="flex items-center justify-center gap-3">📉 Sente que o mercado está sempre contra você?</li>
          <li className="flex items-center justify-center gap-3">⏰ Falta disciplina e gestão no dia a dia?</li>
          <li className="flex items-center justify-center gap-3">💸 Já tentou de tudo e ainda não lucra consistentemente?</li>
        </ul>
        <div className="mt-8 neon-teal font-semibold text-lg">
          👉 Se respondeu "sim" a qualquer uma dessas, a <span className="tfx-gradient-text">Estratégia TFX</span> vai mudar seu jogo.
        </div>
        <a href="#oferta" className="mt-8 inline-block tfx-gradient hover:opacity-90 text-black font-bold py-4 px-10 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 text-lg">
          COMEÇAR AGORA
        </a>
      </section>

      {/* ===========================================================
      🚀 SEÇÃO: BENEFÍCIOS E CONTEÚDO - COPY OTIMIZADA
      =========================================================== */}
      <section className="bg-black py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">O que você vai dominar dentro do método</h2>
        <ul className="text-gray-300 text-lg space-y-4 max-w-3xl mx-auto">
          <li className="flex items-start gap-3">📊 Leitura de gráfico que revela a intenção dos grandes players</li>
          <li className="flex items-start gap-3">⚙️ Gestão de risco e disciplina de elite</li>
          <li className="flex items-start gap-3">🧠 Mindset dos insiders</li>
          <li className="flex items-start gap-3">🚀 Setup validado e replicável</li>
          <li className="flex items-start gap-3">💰 Estratégia que gera lucros consistentes</li>
        </ul>
        <a href="#antesdepois" className="mt-10 inline-block border-2 border-teal-400 text-teal-400 font-bold py-4 px-10 rounded-2xl hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 text-lg">
          Ver o Antes e Depois no Gráfico →
        </a>
      </section>

      {/* ===========================================================
      📊 SEÇÃO: ANTES & DEPOIS INTERATIVO - COPY OTIMIZADA
      =========================================================== */}
      <section id="antesdepois" className="bg-zinc-900 py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">Veja a diferença entre operar às cegas e com método</h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg">
          Arraste o slider para comparar o gráfico antes e depois da estratégia aplicada.
          Observe como cada decisão muda o resultado da operação — com entradas, stops e saídas explicadas passo a passo.
        </p>

        {/* Simulação do gráfico interativo com tema TFX */}
        <div className="bg-gray-800 w-full max-w-4xl mx-auto h-80 flex items-center justify-center rounded-xl text-gray-500 relative overflow-hidden hover-lift">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-teal-900/30"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-4">📈</div>
            <p className="text-xl font-bold mb-2 neon-teal">Gráfico Interativo TFX</p>
            <p className="text-sm mb-4">Arraste para ver antes/depois</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="bg-orange-500/20 px-3 py-1 rounded neon-orange">ANTES</span>
              <span className="text-gray-400">→</span>
              <span className="bg-teal-500/20 px-3 py-1 rounded neon-teal">DEPOIS</span>
            </div>
          </div>
        </div>

        <a href="#provas" className="mt-10 inline-block tfx-gradient hover:opacity-90 text-black font-bold py-4 px-10 rounded-2xl transition-all duration-300 hover:scale-105 text-lg">
          Ver provas reais de resultados
        </a>
      </section>

      {/* ===========================================================
      🏆 SEÇÃO: PROVAS REAIS - COPY OTIMIZADA
      =========================================================== */}
      <section id="provas" className="bg-black py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">Resultados reais de quem aplicou</h2>
        <p className="text-gray-400 mb-10 max-w-3xl mx-auto text-lg">Prints e vídeos originais, sem edição — resultados obtidos com as mesmas regras ensinadas dentro do treinamento.</p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-zinc-800 p-6 rounded-xl hover-lift transition-all duration-300">
            <div className="bg-gray-700 h-56 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-orange-900/20"></div>
              <div className="relative z-10 text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="neon-teal font-bold">+R$842</p>
                <p className="text-sm text-gray-300">EURUSD</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">Lucro em 1 operação — 10/10/2025</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl hover-lift transition-all duration-300">
            <div className="bg-gray-700 h-56 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-teal-900/20"></div>
              <div className="relative z-10 text-center">
                <div className="text-3xl mb-2">📈</div>
                <p className="neon-orange font-bold">+R$1.240</p>
                <p className="text-sm text-gray-300">BTCUSD</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">Lucro em 1 operação — 12/10/2025</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl hover-lift transition-all duration-300">
            <div className="bg-gray-700 h-56 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-orange-900/20"></div>
              <div className="relative z-10 text-center">
                <div className="text-3xl mb-2">🎥</div>
                <p className="tfx-gradient-text font-bold">AO VIVO</p>
                <p className="text-sm text-gray-300">Execução real</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">Trade de reversão — Sem edição</p>
          </div>
        </div>

        <a href="#oferta" className="mt-10 inline-block border-2 border-teal-400 text-teal-400 font-bold py-4 px-10 rounded-2xl hover:bg-teal-400 hover:text-black transition-all duration-300 hover:scale-105 text-lg">
          Quero ter resultados assim também
        </a>
      </section>

      {/* ===========================================================
      💰 SEÇÃO: OFERTA - COPY OTIMIZADA COM NOVO PREÇO
      =========================================================== */}
      <section id="oferta" className="bg-gradient-to-b from-zinc-950 to-black py-20 px-6 text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-white mb-6">Oferta Especial por Tempo Limitado ⏰</h2>
        <p className="text-gray-300 text-xl mb-4">Leve o curso completo + o <strong className="neon-teal">Guia Prático de Gestão e Mindset dos Insiders</strong> por apenas</p>
        <div className="text-5xl font-bold tfx-gradient-text mb-4 animate-glow">
          R$49,90
        </div>
        <p className="text-gray-400 text-lg mb-8">De <del className="text-red-500 text-xl">R$119,90</del> por apenas <span className="neon-teal font-bold text-xl">R$49,90</span></p>

        {/* Contador melhorado com tema TFX */}
        <div className="bg-zinc-800 rounded-xl p-6 mb-8 max-w-md mx-auto border border-teal-400/20">
          <div className="text-lg text-gray-300 mb-2">⏱ Oferta expira em:</div>
          <div id="countdown" className="text-3xl font-bold neon-teal">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-400 mt-2">💎 Bônus expira quando o timer zerar</div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <a href="#checkout" className="tfx-gradient hover:opacity-90 text-black font-bold py-5 px-12 rounded-2xl text-xl transition-all duration-300 animate-pulseCTA">
            QUERO O PACOTE COMPLETO AGORA
          </a>
          <a href="#faq" className="border-2 border-teal-400 text-teal-400 font-bold py-5 px-12 rounded-2xl hover:bg-teal-400 hover:text-black text-xl transition-all duration-300 hover:scale-105">
            Ver detalhes da oferta
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="bg-teal-100 p-3 rounded-lg border border-teal-400">
            <span className="text-teal-800 font-bold text-lg">🛡️ GARANTIA 7 DIAS</span>
          </div>
          <p className="text-sm text-gray-400">💸 Pagamento 100% seguro • Acesso imediato • 7 dias de garantia</p>
        </div>
      </section>

      {/* ===========================================================
      ❓ SEÇÃO: FAQ - COPY OTIMIZADA
      =========================================================== */}
      <section id="faq" className="bg-zinc-950 py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto text-gray-300 text-left space-y-6">
          <div className="bg-zinc-800 p-6 rounded-xl">
            <p className="font-bold text-white mb-2">1️⃣ "E se eu não entender o conteúdo?"</p>
            <p>👉 Você recebe suporte direto e pode reassistir as aulas quantas vezes quiser.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl">
            <p className="font-bold text-white mb-2">2️⃣ "O acesso é vitalício?"</p>
            <p>👉 Sim. Você poderá revisar o conteúdo sempre que quiser.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl">
            <p className="font-bold text-white mb-2">3️⃣ "Preciso de muito capital?"</p>
            <p>👉 Não. Você aprenderá a ajustar suas entradas ao tamanho do seu capital.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl">
            <p className="font-bold text-white mb-2">4️⃣ "As provas são reais?"</p>
            <p>👉 Sim — prints e vídeos originais, sem manipulação.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl">
            <p className="font-bold text-white mb-2">5️⃣ "Tem garantia?"</p>
            <p>👉 Sim — 7 dias de garantia incondicional.</p>
          </div>
        </div>

        <a href="#oferta" className="mt-10 inline-block tfx-gradient hover:opacity-90 text-black font-bold py-4 px-10 rounded-2xl transition-all duration-300 hover:scale-105 text-lg">
          Quero o acesso completo
        </a>
      </section>

      {/* ===========================================================
      🔥 CTA FINAL - TEMA TFX
      =========================================================== */}
      <section className="bg-gradient-to-r from-orange-900 to-teal-900 py-16 px-6 text-center animate-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 to-teal-900/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">🔥 Últimas horas da oferta.</h2>
          <p className="text-xl text-gray-200 mb-8">
            Domine o mercado e transforme sua mentalidade de trader agora mesmo.
          </p>
          <a href="#oferta" className="inline-block tfx-gradient hover:opacity-90 text-black font-bold py-5 px-12 rounded-2xl text-xl transition-all duration-300 animate-pulseCTA">
            GARANTIR MEU ACESSO COM DESCONTO
          </a>
        </div>
      </section>

      {/* ===========================================================
      🔒 RODAPÉ / CONFIANÇA
      =========================================================== */}
      <footer className="bg-black text-gray-500 text-center py-8 text-sm">
        <p>© 2025 Estratégia FTX Mente. Todos os direitos reservados.</p>
        <p>Pagamento seguro via plataforma oficial. Suporte via e-mail 24h.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
