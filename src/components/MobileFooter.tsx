"use client";

import { Menu, MenuProps } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import * as React from "react";

export function MobileFooter() {
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
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Footer className="mobile-footer fixed bottom-0 inset-x-0 p-0 md:hidden">
      <Menu
        className="mobile__nav-menu"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        disabledOverflow
      />
    </Footer>
  );
}
