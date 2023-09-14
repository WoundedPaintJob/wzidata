import Section from "@components/atoms/section";
import Button from "@components/atoms/button";
import useLevelStore from "@lib/stores/levelStore";
import { InstructionType } from "../lib/enums";
import { ConquerZoneInstructionState } from "../lib/instructions/conquerZone";
import { ConquerBonusInstructionState } from "../lib/instructions/conquerBonus";
import Item from "./item";
import Card from "@components/atoms/card";
import { useState } from "react";
import { TextInstructionState } from "../lib/instructions/text";
import { instructionArraySchema } from "../lib/instructions/instruction";

const Guide = () => {
  const activeZone = useLevelStore((state) => state.ActiveZone);
  const activeBonus = useLevelStore((state) => state.ActiveBonus);
  const activePath = useLevelStore((state) => state.ActivePath);
  const instructions = useLevelStore((state) => state.Instructions);
  const addInstruction = useLevelStore((state) => state.AddInstruction);
  const activeInstruction = useLevelStore((state) => state.ActiveInstruction);
  const setInstructions = useLevelStore((state) => state.SetInstructions);
  const instructionArr = Array.from(instructions.values());
  const [message, setMessage] = useState('');
  const addCurrent = () => {
    let maxId = 0;
    if (instructions.size > 0)
      maxId = Math.max(...instructions.keys());
    if (activePath) {
      const newItem: ConquerZoneInstructionState = {
        Id: maxId + 1,
        Description: `Path to ${activePath.Zones[activePath.Zones.length - 1].Name}`,
        Type: InstructionType.ConquerZone,
        Done: false,
        ZoneIds: activePath.Zones.map((z) => z.Id),
      };
      addInstruction(newItem);
    } else if (activeZone) {
      const newItem: ConquerZoneInstructionState = {
        Id: maxId + 1,
        Description: `Conquer Zone ${activeZone.Name}`,
        Type: InstructionType.ConquerZone,
        Done: false,
        ZoneIds: [activeZone.Id],
      };
      addInstruction(newItem);
    } else if (activeBonus) {
      const newItem: ConquerBonusInstructionState = {
        Id: maxId + 1,
        Description: `Conquer Bonus ${activeBonus.Name}`,
        Type: InstructionType.ConquerBonus,
        Done: false,
        BonusId: activeBonus.Id
      }
      addInstruction(newItem);
    }
  };
  const addText = () => {
    let maxId = 0;
    if (instructions.size > 0)
      maxId = Math.max(...instructions.keys());
    const newItem: TextInstructionState = {
      Id: maxId + 1,
      Description: message,
      Type: InstructionType.Text,
      Done: false,
      ZoneId: activeZone ? activeZone.Id : null,
      BonusId: activeBonus ? activeBonus.Id : null,
    }
    addInstruction(newItem);
  }
  const textAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newInstructions = instructionArraySchema.safeParse(JSON.parse(e.target.value));
      if (newInstructions.success)
        setInstructions(newInstructions.data);
      else {
        console.error(newInstructions.error);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Section>
      <Section.CardList>
        <Card>
          {instructionArr.map((item) => <Item item={item} key={item.Id} isActive={item.Id == activeInstruction?.Id} />)}
        </Card>
        <Card>
          <textarea value={instructions ? JSON.stringify(instructionArr) : ''} onChange={textAreaChange} className="bg-background w-full" />
          <div className="flex mt-12 space-x-1">
            <Button onClick={() => addCurrent()}>Add current</Button>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button onClick={() => addText()}>Add Text</Button>
          </div>
        </Card>
      </Section.CardList>
    </Section>
  );
};
export default Guide;
