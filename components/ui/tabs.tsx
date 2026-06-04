import { cn } from "@/lib/utils";

type TabsProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  className?: string;
};

export function FilterTabs<T extends string>({ tabs, active, onChange, className }: TabsProps<T>) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto rounded-md border border-border bg-white p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={active === tab}
          onClick={() => onChange(tab)}
          className={cn(
            "min-h-10 shrink-0 rounded px-4 text-sm font-semibold text-muted-foreground transition",
            "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active === tab && "bg-foreground text-background shadow-sm hover:bg-foreground hover:text-background",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
