import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableItemProps } from "../lib/types";
import Item from "./item";
const SortableItem = ({ item, ...props }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
  });
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };
  return (
    <Item
      ref={setNodeRef}
      style={styles}
      item={item}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};
export default SortableItem;
