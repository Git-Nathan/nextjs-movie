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
      <div className="w-11/12 flex flex-col items-center">
        <Image width={92} height={56} src="/icons/logo.svg" alt="footer-logo" />
        <div className="flex flex-wrap">
          <div className="text-xs leading-[18px]">{t("policy")}</div>
        </div>
      </div>
    </Footer>
  );
}
