export interface IHeaderAccount {}
import { workSans } from "@/fonts";
import { Button, Popover, Skeleton } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function HeaderAccount(props: IHeaderAccount) {
  const { data: session, status } = useSession();
  const t = useTranslations("Popover");

  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  if (status === "loading")
    return (
      <div className="w-12 h-12 flex items-center justify-center">
        <Skeleton.Avatar size={"large"} active />
      </div>
    );

  if (session)
    return (
      <Popover
        content={
          <div
            className={
              "w-[248px] text-white text-base px-5 py-2 flex flex-col " +
              workSans.className
            }
          >
            <div className="py-3">{t("edit-profile")}</div>
            <div className="py-3">{t("favorite")}</div>
            <div className="py-3">{t("my-subscription")}</div>
            <div className="py-3">{t("My account")}</div>
            <div className="py-3">{t("Help")}</div>
            <Button
              className="py-3 text-left border-none text-white mx-0 p-0 text-base h-auto"
              onClick={() => signOut()}
            >
              {t("Sign off")}
            </Button>
          </div>
        }
        trigger="click"
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        open={openPopover}
        onOpenChange={handleOpenChange}
      >
        <Button
          className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full border-[2px] border-secondary border-solid"
          style={{ backgroundImage: `url('${session?.user.image}')` }}
        ></Button>
      </Popover>
    );

  return (
    <Button
      className="header__user p-0 w-12 h-12 rounded-full border-[2px] border-secondary bg-center bg-no-repeat bg-cover flex items-center justify-center"
      onClick={() => signIn()}
    >
      <div
        className="w-7 h-7 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('/icons/user.svg')` }}
      ></div>
    </Button>
  );
}
