import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCheatsheets, loadCheatsheet, formatExample } from "@/lib/cheatsheets";

type Params = Promise<{ product: string; name: string }>;

export async function generateStaticParams() {
  return getAllCheatsheets().map((ref) => ({
    product: ref.product,
    name: ref.name,
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { product, name } = await params;
  const ref = getAllCheatsheets().find((r) => r.product === product && r.name === name);
  if (!ref) return { title: "Not Found" };

  return {
    title: `${ref.data.title} | ChSON`,
    description: ref.data.description,
  };
}

export default async function CheatsheetPage({ params }: { params: Params }) {
  const { product, name } = await params;
  const ref = getAllCheatsheets().find((r) => r.product === product && r.name === name);

  if (!ref) {
    notFound();
  }

  const data = loadCheatsheet(ref.filePath);
  const title = data.title || "Cheatsheet";

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[clamp(28px,4.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600">
            {data.version && (
              <span>
                Version: <strong className="font-semibold text-zinc-900">{data.version}</strong>
              </span>
            )}
            {data.publicationDate && (
              <span>
                Published:{" "}
                <strong className="font-semibold text-zinc-900">{data.publicationDate}</strong>
              </span>
            )}
            <span className="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 font-mono text-[11px] text-zinc-700">
              {ref.product}/{ref.name}
            </span>
          </div>
          <p className="mt-4 max-w-[80ch] text-zinc-600">{data.description}</p>
        </div>
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center justify-center rounded-xl border border-black/15 bg-white/60 px-3 py-2 text-sm font-medium shadow-soft hover:border-black/20 hover:no-underline"
            href="/cheatsheets"
          >
            All cheatsheets
          </Link>
          <a
            className="inline-flex items-center justify-center rounded-xl border border-black/15 bg-blue-700/10 px-3 py-2 text-sm font-medium hover:bg-blue-700/15 hover:no-underline"
            href={`https://github.com/carlesandres/csif.sh/blob/main/packages/chson-registry/cheatsheets/${ref.product}/${ref.name}.chson.json`}
          >
            View source
          </a>
        </div>
      </div>

      {Array.isArray(data.sections) && data.sections.length > 0 ? (
        <div className="mt-6 grid gap-5">
          {data.sections.map((section, sectionIdx) => (
            <section
              key={sectionIdx}
              className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-soft"
            >
              <h2 className="text-base font-semibold">{section.title}</h2>
              {section.description && (
                <p className="mt-1 text-sm text-zinc-600">{section.description}</p>
              )}
              <div className="mt-3 overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b border-black/10 bg-black/[0.03] px-3 py-2 text-left text-xs font-semibold text-zinc-600">
                        Example
                      </th>
                      <th className="border-b border-black/10 bg-black/[0.03] px-3 py-2 text-left text-xs font-semibold text-zinc-600">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(section.items) &&
                      section.items.map((item, itemIdx) => (
                        <tr key={itemIdx}>
                          <td className="border-b border-black/5 px-3 py-3 align-top">
                            {formatExample(item.example ?? item.title) && (
                              <pre className="m-0 overflow-auto rounded-xl border border-black/10 bg-black/[0.04] p-3">
                                <code className="font-mono text-[13px]">
                                  {formatExample(item.example ?? item.title)}
                                </code>
                              </pre>
                            )}
                          </td>
                          <td className="border-b border-black/5 px-3 py-3 align-top">
                            <div className="font-semibold">{item.title}</div>
                            <div className="mt-1 text-sm text-zinc-600">{item.description}</div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p>No sections found.</p>
      )}
    </>
  );
}
