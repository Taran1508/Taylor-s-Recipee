import { useIsMobile } from "@/hooks/useMobile";
import Button from "./ui/button";

const HeroSection = () => {
  const isMobile = useIsMobile();
  return (
    <div aria-labelledby="hero-heading" className="flex-1 space-y-8">
      {/* Main Heading */}
      <div className="space-y-4">
        <h1
          id="hero-heading"
          className={`" font-bold text-white montserrat-bold leading-tight " ${isMobile ? "text-4xl " : "text-5xl"}`}
        >
          <span
            className={`" font-bold text-[#ccff00e5] cursive-text leading-tight" ${isMobile ? "text-5xl " : "text-7xl "}`}
          >
            Find Your
          </span>
          <br />
          Perfect Recipee
        </h1>
        <p
          className={`text-white/80  max-w-lg ${isMobile ? "text-md" : "text-lg"}`}
        >
          Start by sharing the ingredients you have at home, select your taste
          and dietary preferences, and we’ll guide you to discover delicious,
          personalized recipes you can cook with ease.
        </p>
      </div>

      {/* Navigate to Search Section */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
        <Button
          name={"Search Recipee"}
          className="px-8 py-4 h-auto hover:bg-chef-dark text-black rounded- font-semibold text-lg transition-smooth shadow-elegant"
        />
      </div>
    </div>
  );
};

export default HeroSection;
