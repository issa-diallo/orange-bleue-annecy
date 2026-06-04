import covering01 from "../../assets/covering/vehicule-01.jpg";
import covering02 from "../../assets/covering/vehicule-02.jpg";
import covering04 from "../../assets/covering/vehicule-04.jpg";
import covering07 from "../../assets/covering/vehicule-07.jpg";
import deco01 from "../../assets/deco/deco-01.jpg";
import deco03 from "../../assets/deco/deco-03.jpg";
import deco06 from "../../assets/deco/deco-06.jpg";
import enseigne01 from "../../assets/enseignes/enseigne-01.jpg";
import enseigne01b from "../../assets/enseignes/enseigne-01b.jpg";
import enseigne03 from "../../assets/enseignes/enseigne-03.jpg";
import enseigne06 from "../../assets/enseignes/enseigne-06.jpg";
import impression01 from "../../assets/impression/impression-xxl-01.jpg";
import impression02 from "../../assets/impression/impression-xxl-02.jpg";
import impression04 from "../../assets/impression/impression-xxl-04.jpg";
import impression07 from "../../assets/impression/impression-xxl-07.jpg";
import signaletique01 from "../../assets/signaletique/signaletique-01.jpg";
import signaletique03 from "../../assets/signaletique/signaletique-03.jpg";
import signaletique05 from "../../assets/signaletique/signaletique-05.jpg";
import signaletique07 from "../../assets/signaletique/signaletique-07.jpg";
import vitrage01 from "../../assets/vitrage/vitrage-01.jpg";
import vitrage03 from "../../assets/vitrage/vitrage-03-bis.jpg";
import vitrage05 from "../../assets/vitrage/vitrage-05.jpg";
import vitrage07 from "../../assets/vitrage/vitrage-07.jpg";

export const filters = [
  "Toutes",
  "Enseignes",
  "Covering véhicules",
  "Signalétique",
  "Impression grand format",
  "Vitrophanie",
  "Décoration murale",
] as const;

export type Filter = (typeof filters)[number];
export type Category = Exclude<Filter, "Toutes">;

export type Realisation = {
  id: string;
  title: string;
  category: Category;
  location: string;
  image: string;
  featured?: boolean;
};

export const services = [
  {
    title: "Enseignes",
    description: "Création, fabrication et pose d'enseignes professionnelles.",
  },
  {
    title: "Covering véhicules",
    description: "Transformez vos véhicules en supports publicitaires mobiles.",
  },
  {
    title: "Signalétique",
    description: "Solutions intérieures et extérieures sur mesure.",
  },
  {
    title: "Impression grand format",
    description: "Supports visuels de grande dimension pour vos événements et locaux.",
  },
] as const;

export const heroCards = [
  {
    label: "Enseigne lumineuse",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=90",
  },
  {
    label: "Covering premium",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90",
  },
  {
    label: "Atelier & impression",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=90",
  },
  {
    label: "Vitrine commerciale",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2400&q=90",
  },
] as const;

export const realisations: Realisation[] = [
  { id: "enseigne-1", title: "Façade commerciale", category: "Enseignes", location: "Annecy", image: enseigne01, featured: true },
  { id: "covering-1", title: "Flotte de véhicules", category: "Covering véhicules", location: "Haute-Savoie", image: covering01, featured: true },
  { id: "signal-1", title: "Parcours signalétique", category: "Signalétique", location: "Annecy", image: signaletique01 },
  { id: "print-1", title: "Visuel très grand format", category: "Impression grand format", location: "Suisse romande", image: impression01 },
  { id: "vitrine-1", title: "Habillage de vitrine", category: "Vitrophanie", location: "Genève", image: vitrage01, featured: true },
  { id: "deco-1", title: "Décoration murale", category: "Décoration murale", location: "Annecy", image: deco01 },
  { id: "enseigne-2", title: "Lettrage extérieur", category: "Enseignes", location: "Haute-Savoie", image: enseigne01b },
  { id: "covering-2", title: "Marquage utilitaire", category: "Covering véhicules", location: "Annecy", image: covering02 },
  { id: "signal-2", title: "Signalétique directionnelle", category: "Signalétique", location: "Genève", image: signaletique03 },
  { id: "print-2", title: "Bâche événementielle", category: "Impression grand format", location: "Haute-Savoie", image: impression02 },
  { id: "vitrine-2", title: "Vitrine institutionnelle", category: "Vitrophanie", location: "Annecy", image: vitrage03 },
  { id: "deco-2", title: "Mur graphique", category: "Décoration murale", location: "Suisse romande", image: deco03 },
  { id: "enseigne-3", title: "Signal haut de façade", category: "Enseignes", location: "Genève", image: enseigne03 },
  { id: "covering-3", title: "Branding véhicule", category: "Covering véhicules", location: "Haute-Savoie", image: covering04 },
  { id: "signal-3", title: "Marquage d'espace", category: "Signalétique", location: "Annecy", image: signaletique05 },
  { id: "print-3", title: "Impression XXL", category: "Impression grand format", location: "Annecy", image: impression04 },
  { id: "vitrine-3", title: "Vitrophanie sur mesure", category: "Vitrophanie", location: "Suisse romande", image: vitrage05 },
  { id: "deco-3", title: "Identité murale", category: "Décoration murale", location: "Haute-Savoie", image: deco06 },
  { id: "enseigne-4", title: "Pose enseigne", category: "Enseignes", location: "Annecy", image: enseigne06 },
  { id: "covering-4", title: "Covering partiel", category: "Covering véhicules", location: "Genève", image: covering07 },
  { id: "signal-4", title: "Signalétique extérieure", category: "Signalétique", location: "Haute-Savoie", image: signaletique07 },
  { id: "print-4", title: "Support événementiel", category: "Impression grand format", location: "Genève", image: impression07 },
  { id: "vitrine-4", title: "Vitrage commercial", category: "Vitrophanie", location: "Annecy", image: vitrage07 },
];
