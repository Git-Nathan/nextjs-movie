"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");

  return <main className="pt-44">{t("title")}</main>;
}
