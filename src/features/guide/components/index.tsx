import {
  closestCenter,
  DndContext,
  DragEndEvent,
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
import Section from "@components/atoms/section";
import Button from "@components/atoms/button";
import useLevelStore from "@lib/stores/levelStore";
import { InstructionState } from "../lib/instructions/instruction";
import { InstructionType } from "../lib/enums";
import { ConquerZoneInstructionState } from "../lib/instructions/conquerZone";

const Guide = () => {
  const activeZone = useLevelStore((state) => state.ActiveZone);
  const activeBonus = useLevelStore((state) => state.ActiveBonus);
  const activePath = useLevelStore((state) => state.ActivePath);
  const [items, setItems] = useState<InstructionState[]>([]);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
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
        arrayMove<InstructionState>(prev, activeIndex, overIndex)
      );
    }
  }
  const addCurrent = () => {
    let maxId = 0;
    if (items.length > 0)
      maxId = Math.max(...items.map((i) => i.id));
    if (activePath) {
      const newItem: ConquerZoneInstructionState = {
        id: maxId + 1,
        description: `Path to ${activePath.Zones[activePath.Zones.length - 1].Name}`,
        doPath: true,
        type: InstructionType.ConquerZone,
        done: false,
        zoneId: activePath.Zones[activePath.Zones.length - 1].Id
      };
      setItems([...items, newItem]);
    } else if (activeZone) {
      const newItem: ConquerZoneInstructionState = {
        id: maxId + 1,
        description: `Conquer Zone ${activePath.Zones[activePath.Zones.length - 1].Name}`,
        doPath: false,
        type: InstructionType.ConquerZone,
        done: false,
        zoneId: activePath.Zones[activePath.Zones.length - 1].Id
      };
      setItems([...items, newItem]);
    }
  };
  return (
    <Section>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id.id} item={id} />
          ))}
        </SortableContext>
      </DndContext>
      <Button onClick={() => addCurrent()}>Add current</Button>
    </Section>
  );
};
export default Guide;
