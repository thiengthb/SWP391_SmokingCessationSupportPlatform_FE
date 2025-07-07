import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-[calc(100vh-10rem)] 2xl:h-[calc(100vh-30rem)] w-full flex flex-col items-center px-2 sm:px-0 justify-center gap-6">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
          Sorry, we couldn't find the page you're looking for. The page might
          have been removed or the link might be broken.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
