import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import SortableItem from "./sortableItem";
import { SortableItemType } from "../lib/types";
import Item from "./item";

const Guide = () => {
  const [items, setItems] = useState<SortableItemType[]>([
    {
      id: 1,
      text: "Ett",
    },
    { id: 2, text: "Två" },
    { id: 3, text: "Tre" },
  ]);
  const [activeItem, setActiveItem] = useState<SortableItemType>();
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.log(`DS-A ${active.id}`);
    setActiveItem(items.find((item) => item.id === active.id));
  };
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(`DE-A ${active.id}`);
    console.log(`DE-O ${over.id}`);
    if (!over) return;
    const activeItem = items.find((item) => item.id === active.id);
    const overItem = items.find((item) => item.id === over.id);
    if (!activeItem || !overItem) {
      return;
    }
    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setItems((prev) =>
        arrayMove<SortableItemType>(prev, activeIndex, overIndex)
      );
    }
    setActiveItem(undefined);
  }
  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  const handleButtonClick = () => {
    const itemIds = items.map((item) => item.id);
    alert(itemIds);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id.id} item={id} />
        ))}
      </SortableContext>
      {/* <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
				{activeItem ? <Item item={activeItem} isDragging /> : null}
			</DragOverlay> */}
    </DndContext>
  );
};
export default Guide;
