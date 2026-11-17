import { Chip } from "@/components/ui/Chip";

type Props = { variants: string[]; selected: number; onSelect: (i: number) => void };

export function VariantSelector({ variants, selected, onSelect }: Props) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold">Choose option</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v, i) => (
          <Chip key={v} selected={i === selected} onClick={() => onSelect(i)}>
            {v}
          </Chip>
        ))}
      </div>
    </div>
  );
}