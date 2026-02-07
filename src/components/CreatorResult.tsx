import { cn } from "@/lib/utils";

interface CreatorResultProps {
  creatorName: string;
  tier: string;
}

const tierConfig: Record<string, { class: string; bgClass: string; label: string }> = {
  titan: { class: "tier-titan", bgClass: "tier-bg-titan", label: "TITAN" },
  commander: { class: "tier-commander", bgClass: "tier-bg-commander", label: "COMMANDER" },
  warrior: { class: "tier-warrior", bgClass: "tier-bg-warrior", label: "WARRIOR" },
  degen: { class: "tier-degen", bgClass: "tier-bg-degen", label: "DEGEN" },
};

const CreatorResult = ({ creatorName, tier }: CreatorResultProps) => {
  const normalizedTier = tier.toLowerCase().trim();
  const config = tierConfig[normalizedTier] || tierConfig.degen;

  return (
    <div className="animate-fade-in-up">
      <div className="silver-border silver-glow rounded-xl bg-card p-8 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Creator Found
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
          {creatorName}
        </h2>

        <div className={cn("inline-block rounded-lg border px-6 py-3", config.bgClass)}>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Your Tier
          </p>
          <p className={cn("font-display text-2xl font-bold tracking-wide md:text-3xl", config.class)}>
            {config.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorResult;
