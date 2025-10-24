export default function ResultsCarousel() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1e23] to-[#081518] py-16 rounded-3xl shadow-2xl border border-[#0a2a33] max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
        🎯 CARROSSEL 3D - TESTE SIMPLES
      </h2>

      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
        Teste básico para verificar se o componente está funcionando.
      </p>

      {/* Teste simples sem animação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#0f2126] rounded-2xl border border-[#14343c] p-4">
          <img src="/eth'1.webp" alt="Teste 1" className="w-full h-48 object-cover rounded-xl" />
          <p className="text-white mt-2">Gráfico ETH</p>
        </div>
        <div className="bg-[#0f2126] rounded-2xl border border-[#14343c] p-4">
          <img src="/eth2.webp" alt="Teste 2" className="w-full h-48 object-cover rounded-xl" />
          <p className="text-white mt-2">Gráfico ETH 2</p>
        </div>
        <div className="bg-[#0f2126] rounded-2xl border border-[#14343c] p-4">
          <img src="/libra1.webp" alt="Teste 3" className="w-full h-48 object-cover rounded-xl" />
          <p className="text-white mt-2">Gráfico Libra</p>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        Se você vê isso, o componente está funcionando!
      </p>
    </section>
  );
}
