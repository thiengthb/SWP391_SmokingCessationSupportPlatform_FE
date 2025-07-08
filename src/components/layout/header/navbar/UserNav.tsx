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
import { Gauge, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ForDisplay, mainNav, routeRoleDashboard } from "./navbar.item";
import { NavigationNotifications } from "./NavigationNotifications";
import UserInfoCard from "./UserInfoCard";
import { ForRoles, toForRoles } from "@/utils/tab.util";
import { Paths } from "@/constants/path";

export function UserNav() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth, handleLogout } = useAuth();

  const submitLogout = async () => {
    await handleLogout();
    navigate(Paths.AUTH.LOGIN);
  };

  const filteredItems = mainNav
    .filter(
      (item) =>
        item.forDisplays?.includes(ForDisplay.ALL) ||
        item.forDisplays?.includes(ForDisplay.USER_NAV)
    )
    .filter(
      (item) =>
        item.forRoles?.includes(toForRoles(auth.currentAcc?.role)) ||
        item.forRoles?.includes(ForRoles.ALL)
    );

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
            <UserInfoCard />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                to={routeRoleDashboard(auth.currentAcc?.role)}
                className="w-full flex items-center gap-2"
              >
                <Gauge className="h-4 w-4" />
                {t(`nav.dashboard.title`)}
              </Link>
            </DropdownMenuItem>
            {filteredItems.map((item) => (
              <DropdownMenuItem key={item.href}>
                <Link to={item.href} className="w-full flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {t(item.title)}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={submitLogout}>
            <p className="pl-2">{t(`buttons.logout`)}</p>
          </DropdownMenuItem>
          {auth.currentAcc?.role !== "ADMIN" && (
            <DropdownMenuItem>
              <Link to="/feedback" className="w-full">
                Feedback
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
