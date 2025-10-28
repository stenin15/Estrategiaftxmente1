export default function Entrega() {
  const userLang = navigator.language || navigator.languages[0];

  const isEnglish =
    userLang.startsWith("en") || userLang.startsWith("us") || userLang.startsWith("uk");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
        {isEnglish ? "🎯 Access Granted — TFX ADVANCED TRADING" : "🎯 Acesso Liberado — TRADING AVANÇADO TFX"}
      </h1>

      <p className="max-w-2xl mb-8 text-gray-300 leading-relaxed">
        {isEnglish ? (
          <>
            Congratulations on investing in yourself!  
            You now have access to the complete <strong>TFX ADVANCED TRADING</strong> material  
            and to the <span className="text-blue-400 font-semibold">VIP Group for 1 month</span>.
          </>
        ) : (
          <>
            Parabéns por investir em si mesmo!  
            Agora você tem acesso ao conteúdo completo do <strong>TRADING AVANÇADO TFX</strong>  
            e ao <span className="text-blue-400 font-semibold">Grupo VIP por 1 mês</span>.
          </>
        )}
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <a
          href="https://seulinkdopdf.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          {isEnglish ? "📘 Download Study Material (PDF)" : "📘 Baixar Material de Estudo (PDF)"}
        </a>

        <a
          href="https://t.me/+SEULINKDOGRUPO"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
        >
          {isEnglish ? "💬 Join VIP Group (1-Month Access)" : "💬 Entrar no Grupo VIP (1 mês de acesso)"}
        </a>
      </div>

      <p className="mt-10 text-gray-500 text-sm max-w-md">
        {isEnglish ? (
          <>
            Your access to the group is valid for 30 days from the purchase date.  
            Remember: <span className="text-yellow-400">Master your mind</span>, and the market will follow.
          </>
        ) : (
          <>
            Seu acesso ao grupo é válido por 30 dias a partir da data da compra.  
            Lembre-se: <span className="text-yellow-400">Domine a mente</span> e o mercado será consequência.
          </>
        )}
      </p>
    </main>
  );
}
