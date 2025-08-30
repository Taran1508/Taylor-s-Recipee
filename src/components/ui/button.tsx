type ButtonProp = {
  name: string;
  className: string;
};

export default function Button({ name, className }: ButtonProp) {
  return (
    <a
      href="#searchb"
      role="button"
      className={`${className} inline-flex bg-[#ccff00e5] items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`}
      onKeyDown={(e) => {
        // allow Space button to activate link as button
        if (e.key === " ") {
          e.preventDefault();
          const el = e.currentTarget as HTMLAnchorElement;
          el.click();
        }
      }}
    >
      {name}
    </a>
  );
}
