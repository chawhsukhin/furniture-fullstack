function Services() {
  return (
    <div className="container mx-auto py-16 px-4 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-teal-900 dark:text-white">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We provide end-to-end interior design, custom furniture crafting, and home setup solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl mb-6">
            🛋️
          </div>
          <h3 className="text-xl font-bold mb-3">Custom Furniture Design</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Tailor-made tables, chairs, and sofas handcrafted to match your space dimensions and aesthetic preferences.
          </p>
        </div>

        <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xl mb-6">
            📐
          </div>
          <h3 className="text-xl font-bold mb-3">Interior Space Planning</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Professional interior consultation to maximize room layout, lighting, and comfortable living flow.
          </p>
        </div>

        <div className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-6">
            🚚
          </div>
          <h3 className="text-xl font-bold mb-3">White Glove Delivery & Setup</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Hassle-free shipping, room placement, assembly, and packaging removal by our expert care team.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
