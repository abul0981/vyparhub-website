import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    city: "Kirana Store · Agra, UP",
    img: "/images/retailer-kirana-1.jpg",
    text: "VyparHub se order karne ke baad us hi din FMCG stock aa jata hai. Pay Later option ne meri working capital free kar di.",
  },
  {
    name: "Sunita Devi",
    city: "Fashion Store · Ludhiana, Punjab",
    img: "/images/retailer-fashion-1.jpg",
    text: "Fashion ka latest stock seedha factory se mil raha hai. Pehle Surat jaake laana padta tha, ab phone se order ho jata hai.",
  },
  {
    name: "Imran Ali",
    city: "Kirana · Jaipur, Rajasthan",
    img: "/images/retailer-kirana-2.jpg",
    text: "Real prices, real margin. Koi bich ka middleman nahi. 2 ghante mein FMCG delivery — kamaal ki service hai.",
  },
  {
    name: "Lakshmi Bai",
    city: "General Store · Bhopal, MP",
    img: "/images/retailer-kirana-3.jpg",
    text: "Hindi mein support milta hai, app bhi simple hai. Gaon ke dukandaar ke liye perfect platform.",
  },
  {
    name: "Mohammed Iqbal",
    city: "Garments · Aligarh, UP",
    img: "/images/retailer-fashion-2.jpg",
    text: "Jeans aur shirts factory se direct. Pay Later ki wajah se naya stock rakhne ka risk nahi.",
  },
];

export function Feedback() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">Real retailer feedback</span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight sm:text-4xl">
            Bharat ke <span className="text-gradient-brand">retailers</span> kya bolte hain
          </h2>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-glow sm:p-10">
          <Quote className="absolute right-6 top-6 h-16 w-16 text-brand/10" />
          <div className="relative min-h-[220px]">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  opacity: idx === i ? 1 : 0,
                  transform: idx === i ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="flex items-center gap-1 text-orange">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 font-display text-lg font-medium leading-relaxed sm:text-xl">
                  "{t.text}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full border-2 border-brand object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-6 flex justify-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-brand" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
        </div>

        {/* Retailer photo strip — marquee */}
        <div className="mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee gap-4">
            {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
              <div key={idx} className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
                <img src={t.img} alt="" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-xs font-medium">{t.name} · {t.city.split("·")[1]?.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
