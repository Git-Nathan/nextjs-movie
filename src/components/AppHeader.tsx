"use client";

import { HeaderMenu } from "@/components/HeaderMenu";
import { SearchButton } from "@/components/SearchButton";
import { appPath } from "@/constants";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HeaderAccount } from "./HeaderAccount";

export interface IHeaderProps {}

export function AppHeader(props: IHeaderProps) {
  const { data: session } = useSession({
    required: true,
  });

  console.log(session);

  return (
    <Header className="header text-white font-medium fixed top-0 inset-x-0 w-full h-14 bg-[linear-gradient(180deg,#0E1012_0%,rgba(14,16,18,0.00)_100%)] md:h-20">
      <div className="w-[89%] h-full flex justify-between mx-auto">
        <div className="header__left flex items-center">
          <Link href={appPath.home}>
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
