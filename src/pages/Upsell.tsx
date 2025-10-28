import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function UpsellPage() {
  const userLang = navigator.language.toLowerCase();
  const isEnglish = userLang.includes("en");

  const content = {
    title: isEnglish
      ? "🧠 Upgrade Your Mind — High-Performance Trader Habits Guide"
      : "🧠 Eleve Sua Mente — Guia de Hábitos do Trader de Alta Performance",
    message: isEnglish
      ? "You've mastered the technique — now it's time to master the mind behind it."
      : "Você dominou a técnica — agora é hora de dominar a mente por trás dela.",
    subtitle: isEnglish
      ? "Transform your focus, discipline, and consistency with the mental principles that separate elite traders from the rest."
      : "Transforme seu foco, disciplina e consistência com os princípios mentais que diferenciam traders de elite dos demais.",
    ctaYes: isEnglish
      ? "🔥 Yes! I want to master my mindset for $29.90"
      : "🔥 Sim! Quero dominar minha mente por R$ 29,90",
    ctaNo: isEnglish
      ? "No, I'll continue without the guide"
      : "Não, vou continuar sem o guia",
    benefits: isEnglish
      ? [
          "Build habits of consistency and focus.",
          "Eliminate emotional impulses during trading.",
          "Learn mindset control inspired by psychology and neuroscience.",
        ]
      : [
          "Construa hábitos de consistência e foco.",
          "Elimine impulsos emocionais durante as operações.",
          "Aprenda controle mental inspirado em psicologia e neurociência.",
        ],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-center text-white">
      <Card className="bg-[#141414] border border-gray-800 max-w-2xl shadow-2xl rounded-2xl p-8">
        <CardContent>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold mb-4 text-yellow-400"
          >
            {content.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg mb-3 text-gray-300"
          >
            {content.message}
          </motion.p>
          <p className="text-gray-400 mb-6">{content.subtitle}</p>

          <ul className="text-left space-y-2 mb-6 list-disc list-inside text-gray-300">
            {content.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-lg py-6">
              {content.ctaYes}
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              {content.ctaNo}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
