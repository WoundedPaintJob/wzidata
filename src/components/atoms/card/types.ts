import { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren {
  size?: "normal" | "small" | "xsmall";
  mode?: "normal" | "passive" | "semi";
  className?: string;
}
