import { RewardType } from "@features/reward/lib/enums";

export type RewardLinkProps = {
  onClick?: () => void;
  type: RewardType;
}