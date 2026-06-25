import { ChainBackground } from "./ChainBackground";
import phoneFmcg from "@/assets/phone-fmcg.png";
import phoneFashion from "@/assets/phone-fashion.png";
import { ArrowRight, Zap, BadgeIndianRupee, Factory } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

function CountUp({ end, duration = 1600, className, suffix = "+" }: { end: number; duration?: number; className?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(end * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [end, duration]);
  return <span ref={ref} className={className}>{value}{suffix}</span>;
}

export function Hero() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-accent/30">
      <ChainBackground />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-4 pb-20 pt-4 sm:px-6 md:grid-cols-2 md:items-center md:pb-28 md:pt-6 lg:px-8">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
            <Zap className="h-3.5 w-3.5" /> {t("heroBadge")}
          </span>
          <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t("heroTitle1")}
            <span className="block text-gradient-brand">{t("heroTitle2")}</span>
          </h1>
          <p className="mt-5 font-display text-2xl font-bold tracking-tight text-orange sm:text-3xl">
            {t("heroSubtitle")}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("heroDesc")}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground sm:text-lg">
            <span className="bg-gradient-to-r from-brand/20 to-orange/20 px-1 py-1 font-semibold text-foreground">
              {t("heroBelief")}
            </span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("vh:open-modal", { detail: "retailer" }))}
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-brand-foreground shadow-glow transition hover:scale-[1.02]"
            >
              <Factory className="h-4 w-4" />
              {t("loginRetailer")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              disabled
              aria-disabled="true"
              tabIndex={-1}
              className="pointer-events-none inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3 text-sm font-bold opacity-60 backdrop-blur"
            >
              {t("downloadApp")}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BadgeIndianRupee className="h-5 w-5 text-brand" />
              <span><b className="text-foreground">{t("payLater")}</b> {t("payLaterCredit")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange" />
              <span><b className="text-foreground">{t("twoHourLabel")}</b> {t("twoHourFmcg")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-brand" />
              <span>Fastest delivery done by <b className="text-foreground">10 Min</b></span>
            </div>
          </div>
          <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-background/70 p-3 text-center backdrop-blur">
              <CountUp end={50} className="font-display text-2xl font-black text-gradient-brand sm:text-3xl" />
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t("skus")}</div>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-3 text-center backdrop-blur">
              <CountUp end={100} className="font-display text-2xl font-black text-orange sm:text-3xl" />
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t("retailers")}</div>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-3 text-center backdrop-blur">
              <CountUp end={20} className="font-display text-2xl font-black text-brand sm:text-3xl" />
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t("manufacturers")}</div>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-3 text-center backdrop-blur">
              <CountUp end={2} suffix="" className="font-display text-2xl font-black text-orange sm:text-3xl" />
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Hours Delivery</div>
            </div>
          </div>
        </div>

        <div className="relative h-[680px] sm:h-[780px] lg:h-[860px]">
          <div className="absolute -left-4 top-2 w-[72%] rotate-[-6deg] animate-float">
            <div className="absolute inset-x-6 -bottom-6 h-14 rounded-full bg-brand/30 blur-2xl" />
            <img
              src={phoneFmcg}
              alt="VyparHub FMCG app with 2-hour delivery"
              width={1024}
              height={1024}
              className="relative drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)]"
            />
            <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-brand-foreground shadow-lg">
              FMCG • 2 HR
            </span>
          </div>
          <div
            className="absolute -right-4 bottom-0 w-[72%] rotate-[6deg] animate-float"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="absolute inset-x-6 -bottom-6 h-14 rounded-full bg-orange/30 blur-2xl" />
            <img
              src={phoneFashion}
              alt="VyparHub Fashion app"
              width={1024}
              height={1024}
              className="relative drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)]"
            />
            <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-orange px-3 py-1 text-[11px] font-bold text-orange-foreground shadow-lg">
              FASHION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
