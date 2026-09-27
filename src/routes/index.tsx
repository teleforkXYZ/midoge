import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Copy, Minus, Plus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

const MU =
  "https://robinhoodchain.blockscout.com/token/0xfF080c8ce2E5feadaCa0Da81314Ae59D232d4afD";
const X = "https://x.com/midoge_mu";
const LONG = "https://long.xyz";
const CA = "";

const STOPS = [
  {
    id: "lot",
    mag: "1×",
    title: "The lot",
    line: "Spotted in the parking lot. The chip next to him is the size chart.",
    src: "/art/lot.jpg",
    alt: "A tiny shiba sitting on asphalt in front of a computer store, next to a small chip",
  },
  {
    id: "finger",
    mag: "100×",
    title: "The finger",
    line: "Fits on one ridge of a fingerprint. Still looking at the camera.",
    src: "/art/finger.jpg",
    alt: "A tiny shiba sitting on the tip of a finger",
  },
  {
    id: "die",
    mag: "10,000×",
    title: "The die",
    line: "Lives on the silicon. This is the whole bit.",
    src: "/art/die.jpg",
    alt: "A microscope callout of a tiny shiba on a memory chip",
  },
] as const;

function CaBox() {
  const [copied, setCopied] = useState(false);
  const live = CA.length > 0;

  async function copy() {
    if (!live) return;
    await navigator.clipboard.writeText(CA);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="mt-8 max-w-md rounded-card border border-line bg-card p-4">
      <p className="text-xs tracking-widest text-cyan">CONTRACT</p>
      <p className="mt-2 break-all font-display text-xl font-bold text-ink">
        {live ? CA : "Waiting on the LONG mint"}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">No invented address. This box fills when the mint lands.</p>
        <button
          type="button"
          onClick={copy}
          disabled={!live}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink disabled:opacity-40"
        >
          <Copy className="size-4" aria-hidden="true" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function Home() {
  const [stop, setStop] = useState(1);
  const [scratches, setScratches] = useState(0);
  const [shake, setShake] = useState(false);
  const scene = STOPS[stop];

  useEffect(() => {
    const saved = Number(localStorage.getItem("midoge-scratches") ?? "0");
    if (Number.isFinite(saved)) setScratches(saved);
  }, []);

  function pet() {
    const next = scratches + 1;
    setScratches(next);
    localStorage.setItem("midoge-scratches", String(next));
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  return (
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-5 sm:px-8">
      <SiteHeader />

      <section id="top" className="grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="font-display text-sm font-bold tracking-widest text-cyan">$MIDOGE</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold leading-none text-ink sm:text-7xl">
            The smallest doge in the aisle.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Memory ran the last five years. We answered with a doge small enough to sit on the die.
            A meme, paired with MU on LONG. Nothing else.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={X}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-5 py-3 font-medium text-bg"
            >
              Follow the doge
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={MU}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 py-3 text-ink hover:border-cyan"
            >
              MU contract
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <CaBox />
        </div>
        <figure className="relative">
          <img
            src="/art/finger.jpg"
            alt="Tiny shiba balanced on a fingertip"
            className={`aspect-square w-full rounded-card object-cover ${shake ? "pet" : ""}`}
          />
          <figcaption className="mt-3 flex items-center justify-between text-sm text-muted">
            <span>Actual size. Allegedly.</span>
            <button
              type="button"
              onClick={pet}
              className="min-h-11 rounded-full border border-line px-4 text-ink hover:border-amber"
            >
              Scratch ears · {scratches}
            </button>
          </figcaption>
        </figure>
      </section>

      <section className="overflow-hidden rounded-card border border-line">
        <img
          src="/art/banner.jpg"
          alt="Micro Doge lying on a processor beside a metal MIDOGE wordmark"
          className="block h-auto w-full"
        />
      </section>

      <section className="mt-16" aria-labelledby="scope-title">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm tracking-widest text-cyan">INSPECTION</p>
            <h2 id="scope-title" className="font-display mt-2 text-3xl font-extrabold sm:text-4xl">
              Turn the knob.
            </h2>
          </div>
          <p className="font-display text-3xl font-extrabold text-amber">{scene.mag}</p>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-card border border-line bg-card">
          <img src={scene.src} alt={scene.alt} className="aspect-video w-full object-cover" />
          <div
            className="scan-line pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan/0 via-cyan/30 to-cyan/0"
            style={{ animation: "midoge-scan 3.6s linear infinite" }}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-bg/80 px-4 py-3 backdrop-blur-sm">
            <p className="font-display text-lg font-bold">{scene.title}</p>
            <p className="text-sm text-muted">{scene.line}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setStop((n) => Math.max(0, n - 1))}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink"
          >
            <Minus className="size-4" />
          </button>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={stop}
            aria-label="Magnification"
            onChange={(e) => setStop(Number(e.target.value))}
            className="h-2 w-full accent-amber"
          />
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setStop((n) => Math.min(2, n + 1))}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="mt-2 flex justify-between text-xs tracking-wide text-muted">
          {STOPS.map((s, i) => (
            <button key={s.id} type="button" onClick={() => setStop(i)} className={i === stop ? "text-amber" : ""}>
              {s.title}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          ["Much small", "He does not move the market. He sits on it."],
          ["Very MU", "The pair is Micron's LONG share. The doge is the joke on top."],
          ["So die", "If you can see him without a knob, he is still too big."],
        ].map(([title, body]) => (
          <article key={title} className="rounded-card border border-line bg-card p-5">
            <h3 className="font-display text-xl font-bold text-amber">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{body}</p>
          </article>
        ))}
      </section>

      <footer className="mt-16 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        <p>
          Micro Doge is a meme. Not financial advice. Not affiliated with Micron, Micro Center, Kalshi,
          Dogecoin, Robinhood, or LONG. The MU link is the pair contract, not a MIDOGE address.
        </p>
        <p className="mt-2">
          <a href={X} className="text-ink underline decoration-line underline-offset-4" target="_blank" rel="noreferrer">
            x.com/midoge_mu
          </a>
          {" · "}
          <a href={LONG} className="text-ink underline decoration-line underline-offset-4" target="_blank" rel="noreferrer">
            long.xyz
          </a>
        </p>
      </footer>
    </main>
  );
}
