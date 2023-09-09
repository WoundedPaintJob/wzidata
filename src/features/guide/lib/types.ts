import { HTMLAttributes } from "react";

export type SortableItemType = {
	id: number;
	text: string;
};

export type SortableItemProps = {
	item: SortableItemType;
} & HTMLAttributes<HTMLDivElement>;
