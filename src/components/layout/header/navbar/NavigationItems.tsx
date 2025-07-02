import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { mainNav } from "./navbar.item";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

const ListItem = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        to={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
);

export function NavigationItems() {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const filteredItems = mainNav.filter((item) => {
    if (item.displayMobile) return false;

    if (
      auth.isAuthenticated &&
      (item.id === "about" || item.id === "contact")
    ) {
      return false;
    }

    if (auth.currentUser?.havingSubscription && item.id === "pricing") {
      return false;
    }

    return true;
  });

  return (
    <div className="relative">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {filteredItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              {item.items ? (
                <>
                  <NavigationMenuTrigger>{t(item.title)}</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-0 left-0 z-[999]">
                    <ul className="grid w-[180px] p-2 md:w-[220px] md:grid-cols-1">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={subItem.href}
                          title={t(subItem.title)}
                          href={subItem.href}
                        >
                          {t(subItem.description ? subItem.description : "")}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to={item.href}>{t(item.title)}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
