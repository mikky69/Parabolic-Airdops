import type { AirdropStep } from "@/types/database.types";

export function StepGuide({ steps }: { steps: AirdropStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-white">
        How to Participate
      </h2>
      <ol className="mt-5 space-y-5">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-brand-magenta/30 bg-brand-magenta/10 font-mono text-sm text-violet-300">
              {index + 1}
            </span>
            <div className="pt-0.5">
              <h3 className="font-medium text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
