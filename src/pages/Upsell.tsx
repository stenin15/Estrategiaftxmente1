import { motion } from "framer-motion";

export default function Upsell() {
  const userLang = navigator.language || navigator.userLanguage;
  const isEnglish = userLang.startsWith("en");

  const content = {
    title: isEnglish
      ? "🧠 Upgrade Your Mind — High-Performance Trader Habits Guide"
      : "🧠 Eleve Sua Mente — Guia de Hábitos do Trader de Alta Performance",
    description: isEnglish
      ? "Discover the habits and mindset that separate elite traders from amateurs. Focus, discipline, emotional control — everything you need to evolve mentally and financially."
      : "Descubra os hábitos e a mentalidade que separam os traders de elite dos amadores. Foco, disciplina e controle emocional — tudo o que você precisa para evoluir mental e financeiramente.",
    ctaYes: isEnglish
      ? "🔥 Yes! I want to master my mindset for $29.90"
      : "🔥 Sim! Quero dominar minha mente por R$29,90",
    ctaNo: isEnglish
      ? "No, I'll continue without improving my mindset"
      : "Não, quero continuar sem o guia",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-white mb-6"
      >
        {content.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10"
      >
        {content.description}
      </motion.p>

      {/* BOTÃO DE COMPRA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          window.open("https://pay.cakto.com.br/guia-mental-tfx", "_blank")
        }
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-lg md:text-xl py-4 px-10 rounded-full mb-6 transition-all duration-300"
      >
        {content.ctaYes}
      </motion.button>

      {/* BOTÃO DE RECUSA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          window.location.assign("https://estrategiaftxmente1.vercel.app/entrega")
        }
        className="border border-gray-500 text-gray-400 hover:text-white hover:border-white font-medium text-base py-3 px-8 rounded-full transition-all duration-300"
      >
        {content.ctaNo}
      </motion.button>

      <p className="text-gray-600 text-sm mt-10">
        {isEnglish
          ? "1-month access to the VIP group + full digital guide included."
          : "Acesso de 1 mês ao grupo VIP + guia digital completo incluído."}
      </p>
    </div>
  );
}
