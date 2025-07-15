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
import { ForDisplay, mainNav, routeRoleDashboard } from "./navbar.item";
import ThemeSwitch from "@/components/theme/theme-switch";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { NavigationNotifications } from "./NavigationNotifications";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useTranslate } from "@/hooks/useTranslate";
import UserInfoCard from "./UserInfoCard";
import { ForRoles, toForRoles } from "@/utils/tab.util";
import { Paths } from "@/constants/path";
import { Badge } from "@/components/ui/badge";

const MobileMenu = () => {
  const navigate = useNavigate();
  const { auth, handleLogout } = useAuth();

  const { tCommon, tNavbar } = useTranslate();

  const filteredItems = mainNav.filter((item) => {
    if (
      !auth.isAuthenticated &&
      (item.id === "profile" || item.id === "settings")
    ) {
      return false;
    }

    if (auth.currentAcc?.havingSubscription && item.id === "pricing") {
      return false;
    }

    return true;
  });

  const submitLogout = async () => {
    if (!auth.isAuthenticated) return;
    await handleLogout();
    navigate(Paths.AUTH.LOGIN);
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
          <span className="sr-only">{tNavbar(`nav.menu.toggleMenu`)}</span>
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
                    alt={auth.currentAcc?.username ?? tNavbar("roles.user")}
                  />
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">
                    {auth.currentAcc.username || tNavbar("roles.guest")}
                  </p>
                  <Badge>
                    {auth.currentAcc.havingSubscription ? "Premium" : "Free"}
                  </Badge>
                </div>
                <p className="text-xs leading-none text-muted-foreground">
                  {auth.currentAcc?.email}
                </p>
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
              to={routeRoleDashboard(auth.currentAcc?.role)}
              className="flex items-center gap-2 text-base transition-colors hover:text-primary"
            >
              <Gauge className="h-4 w-4" />
              {tNavbar(`nav.dashboard.title`)}
            </Link>
          )}
          {filteredItems.map((item) => (
            <div key={item.href} className="space-y-3">
              {item.items ? (
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between text-base">
                    <div className="flex items-center">
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {tNavbar(item.title)}
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
                        {tNavbar(subItem.title)}
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
                  {tNavbar(item.title)}
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
                  <p>{tNavbar(`theme.title`)}</p>
                </div>
                <ThemeSwitch />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <p>{tNavbar(`language.title`)}</p>
                </div>
                <LanguageSelector variant="compact" showLabel={false} />
              </div>
            </div>
          )}

          <SheetFooter>
            {auth.isAuthenticated ? (
              <SheetClose asChild>
                <Button variant="destructive" onClick={submitLogout}>
                  {tCommon("buttons.logout")}
                </Button>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Button asChild>
                    <Link to={Paths.AUTH.REGISTER}>{tCommon(`buttons.signup`)}</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="secondary" asChild>
                    <Link to={Paths.AUTH.LOGIN}>{tCommon(`buttons.login`)}</Link>
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
