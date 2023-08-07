"use client";

import { appRouter } from "@/configs";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Button, Input } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export interface ISearchButtonProps {}

export function SearchButton(props: ISearchButtonProps) {
  const t = useTranslations("Index");

  //Router
  const router = useRouter();

  // Search bar
  const [open, setOpen] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (value: string) => {
    if (value) {
      router.push(
        `${appRouter.result}?${new URLSearchParams({
          search_query: value,
        }).toString()}`
      );
      handleClose();
    }
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
            className="fixed z-50 flex items-center top-0 inset-x-0 h-12 bg-neutral700 md:block md:absolute md:right-0 md:left-auto md:w-[329px] md:rounded md:border md:border-[rgba(255,255,255,0.12)] md:border-solid"
            ref={searchBarRef}
          >
            <div className="flex items-center w-full h-full">
              <Input.Search
                className="relative w-full pl-12 pr-12"
                placeholder="Search"
                onSearch={handleSearch}
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
