import { Button } from "@/components/ui/button";

export const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          <span className="text-primary">Última Chance</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Não deixe essa oportunidade passar. Transforme sua mentalidade de trader agora mesmo!
        </p>
        
        <Button 
          size="lg" 
          variant="urgent" 
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl py-6 sm:py-8 md:py-10 px-8 sm:px-12 md:px-16 lg:px-20 bg-gradient-to-r from-urgent via-urgent to-urgent/90 hover:from-urgent/90 hover:via-urgent/90 hover:to-urgent/80 shadow-[0_0_50px_rgba(255,165,0,0.8)] hover:shadow-[0_0_80px_rgba(255,165,0,1)] hover:scale-110 transition-all duration-500 border-2 border-urgent/60 hover:border-urgent font-black tracking-wide"
          onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
        >
          🚀 LIBERTE SUA MENTE AGORA!
        </Button>
        
        <p className="text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
          Acesso imediato ao guia completo + todos os bônus por <span className="font-bold text-urgent">R$ 59,90</span>
        </p>
      </div>
    </section>
  );
};