import { useEffect } from "react";
import "./pulse.css"; // Arquivo CSS adicional para animação

export const OfertaFinal = () => {
  // 🕒 CRONÔMETRO SINCRONIZADO - 30 MINUTOS
  const OFFER_DURATION = 30 * 60; // 30 minutos em segundos
  let timeRemaining = OFFER_DURATION;
  let countdownInterval: number | null = null;

  useEffect(() => {
    // Função de cronômetro sincronizado
    function startCountdown() {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }

      countdownInterval = setInterval(() => {
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

    startCountdown();

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, []);

  return (
    <section className="bg-[#001a1a] text-white py-20">
      <div className="section-box text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        🔥 Últimas Horas da Oferta
      </h2>
      <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
        Domine o mercado, transforme sua mentalidade e opere como os insiders.
      </p>

          <div className="offer-card max-w-2xl mx-auto">
        <h3 className="text-cyan-400 text-2xl font-bold mb-6 flex items-center justify-center gap-2">
          💎 Pacote Completo TFX Mente
        </h3>

        <ul className="text-left text-gray-300 space-y-3 mb-8 text-lg">
          <li>✅ Estratégia completa (R$299,90)</li>
          <li>✅ Guia de Mindset & Gestão (R$99,90)</li>
          <li>✅ Checklist + Atualizações (R$49,90)</li>
          <li>✅ Suporte direto 7 dias (R$49,90)</li>
        </ul>

        <p className="text-gray-400 line-through text-lg mb-2">De R$499,60</p>
            <p className="text-4xl font-extrabold text-white mb-8">
              Hoje: <span className="text-green-400 pulse-price">R$59,90</span> 🔥
            </p>

        <button className="button-cta bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-12 py-6 rounded-full transition-all w-full shadow-lg pulse-btn text-lg">
          🟦 QUERO GARANTIR MEU ACESSO AGORA →
        </button>

            <div className="mt-8 text-lg text-gray-400">
              <p>
                ⏰ Oferta expira em:{" "}
                <span className="countdown-timer text-xl">
                  30:00
                </span>
              </p>
              <p className="text-center text-sm mt-3 text-orange-400 font-semibold">
                ⚠️ Essa oferta expira em instantes — quando o tempo zerar, o bônus desaparece e o valor sobe.
              </p>
            </div>

        <div className="flex justify-center gap-6 text-sm text-gray-500 mt-6">
          <span>💳 Pagamento 100% seguro</span>
          <span>⚡ Acesso imediato</span>
          <span>💬 Suporte 7 dias</span>
        </div>
      </div>
      </div>
    </section>
  );
};

