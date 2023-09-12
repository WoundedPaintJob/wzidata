import { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren {
  size?: "normal" | "small";
  mode?: "normal" | "passive" | "semi";
}
