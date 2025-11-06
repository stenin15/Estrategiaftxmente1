import { motion } from "framer-motion";

const checkout = "https://pay.cakto.com.br/3d5yxy3_619402";

export default function BF2025() {
  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-[#0b0b0b] to-[#111] text-white relative overflow-hidden">
      {/* Fundo animado - mesmo estilo do quiz */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#020202]" />
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/10 blur-3xl rounded-full -top-40 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0 animate-pulse" />

      {/* Ribbon BF */}
      <div className="relative z-10 w-full bg-[#0f172a] text-teal-300 text-center text-xs tracking-wide py-2 border-b border-white/5">
        BÔNUS EXCLUSIVO POR CONCLUIR O QUIZ · BLACK FRIDAY 2025
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-16">
        {/* Headline + Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
            Você terminou o TFX Mind Quiz — <br className="hidden md:block" />
            <span className="text-teal-300">destrave hoje o método completo</span> com um investimento baixo.
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto text-lg">
            De <span className="line-through text-white/60">R$ 499,90</span> por{" "}
            <span className="text-teal-300 font-semibold text-xl">R$ 49,90</span> (acesso imediato + materiais de apoio). Oferta bônus liberada só para quem concluiu o quiz.
          </p>
        </motion.div>

        {/* Bullets */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-3 mt-8"
        >
          {[
            "Aprenda a ler fluxo institucional (sem promessas mágicas).",
            "Método prático para decidir quando entrar, segurar e sair.",
            "Comunidade com análises ao vivo e feedback direto.",
          ].map((t, i) => (
            <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-teal-300 shrink-0 mt-0.5 font-bold">✓</span>
              <span className="text-white/90 text-sm">{t}</span>
            </li>
          ))}
        </motion.ul>

        {/* Card de Preço */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm"
          style={{
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-medium mb-3">
            <span>🎁</span> Bônus por concluir o quiz
          </div>
          <div className="text-white/70 line-through text-lg">R$ 499,90</div>
          <div className="text-4xl md:text-5xl font-extrabold text-teal-300 mt-2">R$ 49,90</div>
          <div className="text-white/70 mt-1 text-sm">Black Friday 2025 • acesso imediato</div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(checkout, "_blank")}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-teal-500 text-black font-semibold px-6 py-4 rounded-2xl hover:brightness-110 transition shadow-lg text-lg cta-pulsante"
          >
            <span>💳</span>
            Quero destravar o método por R$ 49,90 →
          </motion.button>

          <div className="text-gray-400 text-xs mt-3">
            Garantia incondicional de 7 dias • Acesso vitalício ao material
          </div>
        </motion.div>

        {/* Offer Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-4 mt-8"
        >
          {[
            "📘 Guia TFX Avançado (PDF) — leitura objetiva + exemplos reais",
            "🎥 Aulas passo a passo (do 0 ao plano de execução)",
            "🧭 Playbooks: Entrada IFC, CHoCH, IDM (download)",
            "📈 Checklists operacionais + planilha de gestão",
            "👥 1 mês de Comunidade TFX (acesso a análises e discussões)",
            "🧠 Bonus: Mini-treinamento \"Disciplina em 7 dias\"",
          ].map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/90 backdrop-blur-sm text-sm">
              {t}
            </div>
          ))}
        </motion.div>

        {/* Garantia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 p-5 rounded-2xl bg-[#0f172a] border border-white/10 text-center backdrop-blur-sm"
        >
          <div className="inline-flex items-center gap-2 text-teal-300 mb-2">
            <span>🛡️</span> <span className="font-semibold">Garantia 7 dias</span>
          </div>
          <p className="text-white/80 text-sm">
            Se não fizer sentido para você, devolvemos 100% do valor. Resultados reais pedem leitura, método e execução — é isso que você vai levar.
          </p>
        </motion.div>

        {/* Rodapé */}
        <div className="text-center text-yellow-400 mt-10 text-sm font-semibold">
          "Domine a mente — o mercado é consequência."
        </div>
      </div>

      {/* CSS para pulsação do CTA */}
      <style>{`
        @keyframes ctaPulse {
          0% {
            transform: scale(1);
            box-shadow: 
              0 0 20px rgba(16, 185, 129, 0.8),
              0 0 40px rgba(16, 185, 129, 0.6),
              0 0 60px rgba(16, 185, 129, 0.4);
          }
          50% {
            transform: scale(1.12);
            box-shadow: 
              0 0 30px rgba(16, 185, 129, 1),
              0 0 60px rgba(16, 185, 129, 0.9),
              0 0 90px rgba(16, 185, 129, 0.7),
              0 0 120px rgba(16, 185, 129, 0.4);
          }
          100% {
            transform: scale(1);
            box-shadow: 
              0 0 20px rgba(16, 185, 129, 0.8),
              0 0 40px rgba(16, 185, 129, 0.6),
              0 0 60px rgba(16, 185, 129, 0.4);
          }
        }
        
        .cta-pulsante {
          animation: ctaPulse 1.5s ease-in-out infinite !important;
        }
        
        .cta-pulsante:hover {
          animation: none !important;
          transform: scale(1.05) !important;
          box-shadow: 
            0 0 40px rgba(16, 185, 129, 1),
            0 0 80px rgba(16, 185, 129, 0.8) !important;
        }
      `}</style>
    </div>
  );
}

