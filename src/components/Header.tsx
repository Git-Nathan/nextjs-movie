import * as React from "react";

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  return <div className="fixed top-0 inset-x-0 w-full h-20">Header</div>;
}
