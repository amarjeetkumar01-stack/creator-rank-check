import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
          Powered by{" "}
          <span className="text-gradient-silver font-display font-semibold">
            Creator Arc
          </span>
        </span>

        <a
          href="https://x.com/creatorarcc"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 fill-current"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          @creatorarcc
          <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
