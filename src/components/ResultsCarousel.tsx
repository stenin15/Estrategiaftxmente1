import { motion } from "framer-motion";

const images = [
  // SEQUÊNCIA 1: ETH - Gráfico → Resultado → Binance
  { src: "/eth'1.webp", type: "Gráfico", market: "ETH", label: "Análise ETH" },
  { src: "/resultado cripto 1  (1).jpeg", type: "Resultado", market: "ETH", label: "Lucro ETH" },
  { src: "/WhatsApp Image 2025-10-21 at 17.07.37 (1).jpeg", type: "Binance", market: "ETH", label: "Binance ETH" },
  
  // SEQUÊNCIA 2: ETH 2 - Gráfico → Resultado → Binance
  { src: "/eth2.webp", type: "Gráfico", market: "ETH", label: "Análise ETH 2" },
  { src: "/resultado cripto 1  (3).jpeg", type: "Resultado", market: "ETH", label: "Lucro ETH 2" },
  { src: "/WhatsApp Image 2025-10-21 at 17.07.37.jpeg", type: "Binance", market: "ETH", label: "Binance ETH 2" },
  
  // SEQUÊNCIA 3: Libra - Gráfico → Resultado → Binance
  { src: "/libra1.webp", type: "Gráfico", market: "Libra", label: "Análise Libra" },
  { src: "/resultado cripto 1  (8).jpeg", type: "Resultado", market: "Libra", label: "Lucro Libra" },
  { src: "/WhatsApp Image 2025-10-21 at 17.07.38 (1).jpeg", type: "Binance", market: "Libra", label: "Binance Libra" },
  
  // SEQUÊNCIA 4: Libra 2 - Gráfico → Resultado → Binance
  { src: "/libra2.webp", type: "Gráfico", market: "Libra", label: "Análise Libra 2" },
  { src: "/resultado cripto 2.jpeg", type: "Resultado", market: "Libra", label: "Lucro Libra 2" },
  { src: "/WhatsApp Image 2025-10-21 at 17.10.12 (1).jpeg", type: "Binance", market: "Libra", label: "Binance Libra 2" },
  
  // SEQUÊNCIA 5: USD - Gráfico → Resultado → MetaTrader
  { src: "/usd1.webp", type: "Gráfico", market: "USD", label: "Análise USD" },
  { src: "/resultado forex 1  (6).jpeg", type: "Resultado", market: "USD", label: "Lucro USD" },
  { src: "/WhatsApp Image 2025-10-21 at 17.10.24 (1).jpeg", type: "MetaTrader", market: "USD", label: "MetaTrader USD" },
  
  // SEQUÊNCIA 6: USD 2 - Gráfico → Resultado → MetaTrader
  { src: "/usd2.webp", type: "Gráfico", market: "USD", label: "Análise USD 2" },
  { src: "/resultado forex 2  (2).jpeg", type: "Resultado", market: "USD", label: "Lucro USD 2" },
  { src: "/WhatsApp Image 2025-10-21 at 17.10.24.jpeg", type: "MetaTrader", market: "USD", label: "MetaTrader USD 2" },
  
  // SEQUÊNCIA 7: XAU - Gráfico → Resultado → MetaTrader
  { src: "/xau1.webp", type: "Gráfico", market: "XAU", label: "Análise Ouro" },
  { src: "/resultado forex 3  (5).jpeg", type: "Resultado", market: "XAU", label: "Lucro Ouro" },
  { src: "/WhatsApp Image 2025-10-21 at 17.10.34.jpeg", type: "MetaTrader", market: "XAU", label: "MetaTrader Ouro" },
  
  // SEQUÊNCIA 8: XAU 2 - Gráfico → Resultado → MetaTrader
  { src: "/xau2.webp", type: "Gráfico", market: "XAU", label: "Análise Ouro 2" },
  { src: "/resultado forex 4  (7).jpeg", type: "Resultado", market: "XAU", label: "Lucro Ouro 2" },
  { src: "/WhatsApp Image 2025-10-22 at 00.13.37.jpeg", type: "MetaTrader", market: "XAU", label: "MetaTrader Ouro 2" },
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

      {/* Carrossel com scroll automático mais rápido */}
      <div className="perspective-[1200px] overflow-hidden">
        <motion.div
          className="flex space-x-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...images, ...images].map((item, index) => (
            <div
              key={index}
              className="relative min-w-[320px] md:min-w-[400px] transform transition-transform hover:rotate-y-3 hover:scale-105 duration-500 bg-[#0f2126] rounded-2xl border border-[#14343c] shadow-lg shadow-[0_0_40px_#00ff9d33]"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-[280px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-semibold">{item.label}</p>
                    <p className="text-gray-300 text-xs">{item.market}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.type === 'Gráfico' ? 'bg-blue-500/20 text-blue-300' :
                      item.type === 'Resultado' ? 'bg-green-500/20 text-green-300' :
                      item.type === 'Binance' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                </div>
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
