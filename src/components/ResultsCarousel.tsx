import { motion } from "framer-motion";

const transformacoes = [
  // ANTES DA ESTRATÉGIA
  { 
    src: "/eth'1.webp", 
    label: "Antes da Estratégia", 
    desc: "Gráfico sem padrão claro",
    type: "antes",
    color: "orange"
  },
  { 
    src: "/libra1.webp", 
    label: "Antes da Estratégia", 
    desc: "Análise confusa",
    type: "antes",
    color: "orange"
  },
  
  // DEPOIS DA ESTRATÉGIA
  { 
    src: "/resultado cripto 1  (1).jpeg", 
    label: "Depois da Estratégia", 
    desc: "Leitura nítida e precisa",
    type: "depois",
    color: "green"
  },
  { 
    src: "/resultado cripto 1  (3).jpeg", 
    label: "Depois da Estratégia", 
    desc: "Resultado consistente",
    type: "depois",
    color: "green"
  },
  
  // RESULTADO FINAL
  { 
    src: "/WhatsApp Image 2025-10-21 at 17.07.37 (1).jpeg", 
    label: "Resultado Final", 
    desc: "Lucro consolidado na corretora",
    type: "resultado",
    color: "emerald"
  }
];

export default function ResultsCarousel() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0d1117] to-[#111b22] text-center overflow-hidden">
      {/* Fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0a1a0a] to-[#111b22] animate-pulse"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6">
          🎯 Transformações Reais — direto das telas de quem decidiu mudar o jogo
        </h2>
        
        <p className="text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
          Operações aplicando a Estratégia <span className="text-green-400 font-semibold">TFX</span> capturadas de contas reais. 
          Mais do que números — <span className="text-white font-semibold">prova de disciplina, método e clareza mental em ação.</span>
        </p>

        <h3 className="text-2xl font-bold text-white mb-8">
          📊 Gráficos + Lucros Reais da Corretora
        </h3>

        {/* Timeline 3D */}
        <div className="flex flex-col items-center gap-16 perspective-[1200px]">
          {transformacoes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: -20, y: 100 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`relative w-[90%] max-w-3xl rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,150,0.2)] backdrop-blur-md border-2 ${
                item.color === 'orange' ? 'bg-orange-500/10 border-orange-400/30' :
                item.color === 'green' ? 'bg-green-500/10 border-green-400/30' :
                'bg-emerald-500/10 border-emerald-400/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-lg font-semibold ${
                    item.color === 'orange' ? 'text-orange-300' :
                    item.color === 'green' ? 'text-green-300' :
                    'text-emerald-300'
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.color === 'orange' ? 'bg-orange-500/20 text-orange-300' :
                  item.color === 'green' ? 'bg-green-500/20 text-green-300' :
                  'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {item.type.toUpperCase()}
                </div>
              </div>
              
              <div className="overflow-hidden rounded-xl border border-white/10">
                <img 
                  src={item.src} 
                  alt={item.label} 
                  className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-gray-400 italic mb-8 text-lg">
            Prova real de disciplina, método e clareza mental em ação.
          </p>
          
          <button className="px-12 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-xl rounded-2xl shadow-[0_0_30px_rgba(0,255,150,0.5)] hover:shadow-[0_0_50px_rgba(0,255,150,0.8)] transition-all duration-300 hover:scale-105">
            🚀 Quero aplicar a Estratégia TFX agora
          </button>
        </motion.div>
      </div>
    </section>
  );
}
