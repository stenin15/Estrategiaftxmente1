import { useEffect, useState } from "react";
import "./pulse.css"; // Arquivo CSS adicional para animação

export const OfertaFinal = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutos = 3600 segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <section className="py-16 text-center bg-zinc-950 text-white px-6">
      <h2 className="text-3xl font-bold mb-2">
        🔥 Últimas Horas da Oferta
      </h2>
      <p className="text-gray-400 mb-10 max-w-xl mx-auto">
        Domine o mercado, transforme sua mentalidade e opere como os insiders.
      </p>

      <div className="bg-zinc-900 border border-cyan-700 rounded-2xl p-6 max-w-lg mx-auto shadow-lg">
        <h3 className="text-cyan-400 text-xl font-bold mb-4 flex items-center justify-center gap-2">
          💎 Pacote Completo FTX Mente
        </h3>

        <ul className="text-left text-gray-300 space-y-2 mb-6">
          <li>✅ Estratégia completa (R$299,90)</li>
          <li>✅ Guia de Mindset & Gestão (R$99,90)</li>
          <li>✅ Checklist + Atualizações (R$49,90)</li>
          <li>✅ Suporte direto 7 dias (R$49,90)</li>
        </ul>

        <p className="text-gray-400 line-through text-sm">De R$499,60</p>
        <p className="text-2xl font-extrabold text-white mb-6">
          Hoje: <span className="text-green-400 pulse-text">R$49,90</span> 🔥
        </p>

        <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-full transition-all w-full shadow-lg pulse-btn">
          QUERO GARANTIR MEU ACESSO AGORA →
        </button>

        <div className="mt-6 text-sm text-gray-400">
          <p>
            ⏰ Oferta expira em:{" "}
            <span className="text-red-400 font-bold pulse-text">
              {formatTime(timeLeft)}
            </span>
          </p>
          <p className="text-xs mt-1">
            🎁 Bônus incluso apenas enquanto o cronômetro estiver ativo!
          </p>
        </div>

        <div className="flex justify-center gap-3 text-xs text-gray-500 mt-4">
          <span>💳 Pagamento 100% seguro</span>
          <span>⚡ Acesso imediato</span>
          <span>💬 Suporte 7 dias</span>
        </div>
      </div>
    </section>
  );
};

