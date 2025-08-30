import { useIsMobile } from "@/hooks/useMobile";

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer
      role="contentinfo" // landmark role for footers
      className={`flex justify-center items-center gradient-hero text-[var(--footerr)] w-full ${
        isMobile ? "h-15 text-[8px]" : "h-30 text-lg"
      }`}
    >
      <blockquote className="italic text-center">
        "A recipe has no soul. You, as the cook, must bring soul to the recipe."
      </blockquote>
      <cite className="ml-2 not-italic">- Thomas Keller</cite>
    </footer>
  );
}
