export interface IHeaderAccount {}
import { appPath } from "@/constants";
import { Button, Popover, Spin } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function HeaderAccount(props: IHeaderAccount) {
  const { data: session, status } = useSession({
    required: true,
  });

  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  if (status === "loading")
    return (
      <div className="w-12 h-12 flex items-center justify-center">
        <Spin className="account-spin" />
      </div>
    );

  if (session?.user)
    return (
      <Popover
        content={
          <div>
            <p>Content</p>
            <p>Content</p>
          </div>
        }
        title="Title"
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
    <Link
      href={appPath.account.login}
      className="header__user w-12 h-12 rounded-full border-[2px] border-secondary bg-center bg-no-repeat bg-cover flex items-center justify-center"
    >
      <div
        className="w-7 h-7 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('/icons/user.svg')` }}
      ></div>
    </Link>
  );
}
