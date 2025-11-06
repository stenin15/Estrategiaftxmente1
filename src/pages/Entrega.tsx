import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Entrega() {
  const userLang = navigator.language || navigator.languages[0];
  const isEnglish =
    userLang.startsWith("en") || userLang.startsWith("us") || userLang.startsWith("uk");

  // URL do checkout - substitua pela URL real do seu checkout
  const checkoutUrl = "https://pay.cakto.com.br/YOUR_CHECKOUT_LINK";

  const lang = isEnglish ? "en" : "pt-BR";

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0b0b] to-[#111] text-white text-center px-6 relative overflow-hidden"
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

      {/* 🌟 Fundo Animado (leve e premium) - mesmo estilo do quiz */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#020202]" />
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/10 blur-3xl rounded-full -top-40 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full bottom-0 right-0 animate-pulse" />

      {/* Conteúdo - Tela de ação única dentro de container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Container principal com fundo semi-transparente e bordas */}
        <div className="relative rounded-[18px] border border-white/10 p-8 md:p-10 lg:p-12 shadow-2xl backdrop-blur-md"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 30px rgba(234, 199, 107, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
            {isEnglish
              ? "🎯 Access Granted — TFX Method"
              : "🎯 Acesso Liberado — Método TFX"}
          </h1>

          <p className="text-white/80 mb-8 text-lg leading-relaxed">
            {isEnglish ? (
              <>
                You are one click away from securing full access to the{" "}
                <span className="text-yellow-400 font-semibold">Advanced TFX Training</span>, 
                the community, and the strategies that reveal how major players really operate.
              </>
            ) : (
              <>
                Você está a um clique de garantir acesso completo ao{" "}
                <span className="text-yellow-400 font-semibold">Treinamento Avançado TFX</span>, 
                a comunidade e às estratégias que revelam como os grandes players realmente operam.
              </>
            )}
          </p>

          {/* CTA Principal - Botão pulsante para máxima conversão */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 10px 40px rgba(234, 199, 107, 0.5)',
                '0 15px 50px rgba(234, 199, 107, 0.8)',
                '0 10px 40px rgba(234, 199, 107, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={() => window.open(checkoutUrl, "_blank")}
            className="bg-gradient-to-r from-yellow-400 to-blue-500 text-black font-semibold py-4 px-10 rounded-2xl shadow-lg hover:shadow-yellow-400/50 transition-all text-lg w-full sm:w-auto"
            style={{
              filter: 'brightness(1.05)',
            }}
          >
            {isEnglish ? "Secure my access now →" : "Garantir meu acesso agora →"}
          </motion.button>

          {/* Microcopy abaixo do botão */}
          <p className="text-gray-400 mt-4 text-sm">
            {isEnglish
              ? "Unconditional 7-day guarantee • Lifetime access to material"
              : "Garantia incondicional de 7 dias • Acesso vitalício ao material"}
          </p>

          {/* Frase final em destaque dourado */}
          <p className="text-[#facc15] mt-10 font-semibold text-sm tracking-wide">
            {isEnglish
              ? "Control your mind — the market follows."
              : "Domine a mente — o mercado é consequência."}
          </p>
        </div>
      </motion.div>
    </main>
  );
}
