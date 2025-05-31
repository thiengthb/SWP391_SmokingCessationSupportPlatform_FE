import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ScrollBack = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    const backToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", scrollFunction);
    const button = document.getElementById("btn-back-to-top");
    button?.addEventListener("click", backToTop);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
      button?.removeEventListener("click", backToTop);
    };
  }, []);

  return (
    <Button
      id="btn-back-to-top"
      size="icon"
      className={cn(
        "fixed bottom-8 right-4 z-50 rounded-full opacity-0 transition-all duration-300",
        show && "opacity-100"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 lg:h-10 lg:w-10"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
};

export default ScrollBack;
