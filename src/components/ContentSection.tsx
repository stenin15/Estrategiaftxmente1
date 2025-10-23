import { Button } from "@/components/ui/button";

export const ContentSection = () => {
  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background section-container">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          <span className="text-primary">Método Mente & Mercado™</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
          Transforme sua mentalidade de trader e domine o mercado com clareza total
        </p>
        <Button 
          size="lg" 
          variant="cta" 
          className="text-sm sm:text-base md:text-lg lg:text-xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-12 shadow-[0_0_25px_rgba(0,188,212,0.6)] hover:shadow-[0_0_35px_rgba(0,188,212,0.8)] hover:scale-105 transition-all border-2 border-primary/40"
          onClick={scrollToForm}
        >
          ✨ ACESSAR O MÉTODO COMPLETO POR R$ 59,90
        </Button>
      </div>
    </section>
  );
};