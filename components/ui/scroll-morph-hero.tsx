import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { realisations } from "@/src/data/site";

export type AnimationPhase = "scatter" | "line" | "circle";

type CardTarget = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
};

type FlipCardProps = {
  src: string;
  label: string;
  index: number;
  target: CardTarget;
};

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;
const MORPH_SCROLL = 650;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

function FlipCard({ src, label, index, target }: FlipCardProps) {
  return (
    <motion.a
      href="/#realisations"
      aria-label={`Voir la réalisation ${label}`}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 42,
        damping: 16,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-md border border-foreground/10 bg-white shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading={index < 5 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/12 transition-colors group-hover:bg-transparent" />
        </div>

        <div
          className="absolute inset-0 flex h-full w-full flex-col justify-end overflow-hidden rounded-md border border-primary/35 bg-white p-2 shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-[7px] font-black uppercase tracking-[0.18em] text-primary">Projet</span>
          <span className="mt-1 line-clamp-2 text-[10px] font-bold leading-tight text-foreground">{label}</span>
        </div>
      </motion.div>
    </motion.a>
  );
}

export function ScrollMorphHero() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const virtualScroll = useMotionValue(0);
  const mouseX = useMotionValue(0);

  const heroItems = useMemo(
    () =>
      realisations.slice(0, TOTAL_IMAGES).map((realisation) => ({
        src: realisation.image,
        label: realisation.title,
      })),
    [],
  );

  const scatterPositions = useMemo(
    () =>
      heroItems.map((_, index) => {
        const angle = index * 1.91;
        return {
          x: Math.cos(angle) * (540 + (index % 4) * 130),
          y: Math.sin(angle * 1.2) * (320 + (index % 5) * 56),
          rotation: ((index % 7) - 3) * 24,
          scale: 0.62,
          opacity: 0,
        };
      }),
    [heroItems],
  );

  const morphProgress = useTransform(virtualScroll, [0, MORPH_SCROLL], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 42, damping: 21 });
  const scrollRotate = useTransform(virtualScroll, [MORPH_SCROLL, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 42, damping: 21 });
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 22 });
  const contentOpacity = useTransform(smoothMorph, [0.74, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.74, 1], [20, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(container);
    setContainerSize({ width: container.offsetWidth, height: container.offsetHeight });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = (deltaY: number) => {
      const nextScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      const consumed = nextScroll !== scrollRef.current;
      scrollRef.current = nextScroll;
      virtualScroll.set(nextScroll);
      return consumed;
    };

    const handleWheel = (event: WheelEvent) => {
      if (updateScroll(event.deltaY)) {
        event.preventDefault();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? touchStartY;
      const consumed = updateScroll(touchStartY - touchY);
      touchStartY = touchY;
      if (consumed) {
        event.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 92);
    };

    const handleMouseLeave = () => mouseX.set(0);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX]);

  useEffect(() => {
    const lineTimer = window.setTimeout(() => setIntroPhase("line"), 450);
    const circleTimer = window.setTimeout(() => setIntroPhase("circle"), 2100);

    return () => {
      window.clearTimeout(lineTimer);
      window.clearTimeout(circleTimer);
    };
  }, []);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);

    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothMouseX, smoothScrollRotate]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92svh] overflow-hidden bg-white text-foreground"
      aria-label="Présentation Orange Bleue"
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.92))]" />

      <div className="relative flex min-h-[92svh] w-full flex-col items-center justify-center pt-16">
        <div className="pointer-events-none absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center px-5 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="flex w-[min(600px,64vw)] flex-col items-center leading-none"
          >
            <span className="whitespace-nowrap font-sans text-[clamp(1.5rem,2.7vw,2.8rem)] font-semibold leading-none text-foreground">
              Donner forme a votre visibilite.
            </span>
            <span className="mt-4 max-w-md text-xs font-bold uppercase leading-5 tracking-[0.18em] text-foreground/58">
              Enseignes, covering et signaletique fabriques pour marquer durablement.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.74 - morphValue } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-primary"
          >
            Faites défiler pour explorer
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="pointer-events-none absolute top-[12%] z-20 flex w-[min(940px,92vw)] flex-col items-center justify-center text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-white/88 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-foreground/72 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            Annecy · Haute-Savoie · Genève
          </div>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6.8rem)] font-black leading-[0.9] text-balance">
            Votre visibilité en mouvement.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-xl">
            Enseignes, covering, vitrophanie et signalétique : une fabrication locale pensée pour rendre votre
            entreprise visible, durablement.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/#realisations"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-bold text-primary-foreground shadow-premium transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Voir les réalisations
              <ArrowDownRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="/#devis"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-white px-6 text-base font-bold text-foreground shadow-sm backdrop-blur transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Demander un devis
            </a>
          </div>
        </motion.div>

        <div className="relative flex min-h-[92svh] w-full items-center justify-center">
          {heroItems.map(({ src, label }, index) => {
            let target: CardTarget = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[index];
            } else if (introPhase === "line") {
              const lineSpacing = containerSize.width < 768 ? 42 : 70;
              const lineTotalWidth = heroItems.length * lineSpacing;
              target = {
                x: index * lineSpacing - lineTotalWidth / 2,
                y: containerSize.width < 768 ? 92 : 0,
                rotation: 0,
                scale: containerSize.width < 768 ? 0.82 : 1,
                opacity: 1,
              };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width || 1, containerSize.height || 1);
              const circleRadius = Math.min(minDimension * 0.34, 330);
              const circleAngle = (index / heroItems.length) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius = Math.min(containerSize.width || 1, (containerSize.height || 1) * 1.55);
              const arcRadius = baseRadius * (isMobile ? 1.36 : 1.08);
              const arcApexY = (containerSize.height || 1) * (isMobile ? 0.4 : 0.28);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 104 : 132;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (heroItems.length - 1);
              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const boundedRotation = -scrollProgress * spreadAngle * 0.78;
              const currentArcAngle = startAngle + index * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.28 : 1.78,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return <FlipCard key={`${label}-${index}`} src={src} label={label} index={index} target={target} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default ScrollMorphHero;
