import { I18nNamespace } from "@/constants/I18nNamespace";
import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const { t: tCommon } = useTranslation(I18nNamespace.COMMON);
  const { t: tNavbar } = useTranslation(I18nNamespace.NAVBAR);
  const { t: tFooter } = useTranslation(I18nNamespace.FOOTER);
  const { t: tFtnd } = useTranslation(I18nNamespace.FTND);
  const { t: tData } = useTranslation(I18nNamespace.DATA);
  const { t: tContext } = useTranslation(I18nNamespace.CONTEXT);
  const { t: tAboutus } = useTranslation(I18nNamespace.ABOUTUS);
  const { t: tAuth } = useTranslation(I18nNamespace.AUTH);
  const { t: tLandingpage } = useTranslation(I18nNamespace.LANDINGPAGE);
  const { t: tCommunity } = useTranslation(I18nNamespace.COMMUNITY);
  const { t: tPrivacy } = useTranslation(I18nNamespace.PRIVACY);
  const { t: tTerms } = useTranslation(I18nNamespace.TERMS);
  const { t: tFaq } = useTranslation(I18nNamespace.FAQ);
  const { t: tPricing } = useTranslation(I18nNamespace.PRICING);
  const { t: tContact } = useTranslation(I18nNamespace.CONTACT);
  const { t: tTestimonials } = useTranslation(I18nNamespace.TESTIMONIALS);
  const { t: tMember } = useTranslation(I18nNamespace.MEMBER);
  const { t: tAdmin } = useTranslation(I18nNamespace.ADMIN);
  const { t: tCoach } = useTranslation(I18nNamespace.COACH);
  return {
    tCommon,
    tNavbar,
    tFooter,
    tFtnd,
    tData,
    tContext,
    tAboutus,
    tAuth,
    tLandingpage,
    tCommunity,
    tPrivacy,
    tTerms,
    tFaq,
    tPricing,
    tContact,
    tTestimonials,
    tMember,
    tAdmin,
    tCoach,
  };
};
