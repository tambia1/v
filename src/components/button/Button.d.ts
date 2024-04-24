import React from "react";
export type IVariant = "full" | "stroke" | "link";
interface Props extends React.ComponentPropsWithoutRef<"button"> {
    varian: IVariant;
}
export declare const Button: ({ children, varian, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
