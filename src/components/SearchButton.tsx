"use client";

import { useTranslations } from "next-intl";
import * as React from "react";

export interface ISearchButtonProps {}

export function SearchButton(props: ISearchButtonProps) {
  const t = useTranslations("Index");

  return (
    <button className="search-button h-12 px-4 flex items-center">
      <div
        className="w-6 h-6 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('/icons/search.svg')` }}
      ></div>
      <div className="ml-2">{t("search")}</div>
    </button>
  );
}
