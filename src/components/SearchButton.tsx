"use client";

import { useTranslations } from "next-intl";
import * as React from "react";

export interface ISearchButtonProps {}

export function SearchButton(props: ISearchButtonProps) {
  const t = useTranslations("Index");

  return (
    <button className="search-button h-12 px-2 flex items-center md:px-4">
      <div
        className="w-8 h-8 bg-center bg-no-repeat bg-cover md:w-6 md:h-6"
        style={{ backgroundImage: `url('/icons/search.svg')` }}
      ></div>
      <div className="hidden ml-2 md:block">{t("search")}</div>
    </button>
  );
}
