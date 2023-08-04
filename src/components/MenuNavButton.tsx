import * as React from "react";

export interface IMenuNavButtonProps {}

export function MenuNavButton(props: IMenuNavButtonProps) {
  return (
    <button
      className="w-10 h-10 bg-center bg-no-repeat bg-cover ml-2"
      style={{ backgroundImage: `url('/icons/menu.svg')` }}
    ></button>
  );
}
