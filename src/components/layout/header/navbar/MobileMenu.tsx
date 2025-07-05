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
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  ChevronsUpDown,
  Gauge,
  Palette,
  UserRound,
  Globe,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { forRoles, mainNav } from "./navbar.item";
import ThemeSwitch from "@/components/theme/theme-switch";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { NavigationNotifications } from "./NavigationNotifications";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UserInfoCard from "./UserInfoCard";
import { toForRoles } from "@/utils/TabUtil";

const MobileMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth, handleLogout } = useAuth();

  const filteredItems = mainNav.filter(
    (item) =>
      item.displayMobile &&
      (item.forRoles.includes(toForRoles(auth.currentAcc?.role)) ||
        item.forRoles.includes(forRoles.ALL))
  );

  const submitLogout = async () => {
    if (!auth.isAuthenticated) return;
    await handleLogout();
    navigate("/auth/login");
  };

  return (
    <Sheet>
      <div className="md:hidden mr-2">
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
          {auth.currentAcc ? (
            <div className="flex items-center gap-2">
              <div className=" rounded-full h-8 w-8 overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={auth.currentAcc?.avatar ?? ""}
                    alt={auth.currentAcc?.username ?? t("roles.user")}
                  />
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
              </div>
              <UserInfoCard />
            </div>
          ) : (
            "Menu"
          )}
        </SheetHeader>
        <div className="flex flex-col space-y-2 px-4">
          {auth.isAuthenticated && (
            <Link
              to={
                auth.currentAcc?.role
                  ? `/${auth.currentAcc?.role.toLowerCase()}/dashboard`
                  : `/dashboard`
              }
              className="flex items-center gap-2 text-base transition-colors hover:text-primary"
            >
              <Gauge className="h-4 w-4" />
              {t(`nav.dashboard.title`)}
            </Link>
          )}
          {filteredItems.map((item) => (
            <div key={item.href} className="space-y-3">
              {item.items ? (
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between text-base">
                    <div className="flex items-center">
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {t(item.title)}
                    </div>
                    <ChevronsUpDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-2 space-y-2 border-l">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary"
                      >
                        {subItem.icon && (
                          <subItem.icon className="mr-2 h-4 w-4" />
                        )}
                        {t(subItem.title)}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center text-base transition-colors hover:text-primary"
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {t(item.title)}
                </Link>
              )}
            </div>
          ))}

          <Separator className="my-4 border-t-1" />

          {!auth.isAuthenticated && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <p>{t(`theme.title`)}</p>
                </div>
                <ThemeSwitch />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <p>{t(`language.title`)}</p>
                </div>
                <LanguageSelector variant="compact" showLabel={false} />
              </div>
            </div>
          )}

          <SheetFooter>
            {auth.isAuthenticated ? (
              <SheetClose asChild>
                <Button variant="destructive" onClick={submitLogout}>
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
