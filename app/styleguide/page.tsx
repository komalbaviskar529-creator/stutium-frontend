import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <h1 className="text-3xl font-bold">Styleguide</h1>
      <p className="text-sm text-muted">Hover and Tab through the components to see hover and focus states.</p>

      <Section title="Button: variants and sizes">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Button: disabled">
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="ghost" disabled>Ghost</Button>
      </Section>

      <Section title="Input: default, error, disabled">
        <Input label="Email" placeholder="name@company.com" />
        <Input label="Email" defaultValue="anita@company" error="Enter a valid email address" />
        <Input label="Phone" placeholder="10-digit mobile" disabled />
      </Section>

      <Section title="Select: default, error, disabled">
        <Select label="Size" defaultValue="m">
          <option value="s">Small</option>
          <option value="m">Medium</option>
          <option value="l">Large</option>
        </Select>
        <Select label="City" error="Select a city" defaultValue="">
          <option value="" disabled>Choose city</option>
          <option>Pune</option>
        </Select>
        <Select label="Binding" disabled>
          <option>Spiral</option>
        </Select>
      </Section>

      <Section title="Badge">
        <Badge>Default</Badge>
        <Badge variant="brand">Delivery tomorrow</Badge>
        <Badge variant="success">In stock</Badge>
      </Section>

      <Section title="Chip: default, selected, disabled">
        <Chip>Small</Chip>
        <Chip selected>Medium</Chip>
        <Chip disabled>Large</Chip>
      </Section>

      <Section title="Card">
        <Card className="w-64 p-4">
          <h3 className="font-bold">Ceramic Mug</h3>
          <p className="text-sm text-muted">Card with padding and a border.</p>
        </Card>
      </Section>
    </div>
  );
}