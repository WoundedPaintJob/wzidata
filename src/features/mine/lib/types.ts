import { materialSchema } from "@features/material/lib/types";
import { AssetState, assetWithLevelSchema } from "@lib/types/assets";
import { z } from "zod";

export const mineSchema = assetWithLevelSchema.extend({
  Materials: z.array(materialSchema),
});
export type Mine = z.infer<typeof mineSchema>;
export interface MineState extends AssetState, Mine {
	SuperCharged: boolean;
}
