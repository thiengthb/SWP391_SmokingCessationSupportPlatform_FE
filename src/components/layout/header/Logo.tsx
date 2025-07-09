import { useTranslate } from "@/hooks/useTranslate";
import { CigaretteOff } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  const { tNavbar } = useTranslate();
  return (
    <Link to="/" className="flex items-center gap-4">
      <span className="hidden xl:block font-bold text-lg">
        {tNavbar("navbar.logo.title")}
      </span>
      <CigaretteOff />
    </Link>
  );
};

export default Logo;
