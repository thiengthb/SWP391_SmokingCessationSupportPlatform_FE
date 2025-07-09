import { I18nNamespace } from "@/constants/I18nNamespace";
import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const { t: tCommon } = useTranslation(I18nNamespace.COMMON);
  const { t: tNavbar } = useTranslation(I18nNamespace.NAVBAR);
  const { t: tFooter } = useTranslation(I18nNamespace.FOOTER);
  const { t: tFtnd } = useTranslation(I18nNamespace.FTND);
  const { t: tData } = useTranslation(I18nNamespace.DATA);
  const { t: tContext } = useTranslation(I18nNamespace.CONTEXT);
  return {
    tCommon,
    tNavbar,
    tFooter,
    tFtnd,
    tData,
    tContext,
    
  };
};
