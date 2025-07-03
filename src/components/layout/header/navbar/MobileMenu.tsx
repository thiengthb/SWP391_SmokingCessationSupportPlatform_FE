import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mainNav } from "./navbar.item";
import ThemeSwitch from "@/components/theme/theme-switch";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { NavigationNotifications } from "./NavigationNotifications";

const MobileMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth, handleLogout } = useAuth();

  const filteredItems = mainNav.filter((item) => {
    if (auth.currentAcc?.havingSubscription && item.id === "pricing") {
      return false;
    }

    return true;
  });

  const submitLogout = async () => {
    if (!auth.isAuthenticated) return;
    await handleLogout();
    navigate("/auth/login");
  };

  return (
    <Sheet>
      <div className="md:hidden">
        <DropdownMenu>
          <NavigationNotifications />
        </DropdownMenu>
      </div>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t(`nav.menu.toggleMenu`)}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>{t(`nav.menu.title`)}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-2 p-4">
          <Link
            to={
              auth.currentAcc?.role
                ? `/${auth.currentAcc?.role.toLowerCase()}/dashboard`
                : `/dashboard`
            }
            className="block text-base transition-colors hover:text-primary"
          >
            {t(`nav.dashboard.title`)}
          </Link>
          {filteredItems.map((item) => (
            <div key={item.href} className="space-y-3">
              {item.items ? (
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between text-base">
                    {t(item.title)}
                    <ChevronsUpDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-2 space-y-2 border-l">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-primary"
                      >
                        {t(subItem.title)}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  to={item.href}
                  className="block text-base transition-colors hover:text-primary"
                >
                  {t(item.title)}
                </Link>
              )}
            </div>
          ))}
          {!auth.isAuthenticated ? (
            <div className="flex justify-between items-center">
              <p>{t(`theme.title`)}</p>
              <ThemeSwitch />
            </div>
          ) : null}
          <SheetFooter>
            {auth.isAuthenticated ? (
              <SheetClose asChild>
                <Button variant="secondary" onClick={submitLogout}>
                  {t("buttons.logout")}
                </Button>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Button asChild>
                    <Link to="/auth/register">{t(`buttons.signup`)}</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="secondary" asChild>
                    <Link to="/auth/login">{t(`buttons.login`)}</Link>
                  </Button>
                </SheetClose>
              </>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
