import { cn } from "../lib/utils";

export default function SectionTitle({ title, subtitle, className, align = "center" }) {
  return (
    <div className={cn("mb-12 space-y-4", align === "center" ? "text-center" : "text-left", className)}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
