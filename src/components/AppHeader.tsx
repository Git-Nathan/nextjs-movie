"use client";

import { HeaderMenu } from "@/components/HeaderMenu";
import { SearchButton } from "@/components/SearchButton";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { HeaderAccount } from "./HeaderAccount";
import { appRouter } from "@/configs";

export interface IHeaderProps {}

export function AppHeader(props: IHeaderProps) {
  return (
    <Header className="header z-50 text-white font-medium fixed top-0 inset-x-0 w-full h-14 bg-[linear-gradient(180deg,#0E1012_0%,rgba(14,16,18,0.00)_100%)] md:h-20">
      <div className="w-[89%] h-full flex justify-between mx-auto">
        <div className="header__left flex items-center">
          <Link href={appRouter.home}>
            <Image
              className="header__logo mr-6 w-[73px] h-[40px]"
              width={73}
              height={40}
              src="/icons/logo.svg"
              alt="footer-logo"
            />
          </Link>
          <HeaderMenu />
        </div>
        <div className="header__right flex items-center">
          <SearchButton />
          <HeaderAccount />
        </div>
      </div>
    </Header>
  );
}
