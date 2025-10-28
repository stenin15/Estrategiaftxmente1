import { Helmet } from "react-helmet";

export default function Entrega() {
  const userLang = navigator.language || navigator.languages[0];
  const isEnglish =
    userLang.startsWith("en") || userLang.startsWith("us") || userLang.startsWith("uk");

  const pdfLink = "https://seulinkdopdf.com";
  const telegramLink = "https://t.me/+SEULINKDOGRUPO";
  const checkoutLink = "https://estrategiaftxmente1.vercel.app/";

  const lang = isEnglish ? "en" : "pt-BR";

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 text-center relative overflow-hidden"
      lang={lang}
    >
      {/* 🌎 SEO + Social Preview */}
      <Helmet>
        <html lang={lang} />
        <title>
          {isEnglish
            ? "Access Granted — TFX Advanced Trading"
            : "Acesso Liberado — Trading Avançado TFX"}
        </title>
        <meta
          name="description"
          content={
            isEnglish
              ? "Access your TFX Advanced Trading materials and VIP Telegram group now. Master your mind — the market follows."
              : "Acesse agora seu material de estudo e o grupo VIP da Estratégia TFX. Domine a mente — o mercado é consequência."
          }
        />
        <meta property="og:title" content={isEnglish ? "TFX Advanced Trading" : "Estratégia TFX"} />
        <meta
          property="og:description"
          content={
            isEnglish
              ? "Download your study material and join the exclusive TFX VIP Group for 1 month."
              : "Baixe seu material e entre no grupo VIP exclusivo por 1 mês."
          }
        />
        <meta property="og:image" content="https://estrategiaftxmente1.vercel.app/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={lang} />
      </Helmet>

      {/* 🌟 Fundo Animado (leve e premium) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#020202]" />
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/10 blur-3xl rounded-full -top-40 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0 animate-pulse" />

      {/* Conteúdo */}
      <section className="relative z-10 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
          {isEnglish
            ? "🎯 Access Granted — TFX Advanced Trading"
            : "🎯 Acesso Liberado — Trading Avançado TFX"}
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          {isEnglish ? (
            <>
              Welcome to the <strong>TFX Method</strong> — a proven approach to mastering Smart Money
              Concepts.  
              You now have full access to the study material and{" "}
              <span className="text-blue-400 font-semibold">VIP Group (1 month)</span>.
            </>
          ) : (
            <>
              Bem-vindo à <strong>Estratégia TFX</strong> — um método comprovado de domínio dos Smart
              Money Concepts.  
              Agora você tem acesso ao material de estudo e{" "}
              <span className="text-blue-400 font-semibold">ao Grupo VIP (1 mês)</span>.
            </>
          )}
        </p>

        {/* Botões */}
        <div className="flex flex-col gap-4 w-full">
          <a
            href={pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            {isEnglish ? "📘 Download Study Material (PDF)" : "📘 Baixar Material de Estudo (PDF)"}
          </a>

          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            {isEnglish ? "💬 Join VIP Group (1-Month Access)" : "💬 Entrar no Grupo VIP (1 mês de acesso)"}
          </a>

          <a
            href={checkoutLink}
            className="border border-gray-600 py-3 rounded-lg font-medium text-gray-400 hover:text-white hover:border-gray-400 transition"
          >
            {isEnglish ? "↩ Return to Main Page" : "↩ Voltar para a Página Inicial"}
          </a>
        </div>

        <p className="mt-10 text-gray-500 text-sm">
          {isEnglish ? (
            <>
              Your VIP access is valid for 30 days from purchase.  
              Remember: <span className="text-yellow-400">Control your mind — the market follows.</span>
            </>
          ) : (
            <>
              Seu acesso ao grupo VIP é válido por 30 dias após a compra.  
              Lembre-se: <span className="text-yellow-400">Domine a mente — o mercado é consequência.</span>
            </>
          )}
        </p>
      </section>
    </main>
  );
}
