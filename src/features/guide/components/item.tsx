import useLevelStore from "@lib/stores/levelStore";
import { InstructionState } from "../lib/instructions/instruction";
import CheckBox from "@components/atoms/checkbox";
const Item = (props: { item: InstructionState, isActive: boolean }) => {
  const setActiveInstruction = useLevelStore((state) => state.SetActiveInstruction);
  const toggleInstruction = useLevelStore((state) => state.CompleteInstruction);
  return (
    <div onClick={() => setActiveInstruction(props.item)} className="flex">
      <CheckBox checked={props.item.Done} onClick={() => toggleInstruction(props.item)} />
      {props.item.Id}: {props.item.Description}
    </div>
  );
}
export default Item;
