import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/memes")({ component: Memes });

const MEMES = [
  {
    src: "/memes/key.jpg",
    title: "The M key",
    line: "He took the M key. M for memory. He will not give it back.",
  },
  {
    src: "/memes/coin.jpg",
    title: "Under a quarter",
    line: "Smaller than a quarter. That is the whole size chart.",
  },
  {
    src: "/memes/train.jpg",
    title: "The platform",
    line: "If you see him on the yellow line, do not step. He is the position.",
  },
  {
    src: "/memes/cup.jpg",
    title: "Morning cup",
    line: "One sip and you lose him. He lives on the rim.",
  },
  {
    src: "/memes/pad.jpg",
    title: "Trackpad",
    line: "Do not click. He is not a cursor.",
  },
  {
    src: "/memes/pizza.jpg",
    title: "Last slice",
    line: "He claimed the tip. The rest of the pie can wait.",
  },
  {
    src: "/memes/stick.jpg",
    title: "On the stick",
    line: "Memory got a passenger. He does not need a heatsink.",
  },
] as const;

function post(line: string) {
  const text = `${line} $MIDOGE`;
  const href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://midoge.vercel.app/memes")}`;
  window.open(href, "_blank", "noopener,noreferrer");
}

function Memes() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-20 pt-5 sm:px-8">
      <SiteHeader />
      <section className="py-10">
        <p className="text-sm tracking-widest text-cyan">MEMES</p>
        <h1 className="font-display mt-2 text-4xl font-extrabold sm:text-6xl">Take him with you.</h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
          Seven places. Same dog. Save the picture or post it. He stays fingertip-small in all of them.
        </p>
      </section>
      <ul className="grid gap-6 sm:grid-cols-2">
        {MEMES.map((meme) => (
          <li key={meme.src} className="overflow-hidden rounded-card border border-line bg-card">
            <img src={meme.src} alt={meme.title} className="aspect-square w-full object-cover" />
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <h2 className="font-display text-xl font-bold">{meme.title}</h2>
                <p className="mt-1 text-sm text-muted">{meme.line}</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={meme.src}
                  download
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-ink"
                >
                  Save
                </a>
                <button
                  type="button"
                  onClick={() => post(meme.line)}
                  className="inline-flex min-h-11 items-center rounded-full bg-amber px-4 text-sm font-medium text-bg"
                >
                  Post
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
