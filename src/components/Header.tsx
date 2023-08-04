import * as React from "react";
import { SearchButton } from "./SearchButton";
import { MenuNavButton } from "./MenuNavButton";
import { HeaderMenu } from "./HeaderMenu";

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  return (
    <div className="header fixed top-0 inset-x-0 w-full h-14 bg-[linear-gradient(180deg,#0E1012_0%,rgba(14,16,18,0.00)_100%)] md:h-20">
      <div className="w-[89%] h-full flex justify-between mx-auto">
        <div className="header__left flex items-center">
          <div
            className="header__logo w-[73.44px] h-[39.84px] bg-center bg-no-repeat bg-cover mr-6"
            style={{ backgroundImage: `url('/icons/logo.svg')` }}
          ></div>
          <HeaderMenu />
        </div>
        <div className="header__right flex items-center">
          <SearchButton />
          <MenuNavButton />
        </div>
      </div>
    </div>
  );
}
