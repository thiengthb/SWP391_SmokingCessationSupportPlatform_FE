import { CigaretteOff } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-4">
      <CigaretteOff />
      <span className="hidden xl:block font-bold text-lg">Smoking Cessation</span>
    </Link>
  );
};

export default Logo;
