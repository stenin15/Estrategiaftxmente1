import React, { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🔥 Domine o Mercado com a <span className="text-cyan-400">Estratégia TFX</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Aprenda o método que insiders e market makers usam para operar com confiança — sem depender da sorte.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-8 rounded-2xl text-lg">
              QUERO ACESSO IMEDIATO
            </button>
            <button className="border border-emerald-400 text-emerald-400 font-bold py-4 px-8 rounded-2xl hover:bg-emerald-400 hover:text-black text-lg">
              VER COMO FUNCIONA →
            </button>
          </div>
        </div>
      </section>

      {/* IDENTIFICAÇÃO */}
      <section className="px-6 py-16 text-center bg-zinc-950">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Você se identifica com isso?</h2>
          <ul className="text-lg space-y-3 mb-8">
            <li>😩 Entra em operações e sai no prejuízo?</li>
            <li>📉 Sente que o mercado está sempre contra você?</li>
            <li>⏰ Falta disciplina e gestão no dia a dia?</li>
            <li>💸 Já tentou de tudo e ainda não lucra consistentemente?</li>
          </ul>
          <p className="text-emerald-400 text-lg mb-6">
            Se respondeu "sim" a qualquer uma, a FTX Mente vai mudar seu jogo.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-8 rounded-2xl text-lg">
            COMEÇAR AGORA
          </button>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">O que você vai dominar dentro do método</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              "📊 Leitura de gráfico que revela a intenção dos grandes players",
              "⚙️ Gestão de risco e disciplina de elite",
              "🧠 Mindset dos insiders",
              "🚀 Setup validado e replicável",
              "💰 Estratégia que gera lucros consistentes"
            ].map((item, index) => (
              <div key={index} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <p className="text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVAS */}
      <section className="px-6 py-16 text-center bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Resultados reais de quem aplicou</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <div className="bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">📊 Print 1</span>
              </div>
              <p className="text-emerald-400 font-bold text-xl">+R$ 842</p>
              <p className="text-sm text-gray-400">EURUSD — 10/10/2025</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <div className="bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">📈 Print 2</span>
              </div>
              <p className="text-emerald-400 font-bold text-xl">+R$ 1.240</p>
              <p className="text-sm text-gray-400">BTCUSD — 12/10/2025</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <div className="bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">🎥 Vídeo</span>
              </div>
              <p className="text-gray-200 font-bold">Execução ao vivo</p>
              <p className="text-sm text-gray-400">Trade de reversão</p>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Oferta especial por tempo limitado ⏰</h2>
          <p className="text-xl text-gray-300 mb-8">
            Leve o curso completo + o Guia Prático por apenas{" "}
            <span className="text-emerald-400 font-bold text-2xl">R$ 49,90</span>{" "}
            (de <span className="line-through text-gray-500">R$ 119,90</span>)
          </p>

          <div className="bg-zinc-900 rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <p className="text-gray-300 mb-2">Oferta expira em:</p>
            <div className="text-4xl font-bold text-emerald-400">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-8 rounded-2xl text-xl">
              QUERO O PACOTE COMPLETO AGORA
            </button>
            <button className="border border-emerald-400 text-emerald-400 font-bold py-4 px-8 rounded-2xl hover:bg-emerald-400 hover:text-black text-xl">
              Ver detalhes da oferta
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded">🛡️ Garantia 7 dias</span>
            <span>Pagamento 100% seguro</span>
            <span>•</span>
            <span>Acesso imediato</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 text-center bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4 text-left">
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h3 className="font-bold text-white mb-2">E se eu não entender o conteúdo?</h3>
              <p className="text-gray-300">Você recebe suporte direto e pode reassistir as aulas quantas vezes quiser.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h3 className="font-bold text-white mb-2">O acesso é vitalício?</h3>
              <p className="text-gray-300">Sim. Você poderá revisar o conteúdo sempre que quiser.</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-2xl">
              <h3 className="font-bold text-white mb-2">Tem garantia?</h3>
              <p className="text-gray-300">Sim — 7 dias de garantia incondicional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-16 text-center bg-gradient-to-r from-orange-900 to-emerald-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">🔥 Últimas horas da oferta.</h2>
          <p className="text-xl text-gray-200 mb-8">
            Domine o mercado e transforme sua mentalidade de trader agora mesmo.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-5 px-12 rounded-2xl text-xl">
            GARANTIR MEU ACESSO COM DESCONTO
          </button>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="text-center text-sm text-gray-500 py-8">
        © 2025 Estratégia FTX Mente — Pagamento seguro • Suporte por e-mail/WhatsApp.
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/5599999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
      >
        WA
      </a>
    </div>
  );
};

export default LandingPage;