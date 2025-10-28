import React from "react";

export default function Entrega() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
        🎯 Acesso Liberado — TRADING AVANÇADO TFX
      </h1>

      <p className="max-w-2xl mb-8 text-gray-300 leading-relaxed">
        Parabéns por investir em si mesmo!  
        Agora você tem acesso ao conteúdo completo do <strong>TRADING AVANÇADO TFX</strong>  
        e ao <span className="text-blue-400 font-semibold">Grupo VIP por 1 mês</span>.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a
          href="https://seulinkdopdf.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          📘 Baixar Material de Estudo (PDF)
        </a>

        <a
          href="https://t.me/+SEULINKDOGRUPO"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
        >
          💬 Entrar no Grupo VIP (1 mês de acesso)
        </a>
      </div>

      <p className="mt-10 text-gray-500 text-sm max-w-md">
        Seu acesso ao grupo é válido por 30 dias a partir da data da compra.  
        Lembre-se: <span className="text-yellow-400">Domine a mente</span> e o mercado será consequência.
      </p>
    </main>
  );
}
