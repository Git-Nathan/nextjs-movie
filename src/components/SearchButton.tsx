"use client";

import { lato } from "@/fonts";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

export interface ISearchButtonProps {}

export function SearchButton(props: ISearchButtonProps) {
  const t = useTranslations("Index");

  // Open search bar
  const [open, setOpen] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useClickOutside(searchBarRef, handleClose);

  return (
    <div className="relative mr-2 md:mr-4">
      <Button
        className="search-button border-none rounded-full text-white h-12 px-2 flex items-center md:px-4 hover:text-white"
        onClick={handleOpen}
      >
        <div
          className="w-8 h-8 bg-center bg-no-repeat bg-cover md:w-6 md:h-6"
          style={{ backgroundImage: `url('/icons/search.svg')` }}
        ></div>
        <div className="hidden ml-2 md:block text-base font-medium">
          {t("search")}
        </div>
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 bg-[#0000002c] md:hidden"></div>
          <div
            className="fixed flex items-center top-0 inset-x-0 h-12 bg-neutral700 md:block md:absolute md:right-0 md:left-auto md:w-[329px] md:rounded md:border md:border-[rgba(255,255,255,0.12)] md:border-solid"
            ref={searchBarRef}
          >
            <div className="flex items-center w-full h-full">
              <input
                className={
                  "relative h-full w-full rounded bg-neutral700 outline-none border-none text-base text-white font-normal pl-14 pr-14 shadow-none " +
                  lato.className
                }
                placeholder="Search"
              />
              <div
                className="absolute w-6 h-6 left-4"
                style={{ backgroundImage: `url('/icons/search.svg')` }}
              ></div>
              <Button
                className="absolute flex items-center justify-center w-8 h-8 right-4 p-0 border-none rounded-full hover:bg-slate-700"
                icon={
                  <div
                    className="w-6 h-6 bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url('/icons/close.svg')` }}
                  ></div>
                }
                onClick={handleClose}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
