"use client";

import * as React from "react";
import { Menu, type MenuProps } from "antd";
import { useTranslations } from "next-intl";

export function HeaderMenu() {
  const t = useTranslations("Menu");

  // Menu
  const [current, setCurrent] = React.useState("home");

  const items: MenuProps["items"] = [
    {
      label: t("home"),
      key: "home",
      icon: (
        <>
          <div
            className="icon w-6 h-6 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('/icons/home.svg')` }}
          ></div>
          <div
            className="active-icon w-6 h-6 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('/icons/home-active.svg')` }}
          ></div>
        </>
      ),
    },
    {
      label: t("series"),
      key: "series",
      icon: (
        <>
          <div
            className="icon w-6 h-6 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('/icons/tv.svg')` }}
          ></div>
          <div
            className="active-icon w-6 h-6 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('/icons/tv-active.svg')` }}
          ></div>
        </>
      ),
    },
    {
      label: t("films"),
      key: "films",
      icon: (
        <>
          <div
            className="icon w-6 h-6 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('/icons/movie.svg')` }}
          ></div>
          <div
            className="active-icon w-6 h-6 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('/icons/movie-active.svg')` }}
          ></div>
        </>
      ),
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="hidden md:block">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        disabledOverflow
      />
    </div>
  );
}
