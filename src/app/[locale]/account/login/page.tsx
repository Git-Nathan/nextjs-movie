"use client";

import { lato } from "@/fonts";
import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface ILoginPage {
  searchParams: {
    callbackUrl: string;
  };
}

export default function LoginPage({ searchParams }: ILoginPage) {
  const t = useTranslations();

  //Form
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={"login-page fixed inset-0 " + lato.className}>
      <div className="w-11/12 max-w-[374px] mx-auto mt-[15vh] flex flex-col items-center">
        <Image
          className="login__logo w-[159px] h-[86px]"
          priority
          width={159}
          height={86}
          src="/icons/logo.svg"
          alt="footer-logo"
        />
        <div className="w-full">
          <div className="text-lg font-bold mt-4">{t("Account.title")}</div>
        </div>
        <Form
          className="w-full mt-4"
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className={
                "h-12 px-4 w-full rounded bg-[#31343E] border-none text-white text-base placeholder:text-mediumEmphasis " +
                lato.className
              }
              placeholder={t("Index.email")}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className={
                "mt-8 w-full h-12 rounded bg-primary300 border-none text-white text-base uppercase font-bold " +
                lato.className
              }
              htmlType="submit"
            >
              {t("Index.continue")}
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-6 w-full">
          <span className="text-[rgba(255,255,255,0.60)]">
            {t("Account.first-time")}
          </span>
          <span className="font-medium ml-1">{t("Account.subscribe")}</span>
        </div>
        <div className="mt-8">{t("Account.or-login-with")}</div>
        <div className="other-method mt-8 flex items-center justify-center w-full">
          <Button
            className="flex items-center static justify-center !w-14 h-14 right-4 p-0 border-none rounded-full hover:bg-slate-700"
            icon={
              <div
                className="w-8 h-8 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url('/icons/google.svg')` }}
              ></div>
            }
            onClick={() =>
              signIn("google", { callbackUrl: searchParams.callbackUrl })
            }
          />
          <Button
            className="flex items-center static justify-center !w-14 h-14 right-4 p-0 border-none rounded-full hover:bg-slate-700 ml-8"
            icon={
              <div
                className="w-10 h-10 bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url('/icons/facebook.svg')` }}
              ></div>
            }
            onClick={() =>
              signIn("facebook", { callbackUrl: searchParams.callbackUrl })
            }
          />
        </div>
      </div>
    </div>
  );
}
