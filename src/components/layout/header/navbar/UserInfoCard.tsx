import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/enums/Role";
import { useTranslation } from "react-i18next";

const UserInfoCard = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium leading-none">
          {auth.currentAcc?.username || t("roles.guest")}
        </p>
        {auth.currentAcc?.role === Role.MEMBER && (
          <Badge
            className={`${
              auth.currentAcc?.havingSubscription
                ? "bg-yellow-500 text-orange-900"
                : "bg-blue-500 text-white"
            }`}
          >
            {auth.currentAcc?.havingSubscription ? "Premium" : "Free"}
          </Badge>
        )}
      </div>
      <p className="text-xs leading-none text-muted-foreground">
        {auth.currentAcc?.email}
      </p>
    </div>
  );
};

export default UserInfoCard;
