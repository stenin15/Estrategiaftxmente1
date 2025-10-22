import { useState, useEffect } from 'react';

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
      {/* ================================================
      🔥 LANDING PAGE — ESTRATÉGIA FTX MENTE
      Copy reestruturada com técnicas de alta conversão
      ================================================ */}
      <section className="bg-black text-white px-6 py-20 text-center flex flex-col items-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
          Domine o mercado com uma estratégia simples — resultado real em minutos por operação.
        </h1>
        <p className="mt-4 text-lg max-w-2xl text-gray-300">
          Método testado por traders reais que geram lucros consistentes. 
          Acesso completo + <span className="font-semibold text-white">Guia de Gestão e Hábitos dos Insiders</span> — 
          tudo por <span className="text-green-400 font-bold">R$59,90 (lançamento)</span>. 
          <br /> Leve o pacote completo com bônus por apenas <span className="text-green-400 font-bold">R$69,90</span>.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <a href="#oferta" className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
            QUERO COMEÇAR — R$59,90
          </a>
          <a href="#oferta" className="border border-green-400 text-green-400 font-bold py-3 px-8 rounded-2xl hover:bg-green-400 hover:text-black transition-all duration-300 hover:scale-105">
            LEVAR O BUNDLE — R$69,90
          </a>
        </div>
        <div className="mt-6 text-sm text-gray-400">
          ✅ Aulas práticas passo a passo • ✅ Estratégia validada no mercado • ✅ Acesso imediato
        </div>
      </section>

      {/* ===========================================================
      🧠 SEÇÃO: IDENTIFICAÇÃO / PROBLEMA
      =========================================================== */}
      <section className="bg-zinc-950 py-16 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">Você se identifica com isso?</h2>
        <ul className="text-gray-300 max-w-2xl mx-auto space-y-3 text-lg">
          <li>📉 Perde entradas por indecisão e falta de método claro?</li>
          <li>💸 Falta gestão de risco e disciplina nas operações?</li>
          <li>🧠 Quer parar de depender da sorte e começar a operar como um profissional?</li>
        </ul>
        <a href="#oferta" className="mt-8 inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
          Sim, quero parar de perder dinheiro!
        </a>
      </section>

      {/* ===========================================================
      🚀 SEÇÃO: BENEFÍCIOS E CONTEÚDO
      =========================================================== */}
      <section className="bg-black py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">O que você vai aprender dentro do treinamento</h2>
        <ul className="text-gray-300 text-lg space-y-4 max-w-3xl mx-auto">
          <li>📈 Estratégia completa de entrada e saída — sem achismos.</li>
          <li>🧭 Gestão de risco prática, calculada e automática.</li>
          <li>🧠 Rotina e mentalidade usada por insiders e market makers.</li>
          <li>🖼️ Antes e Depois interativo dos gráficos (veja a transformação real).</li>
          <li>🧾 Checklist prático para aplicar nas suas próximas operações.</li>
        </ul>
        <a href="#antesdepois" className="mt-10 inline-block border border-green-400 text-green-400 font-bold py-3 px-10 rounded-2xl hover:bg-green-400 hover:text-black transition-all duration-300 hover:scale-105">
          Ver o Antes & Depois
        </a>
      </section>

      {/* ===========================================================
      📊 SEÇÃO: ANTES & DEPOIS INTERATIVO
      =========================================================== */}
      <section id="antesdepois" className="bg-zinc-900 py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">Veja o Antes e Depois no Gráfico</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Arraste o slider para comparar o gráfico antes e depois da estratégia aplicada.
          Observe como cada decisão muda o resultado da operação — com entradas, stops e saídas explicadas passo a passo.
        </p>

        {/* Simulação do gráfico interativo */}
        <div className="bg-gray-800 w-full max-w-3xl mx-auto h-64 flex items-center justify-center rounded-xl text-gray-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600"></div>
          <div className="relative z-10 text-center">
            <div className="text-2xl mb-2">📈</div>
            <p className="text-lg font-semibold">Gráfico Interativo</p>
            <p className="text-sm">Arraste para ver antes/depois</p>
          </div>
        </div>

        <a href="#provas" className="mt-10 inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-10 rounded-2xl transition-all duration-300 hover:scale-105">
          Ver Provas Reais
        </a>
      </section>

      {/* ===========================================================
      🏆 SEÇÃO: PROVAS REAIS (PRINTS / VÍDEOS)
      =========================================================== */}
      <section id="provas" className="bg-black py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">Resultados reais de quem aplicou a estratégia</h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Prints e vídeos originais, sem edição — resultados obtidos com as mesmas regras ensinadas dentro do treinamento.</p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-zinc-800 p-4 rounded-xl hover:scale-105 transition-all duration-300">
            <div className="bg-gray-700 h-48 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-gray-400">📊 Print 1</span>
            </div>
            <p className="text-sm text-gray-400">EURUSD — Lucro +R$842 — 10/10/2025</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-xl hover:scale-105 transition-all duration-300">
            <div className="bg-gray-700 h-48 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-gray-400">📈 Print 2</span>
            </div>
            <p className="text-sm text-gray-400">BTCUSD — Lucro +R$1.240 — 12/10/2025</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-xl hover:scale-105 transition-all duration-300">
            <div className="bg-gray-700 h-48 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-gray-400">🎥 Vídeo</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Execução ao vivo — trade de reversão</p>
          </div>
        </div>

        <a href="#oferta" className="mt-10 inline-block border border-green-400 text-green-400 font-bold py-3 px-10 rounded-2xl hover:bg-green-400 hover:text-black transition-all duration-300 hover:scale-105">
          Quero ter resultados assim também
        </a>
      </section>

      {/* ===========================================================
      💰 SEÇÃO: OFERTA / PREÇO / CTA PRINCIPAL
      =========================================================== */}
      <section id="oferta" className="bg-gradient-to-b from-zinc-950 to-black py-20 px-6 text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-white mb-6">Oferta Limitada — Garanta Agora com Desconto de Lançamento</h2>
        <p className="text-gray-300 text-lg mb-4">De <del className="text-red-500">R$119,90</del> por apenas <span className="text-green-400 font-bold">R$59,90</span> (curso completo)</p>
        <p className="text-gray-400 mb-10">Adicione o <strong>Guia Prático de Gestão e Hábitos dos Insiders</strong> por apenas +R$10 → Total: <span className="text-green-400 font-bold">R$69,90</span></p>

        {/* Contador */}
        <div id="countdown" className="text-2xl font-bold text-green-400 mb-8">
          Oferta expira em: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="#checkout" className="bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 hover:scale-105">
            GARANTIR MINHA VAGA — R$59,90
          </a>
          <a href="#checkout" className="border border-green-400 text-green-400 font-bold py-4 px-10 rounded-2xl hover:bg-green-400 hover:text-black text-lg transition-all duration-300 hover:scale-105">
            LEVAR O BUNDLE — R$69,90
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <span className="text-green-800 font-bold text-sm">🛡️ GARANTIA 7 DIAS</span>
          </div>
          <p className="text-sm text-gray-400">Pagamento 100% seguro • Acesso imediato • 7 dias de garantia</p>
        </div>
      </section>

      {/* ===========================================================
      ❓ SEÇÃO: FAQ
      =========================================================== */}
      <section className="bg-zinc-950 py-20 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">Perguntas Frequentes</h2>
        <div className="max-w-2xl mx-auto text-gray-300 text-left space-y-4">
          <p><strong>O curso serve para iniciantes?</strong><br/>Sim! Você vai do básico até o avançado, com módulos curtos e diretos.</p>
          <p><strong>Preciso de muito capital?</strong><br/>Não. Você aprenderá a ajustar suas entradas ao tamanho do seu capital.</p>
          <p><strong>As provas são reais?</strong><br/>Sim — prints e vídeos originais, sem manipulação.</p>
          <p><strong>Tem garantia?</strong><br/>Sim — 7 dias de garantia incondicional.</p>
          <p><strong>Qual a diferença do bundle?</strong><br/>O bundle inclui o Guia de Gestão e Hábitos — ideal para quem quer resultados consistentes.</p>
        </div>

        <a href="#oferta" className="mt-10 inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-10 rounded-2xl transition-all duration-300 hover:scale-105">
          Quero o acesso completo
        </a>
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
