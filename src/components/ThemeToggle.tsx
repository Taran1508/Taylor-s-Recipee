import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 bg-white/10 hover:bg-white/20 transition-smooth rounded-full flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="w-5 h-5 text-white absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
};

export default ThemeToggle;
