import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreatorResult from "@/components/CreatorResult";
import LoadingSpinner from "@/components/LoadingSpinner";
import NotFoundMessage from "@/components/NotFoundMessage";
import { Search } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";

interface CreatorData {
  creator_name: string;
  tier: string;
}

const Index = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreatorData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("check-rank", {
        body: { email: email.trim().toLowerCase() },
      });

      if (fnError) throw fnError;

      if (data?.found) {
        setResult({
          creator_name: data.creator_name,
          tier: data.tier,
        });
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error("Error checking rank:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setEmail("");
    setResult(null);
    setNotFound(false);
    setError(null);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <AnimatedBackground />
      <div className="w-full max-w-md">
        {/* Hero */}
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Creator Status
          </p>
          <h1 className="text-gradient-silver mb-3 font-display text-3xl font-bold leading-tight md:text-4xl">
            Check Your Creator Arc Rank
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your registered email to discover your tier.
          </p>
        </div>

        {/* Search Card */}
        {!result && !notFound && (
          <div className="silver-border silver-glow rounded-xl bg-card p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-12 border-border bg-secondary text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
              <Button
                type="submit"
                disabled={loading || !email.trim()}
                className="h-12 w-full font-display text-sm font-semibold uppercase tracking-[0.1em]"
              >
                <Search className="mr-2 h-4 w-4" />
                Check My Rank
              </Button>
            </form>

            {loading && (
              <div className="mt-6">
                <LoadingSpinner />
              </div>
            )}

            {error && (
              <p className="mt-4 text-center text-sm text-destructive">{error}</p>
            )}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            <CreatorResult creatorName={result.creator_name} tier={result.tier} />
            <div className="text-center">
              <button
                onClick={handleTryAgain}
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Check another email
              </button>
            </div>
          </div>
        )}

        {/* Not Found */}
        {notFound && <NotFoundMessage onTryAgain={handleTryAgain} />}
      </div>
      <Footer />
    </main>
  );
};

export default Index;
