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
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Creator Status
          </p>
          <h1 className="text-gradient-silver mb-3 font-display text-3xl font-bold leading-tight md:text-4xl">
            Check Your Creator Arc Rank
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your registered email to discover your tier.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Search Card */}
          {!result && !notFound && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              className="silver-border silver-glow rounded-xl bg-card p-6 md:p-8"
            >
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

              <AnimatePresence>
                {loading && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingSpinner />
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <p className="mt-4 text-center text-sm text-destructive">{error}</p>
              )}
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4"
            >
              <CreatorResult creatorName={result.creator_name} tier={result.tier} />
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={handleTryAgain}
                  className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Check another email
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Not Found */}
          {notFound && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <NotFoundMessage onTryAgain={handleTryAgain} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
};

export default Index;
