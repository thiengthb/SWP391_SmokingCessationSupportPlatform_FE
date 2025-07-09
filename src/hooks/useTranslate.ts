import { I18nNamespace } from "@/constants/I18nNamespace";
import { useTranslation } from "react-i18next";


export const useTranslate = () => {
    const { t: tCommon } = useTranslation(I18nNamespace.COMMON);
    const { t: tNavbar } = useTranslation(I18nNamespace.NAVBAR);

    return {
        tCommon,
        tNavbar,
    }
}