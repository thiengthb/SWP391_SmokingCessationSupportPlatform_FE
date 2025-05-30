import { CigaretteOff } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-4">
      <span className="hidden xl:block font-bold text-lg">Smoking Cessation</span>
      <CigaretteOff />
    </Link>
  );
};

export default Logo;
