import { useIsMobile } from "@/hooks/useMobile";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const isMobile = useIsMobile();
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`flex items-center px-8 py-6 ${isMobile ? "justify-between" : "justify-around"}`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div
          aria-hidden="true"
          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-lg font-bold">🍳</span>
        </div>
        <h1
          className={`text-white leading-tight tracking-tighter ${isMobile ? "text-xl" : "text-2xl"}`}
        >
          Taylor's Recipee
        </h1>
      </div>

      {/* Navigation Links */}
      {/* For Future If Requried */}

      {/* User Actions */}
      <div className="flex items-center space-x-3">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
