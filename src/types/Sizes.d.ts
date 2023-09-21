const Sizes = ["xs", "s", "m", "l", "xl"] as const;

export type Size = (typeof Sizes)[number];
