import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";
import heroImage from "@/assets/hero-trader.jpg";

export const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-background relative overflow-hidden section-container">
      {/* Efeito de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,188,212,0.1),transparent_50%)]" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* COLUNA TEXTO */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* LOGO + selo */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <AnimatedLogo />
            </div>

            {/* Título */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary drop-shadow-[0_0_10px_rgba(0,188,212,0.5)]">
                Domine o Mercado com a Mente.
              </span>
              <br />
              <span className="text-foreground">De Trader Amador a</span>{" "}
              <span className="text-urgent">Profissional Consciente.</span>
            </h1>

            {/* Descrição */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              Você já estudou setups, mas ainda sente{" "}
              <span className="font-bold text-urgent">medo e ansiedade</span> ao operar?{" "}
              <span className="font-bold text-primary">
                Descubra como reprogramar sua mente e operar com clareza total
              </span>{" "}
              — dominando a leitura institucional e executando sem travar.
            </p>

            {/* Lista de benefícios */}
            <ul className="space-y-2 sm:space-y-3 text-left max-w-md mx-auto lg:mx-0">
              {[
                "Reprogramação mental testada por traders de alto desempenho",
                "Leitura institucional SMC explicada passo a passo",
                "Sistema de execução profissional com métricas de progresso",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Botão principal */}
            <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-3">
              <Button
                size="lg"
                variant="urgent"
                className="w-full sm:w-auto text-sm sm:text-base md:text-lg lg:text-xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-12 shadow-[0_0_20px_rgba(255,165,0,0.6)] hover:shadow-[0_0_30px_rgba(255,165,0,0.8)] hover:scale-105 transition-all"
                onClick={scrollToForm}
              >
                🚀 QUERO DESBLOQUEAR MINHA MENTE AGORA!
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
                Acesso imediato ao guia completo + bônus exclusivos
              </p>
            </div>

            {/* Frase destaque */}
            <div className="bg-primary/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl border border-primary/30 shadow-[0_0_30px_rgba(0,188,212,0.2)] mt-4">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center leading-relaxed">
                <span className="text-primary">Com clareza mental</span>, cada trade deixa de ser sorte —{" "}
                <span className="text-urgent">e vira execução</span>.
              </p>
            </div>
          </div>

          {/* COLUNA IMAGEM */}
          <div className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/30">
              <img src={heroImage} alt="Trader Profissional TFX" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};