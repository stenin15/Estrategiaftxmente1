export const ProofSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          <span className="text-primary">Provas Sociais</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8">
          Veja o que nossos alunos estão dizendo sobre o método
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-primary/20 rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-4">
              "Método revolucionário que mudou minha forma de operar!"
            </p>
            <p className="text-xs font-semibold text-primary">- João Silva</p>
          </div>
        </div>
      </div>
    </section>
  );
};