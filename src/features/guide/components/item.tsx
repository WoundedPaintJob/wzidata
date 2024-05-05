import useLevelStore from "@lib/stores/levelStore";
import { InstructionState } from "../lib/instructions/instruction";
import CheckBox from "@components/atoms/checkbox";
import Text from "@components/atoms/text";
const Item = (props: { item: InstructionState; isActive: boolean }) => {
  const setActiveInstruction = useLevelStore(
    (state) => state.SetActiveInstruction
  );
  const toggleInstruction = useLevelStore((state) => state.CompleteInstruction);
  const currentInstruction = useLevelStore((state) =>
    state.Instructions.get(props.item.Id)
  );
  if (!currentInstruction) return <></>;
  return (
    <div className="flex">
      <CheckBox
        checked={currentInstruction.Done || false}
        onClick={() => toggleInstruction(currentInstruction)}
      />
      <Text onClick={() => setActiveInstruction(currentInstruction)}>
        {currentInstruction.Id}: {currentInstruction.Description}
      </Text>
    </div>
  );
};
export default Item;
