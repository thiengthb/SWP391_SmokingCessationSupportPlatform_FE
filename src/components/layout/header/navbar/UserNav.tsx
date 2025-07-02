import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mainNav } from "./navbar.item";
import { NavigationNotifications } from "./NavigationNotifications";

export function UserNav() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth, handleLogout } = useAuth();

  const submitLogout = async () => {
    await handleLogout();
    navigate("/auth/login");
  };

  const filteredItems = mainNav.filter((item) => {
    if (
      auth.isAuthenticated &&
      (item.id === "about" || item.id === "contact")
    ) {
      return true;
    }

    if (!item.displayMobile) return false;

    if (auth.currentAcc?.havingSubscription && item.id === "pricing") {
      return false;
    }

    return true;
  });

  return (
    <div className="flex items-center space-x-4">
      <NavigationNotifications />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={auth.currentAcc?.avatar ?? ""}
                alt={auth.currentAcc?.username ?? t("roles.user")}
              />
              <AvatarFallback>
                <UserRound />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {auth.currentAcc?.username || t("roles.guest")}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {auth.currentAcc?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                to={`/${auth.currentAcc?.role?.toLowerCase()}/dashboard`}
                className="w-full"
              >
                {t(`nav.dashboard.title`)}
              </Link>
            </DropdownMenuItem>
            {filteredItems.map((item) => (
              <DropdownMenuItem key={item.href}>
                <Link to={item.href} className="w-full">
                  {t(item.title)}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={submitLogout}>
            {t(`buttons.logout`)}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
