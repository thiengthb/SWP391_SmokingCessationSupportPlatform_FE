import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { NavigationItems } from "./NavigationItems";
import AppearanceSetting from "./AppearenceSetting";
import Logo from "../Logo";
import { UserNav } from "./UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 xl:px-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center justify-between md:gap-2 xl:gap-4 2xl:gap-8">
          <nav className="hidden md:flex">
            <NavigationItems />
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {auth.currentAcc ? (
              <>
                <UserNav />
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="hidden lg:inline-flex"
                >
                  <Link to="/auth/login">{t(`buttons.login`)}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth/register">{t(`buttons.signup`)}</Link>
                </Button>
                <div className="hidden lg:flex">
                  <AppearanceSetting />
                </div>
              </>
            )}
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
