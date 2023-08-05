"use client";

import { HeaderMenu } from "@/components/HeaderMenu";
import { SearchButton } from "@/components/SearchButton";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import * as React from "react";
export interface IHeaderProps {}

export function AppHeader(props: IHeaderProps) {
  return (
    <Header className="header text-white font-medium fixed top-0 inset-x-0 w-full h-14 bg-[linear-gradient(180deg,#0E1012_0%,rgba(14,16,18,0.00)_100%)] md:h-20">
      <div className="w-[89%] h-full flex justify-between mx-auto">
        <div className="header__left flex items-center">
          <Image
            className="header__logo mr-6"
            width={73}
            height={40}
            src="/icons/logo.svg"
            alt="footer-logo"
          />
          <HeaderMenu />
        </div>
        <div className="header__right flex items-center">
          <SearchButton />
          <div className="header__user w-12 h-12 rounded-full border-[2px] border-secondary bg-center bg-no-repeat bg-cover ml-2 md:ml-4"></div>
        </div>
      </div>
    </Header>
  );
}
