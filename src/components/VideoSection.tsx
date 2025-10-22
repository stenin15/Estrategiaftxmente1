export const VideoSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          <span className="text-primary">Vídeo Explicativo</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-primary/20 rounded-xl p-6 shadow-[0_0_30px_rgba(0,188,212,0.2)]">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Vídeo será inserido aqui</p>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
              Acesso imediato + bônus exclusivos por <span className="font-bold text-primary">R$ 59,90</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};