"use client";

import { lato } from "@/fonts";
import { Footer } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as React from "react";

export interface IFooterProps {}

export function AppFooter(props: IFooterProps) {
  const t = useTranslations("Footer");

  return (
    <Footer
      className={
        "app-footer px-0 py-2 text-white flex justify-center " + lato.className
      }
    >
      <div className="w-11/12 flex flex-col items-center pt-7 pb-7 md:pt-12">
        <Image
          className="w-[92px] h-[56px]"
          width={92}
          height={56}
          src="/icons/logo.svg"
          alt="footer-logo"
        />
        <div className="flex justify-center flex-wrap mt-8">
          <div className="text-xs leading-[18px] mx-2">{t("policy")}</div>
          <div className="text-xs leading-[18px] mx-2">{t("agreement")}</div>
          <div className="text-xs leading-[18px] mx-2">{t("guide")}</div>
          <div className="text-xs leading-[18px] mx-2">
            {t("supported-devices")}
          </div>
          <div className="text-xs leading-[18px] mx-2">{t("about")}</div>
          <div className="text-xs leading-[18px] mx-2">
            {t("publicidad-personalizada")}
          </div>
        </div>
        <div className="mt-9 text-xs text-center max-w-[456px]">
          {t("page-info")}
        </div>
        <div className="mt-10 text-xs text-center max-w-[456px]">
          {t("reserved")}
        </div>
      </div>
    </Footer>
  );
}
