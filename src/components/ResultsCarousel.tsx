import { motion } from "framer-motion";

const images = [
  // Gráficos antes
  "/eth'1.webp",
  "/eth2.webp", 
  "/libra1.webp",
  "/libra2.webp",
  "/usd1.webp",
  "/usd2.webp",
  "/xau1.webp",
  "/xau2.webp",
  "/pepe1.webp",
  "/pepe2.webp",
  // Resultados depois
  "/resultado cripto 1  (1).jpeg",
  "/resultado cripto 1  (3).jpeg",
  "/resultado cripto 1  (8).jpeg",
  "/resultado cripto 2.jpeg",
  "/resultado forex 1  (6).jpeg",
  "/resultado forex 2  (2).jpeg",
  "/resultado forex 3  (5).jpeg",
  "/resultado forex 4  (7).jpeg",
  // Imagens adicionais do WhatsApp
  "/WhatsApp Image 2025-10-21 at 17.07.37 (1).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.07.37.jpeg",
  "/WhatsApp Image 2025-10-21 at 17.07.38 (1).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.12 (1).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.24 (1).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.24.jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.34.jpeg",
  "/WhatsApp Image 2025-10-22 at 00.13.37.jpeg",
];

export default function ResultsCarousel() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1e23] to-[#081518] py-16 rounded-3xl shadow-2xl border border-[#0a2a33] max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
        🎯 Transformações Visuais e Resultados Aplicados
      </h2>

      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
        Veja a evolução real — de gráficos a lucros. Um ciclo contínuo mostrando
        o impacto da Estratégia <span className="text-green-400 font-semibold">TFX</span> em cada etapa.
      </p>

      {/* Carrossel com scroll automático */}
      <div className="perspective-[1200px] overflow-hidden">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="relative min-w-[320px] md:min-w-[400px] transform transition-transform hover:rotate-y-3 hover:scale-105 duration-500 bg-[#0f2126] rounded-2xl border border-[#14343c] shadow-lg shadow-[0_0_40px_#00ff9d33]"
            >
              <img
                src={src}
                alt={`Resultado TFX ${index + 1}`}
                className="w-full h-[280px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
                <p className="text-white text-sm font-semibold">
                  {index < images.length ? 'Gráfico' : 'Resultado'} TFX
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        Loop contínuo: Gráficos antes • Resultados depois • Lucros reais de corretora
      </p>
    </section>
  );
}
