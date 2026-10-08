import { useNavigate } from "react-router-dom";
import { Satellite, Leaf, CloudRain, Brain, Map, ArrowRight, Layers } from "lucide-react";

const features = [
  {
    icon: Satellite,
    title: "Satellite Imagery",
    description: "Sentinel-2 10m multispectral imagery processed via Google Earth Engine for real-time vegetation health.",
  },
  {
    icon: Leaf,
    title: "NDVI Analysis",
    description: "Normalized Difference Vegetation Index overlaid on your drawn regions with historical trend tracking.",
  },
  {
    icon: CloudRain,
    title: "Climate Analytics",
    description: "Temperature, precipitation, soil moisture, and air quality data from Open-Meteo per region.",
  },
  {
    icon: Layers,
    title: "Soil Profiling",
    description: "pH, organic carbon, nitrogen, CEC, and texture classification from ISRIC SoilGrids at 250m resolution.",
  },
  {
    icon: Map,
    title: "Land Classification",
    description: "ESA WorldCover 10m land use classification with automatic urban and water body detection.",
  },
  {
    icon: Brain,
    title: "AI Crop Planning",
    description: "Gemini 2.5 Pro generates zone-by-zone crop recommendations with intercropping and rotation plans.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border">
        <span className="text-lg font-semibold tracking-tight">Terraq</span>
        <button
          onClick={() => navigate("/app")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Open Map <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-accent/30 text-xs text-muted-foreground mb-6">
          <Satellite className="w-3.5 h-3.5" />
          Powered by Sentinel-2 · Google Earth Engine · Gemini 2.5 Pro
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-foreground leading-tight mb-5">
          Satellite intelligence<br />for your land
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
          Draw a region on the map. Get NDVI vegetation health, soil profiles, climate analytics, land use classification, and AI crop planning — instantly.
        </p>
        <button
          onClick={() => navigate("/app")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Open the map <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Screenshot */}
      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
          <img
            src="/project-virdis.png"
            alt="Terraq dashboard preview"
            className="w-full block"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center mb-12">Everything in one place</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 max-w-xl mx-auto w-full text-center">
        <div className="p-10 rounded-2xl border border-border bg-card">
          <h2 className="text-2xl font-semibold mb-3">Ready to analyse your land?</h2>
          <p className="text-sm text-muted-foreground mb-7">Draw your first region and get results in seconds.</p>
          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity mx-auto"
          >
            Open the map <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border px-8 py-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>Terraq</span>
        <span>Satellite · Soil · AI</span>
      </footer>

    </div>
  );
};

export default Landing;
