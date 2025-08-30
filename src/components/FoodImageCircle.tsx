import { ChefHat, UtensilsCrossed } from "lucide-react";
import chefCookingImg from "@/assets/chef-cooking.jpg";
import pastaDishImg from "@/assets/pasta-dish.jpg";
import freshIngredientsImg from "@/assets/fresh-ingredients.jpg";
import cookingPastaImg from "@/assets/cooking-pasta.jpg";

const FoodImageCircles = () => {
  return (
    <div
      aria-label="Food and cooking images"
      role="region"
      className="w-full max-w-2xl flex flex-col items-center justify-center p-6 space-y-4 rounded-3xl
                lg:relative lg:grid lg:grid-rows-3 lg:grid-cols-3 lg:gap-x-2 lg:gap-y-0 lg:w-120 lg:p-6 lg:m-0
                 xl:top-4 "
    >
      {/* Large center circle - chef cooking */}
      <div className="h-24 w-full lg:col-span-2 rounded-full bg-gray-600">
        <img
          src={freshIngredientsImg}
          alt="Professional chef cooking with flames"
          className="h-24 w-full lg:col-span-2 rounded-full bg-gray-600 object-cover shadow-glow"
        />
      </div>
      {/* Top left - chef tools icon */}
      <div
        aria-hidden="true"
        className=" bg-[var(--chef-dark)] h-24 w-full flex justify-center items-center lg:w-24 rounded-full shadow-elegant"
      >
        <UtensilsCrossed className="h-12 w-12 lg:w-24 rounded-full text-white" />
      </div>
      {/* Bottom left - chef hat icon */}
      <div
        aria-hidden="true"
        className=" bg-[var(--chef-accent)] h-24 w-full rounded-full shadow-elegant"
      >
        <img
          src={cookingPastaImg}
          alt="Hands preparing pasta"
          className="h-24 w-full rounded-full  object-cover shadow-elegant"
        />
      </div>

      {/* Bottom left - chef hat icon */}
      <div className=" bg-[var(--chef-accent)] h-24 flex justify-center items-center w-full rounded-full shadow-elegant">
        <ChefHat className="h-14 w-14 rounded-full " />
      </div>

      {/* Top right - pasta dish */}
      <div className="row-span-3 h-full w-24 rounded-2xl bg-gray-600">
        <img
          src={chefCookingImg}
          alt="Delicious pasta dish"
          className="row-span-3 h-full w-24 rounded-2xl bg-gray-600 object-cover shadow-elegant"
        />
      </div>

      {/* Middle left - fresh ingredients */}
      <div className="w-full h-24 lg:col-span-2 rounded-2xl bg-gray-600">
        <img
          src={pastaDishImg}
          alt="Fresh vegetables and ingredients"
          className="w-full h-24  lg:col-span-2 rounded-2xl bg-gray-600 object-cover shadow-elegant"
        />
      </div>
    </div>
  );
};

export default FoodImageCircles;
