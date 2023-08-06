"use client";

import { lato } from "@/fonts";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <div className={"login-page fixed inset-0 " + lato.className}>
      <div className="w-11/12 max-w-[374px] mx-auto mt-[15vh] flex flex-col items-center">
        <Image
          className="header__logo mr-6 w-[159px] h-[86px]"
          width={159}
          height={86}
          src="/icons/logo.svg"
          alt="footer-logo"
        />
        <div className="text-2xl font-bold">{t("Account.title")}</div>
      </div>
    </div>
  );
}
