export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <span className="font-(--font-mono) text-xs tracking-widest text-(--color-muted) uppercase">
          00:00 · FUNDAÇÃO
        </span>
        <h1 className="font-(--font-display) text-4xl sm:text-6xl font-extrabold tracking-tight text-(--color-cream)">
          Produção Audiovisual que dá{" "}
          <span className="text-(--color-amber)">resultado</span>, não vaidade.
        </h1>
        <p className="max-w-[62ch] text-base text-(--color-cream-dim)">
          Evis Produtora — Belém/PA para todo o Brasil.
        </p>
      </div>
    </main>
  );
}
