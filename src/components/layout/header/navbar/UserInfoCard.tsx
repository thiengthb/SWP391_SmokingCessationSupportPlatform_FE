import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/models/account";
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
          <Badge>
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
