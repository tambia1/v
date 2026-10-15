import React from "react";
//#region src/components/button/Button.d.ts
type Variant = "full" | "stroke" | "link";
type Props = React.ComponentPropsWithoutRef<"button"> & {
  varian: Variant;
};
export declare const Button: ({ children, varian, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
//#endregion
export {};