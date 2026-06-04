import { useMemo, useState } from "react";
import { ArrowRight, Building2, Car, GalleryVerticalEnd, MapPin, Menu, Printer, SignpostBig, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FilterTabs } from "@/components/ui/tabs";
import { ScrollMorphHero } from "@/components/ui/scroll-morph-hero";
import { filters, realisations, services, type Filter } from "@/src/data/site";
import orangeBleueLogo from "../assets/hero/main-logo-retina.png";

const serviceIcons = [SignpostBig, Car, MapPin, Printer] as const;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white/82 text-foreground shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-[min(1180px,92vw)] items-center justify-between gap-3">
        <a href="/" className="shrink-0 font-display text-lg font-black tracking-wide" onClick={closeMenu}>
          <img
            src={orangeBleueLogo}
            alt="Orange Bleue Enseigne & Publicité"
            className="h-12 w-auto"
          />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-foreground/70 md:flex">
          <a className="transition hover:text-foreground" href="/#services">
            Services
          </a>
          <a className="transition hover:text-foreground" href="/#realisations">
            Réalisations
          </a>
          <a className="transition hover:text-foreground" href="/#devis">
            Devis
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/#devis"
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            onClick={closeMenu}
          >
            Projet
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-white text-foreground shadow-sm transition hover:border-primary hover:text-primary md:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className={[
          "mx-auto w-[min(1180px,92vw)] overflow-hidden border-t border-border text-sm font-semibold text-foreground/78 transition-[max-height,opacity] duration-200 md:hidden",
          isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col py-2">
          <a className="rounded-md px-3 py-3 transition hover:bg-muted hover:text-foreground" href="/#services" onClick={closeMenu}>
            Services
          </a>
          <a className="rounded-md px-3 py-3 transition hover:bg-muted hover:text-foreground" href="/#realisations" onClick={closeMenu}>
            Réalisations
          </a>
          <a className="rounded-md px-3 py-3 transition hover:bg-muted hover:text-foreground" href="/#devis" onClick={closeMenu}>
            Devis
          </a>
        </div>
      </nav>
    </header>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="max-w-3xl">
          <p className="section-kicker">Savoir-faire</p>
          <h2 className="section-title">Des solutions visuelles pour rendre votre entreprise visible</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="group rounded-md border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-md bg-primary/12 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-black text-foreground">{service.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RealisationsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Toutes");
  const filteredRealisations = useMemo(
    () =>
      activeFilter === "Toutes"
        ? realisations
        : realisations.filter((realisation) => realisation.category === activeFilter),
    [activeFilter],
  );

  return (
    <section id="realisations" className="bg-[#f4f7f7] py-20 md:py-28">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">Réalisations</p>
            <h2 className="section-title">Le savoir-faire réel, visible dans chaque détail</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Enseignes, covering, vitrophanie, impression et décors : une galerie pensée pour aider chaque
              professionnel à se projeter rapidement.
            </p>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-primary" href="/#devis">
            Lancer un projet
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <FilterTabs tabs={filters} active={activeFilter} onChange={setActiveFilter} className="mt-10" />

        <motion.div layout className="mt-8 grid auto-rows-[260px] gap-4 md:grid-cols-3 md:auto-rows-[300px]">
          {filteredRealisations.map((realisation, index) => (
            <motion.article
              layout
              key={realisation.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.32 }}
              className={[
                "group relative overflow-hidden rounded-md bg-black shadow-sm",
                realisation.featured && activeFilter === "Toutes" ? "md:col-span-2 md:row-span-2" : "",
                !realisation.featured && index === 7 && activeFilter === "Toutes" ? "md:row-span-2" : "",
              ].join(" ")}
            >
              <img
                src={realisation.image}
                alt={`${realisation.title} - ${realisation.category}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading={index < 6 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-transparent opacity-90 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">{realisation.category}</p>
                <h3 className="mt-2 font-display text-2xl font-black">{realisation.title}</h3>
                <p className="mt-1 text-sm font-semibold text-white/72">{realisation.location}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="devis" className="bg-[#050708] py-20 text-white md:py-28">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="section-kicker text-primary">Devis</p>
          <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.92]">
            Parlons de votre projet.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
            Enseigne, covering, signalétique ou communication visuelle : nous vous accompagnons de la conception à la
            pose.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Button size="lg" onClick={() => window.location.assign("mailto:contact@orangebleue-publicite.fr")}>
            Demander un devis
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
          <a href="/#realisations" className="inline-flex">
            <Button type="button" size="lg" variant="secondary" className="w-full">
              Voir nos réalisations
              <GalleryVerticalEnd className="h-5 w-5" aria-hidden="true" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function LocalSeoBand() {
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto flex w-[min(1180px,92vw)] flex-col gap-5 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span className="inline-flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
          Plus de 20 ans d'expérience
        </span>
        <span>Annecy · Haute-Savoie · Genève · Suisse romande</span>
        <span>Conception · Fabrication · Pose</span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <ScrollMorphHero />
        <LocalSeoBand />
        <ServicesSection />
        <RealisationsSection />
        <CtaSection />
      </main>
    </>
  );
}
