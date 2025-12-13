import type React from "react";
export type Variant = "full" | "stroke" | "link";
type Props = React.ComponentPropsWithoutRef<"button"> & {
    varian: Variant;
};
export declare const Button: ({ children, varian, ...rest }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
