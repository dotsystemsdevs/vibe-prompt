import Image from "next/image";

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/dotsystemsdevs/VibePrompt/contributors",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json() as Promise<Contributor[]>;
  } catch {
    return [];
  }
}

export async function Contributors() {
  const contributors = await getContributors();
  if (contributors.length === 0) return null;

  return (
    <section className="border-t border-foreground/15 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-[10px] uppercase tracking-widest text-foreground/35">
          {contributors.length} contributor{contributors.length === 1 ? "" : "s"}
        </p>
        <div className="flex flex-wrap gap-2">
          {contributors.map((c) => (
            <a
              key={c.login}
              href={c.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${c.login} · ${c.contributions} commit${c.contributions === 1 ? "" : "s"}`}
              className="group"
            >
              <Image
                src={c.avatar_url}
                alt={c.login}
                width={36}
                height={36}
                className="rounded-full grayscale transition-all duration-200 group-hover:grayscale-0 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
