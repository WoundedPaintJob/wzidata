import Card from "@components/atoms/card";
import { InstructionState } from "../lib/instructions/instruction";

const InstructionDetail = (props: InstructionState) => {
  return <Card>{props.description}</Card>
}
export default InstructionDetail;