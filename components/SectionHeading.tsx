 export function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-5 text-center sm:mb-8">
      <h2 id={id} className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-1 max-w-xl text-sm text-muted sm:mt-2 sm:text-base">{subtitle}</p>}
      <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-linear-to-r from-[#d99a2b] to-[#c2386a] sm:mt-4 sm:w-16" />
    </div>
  );
}