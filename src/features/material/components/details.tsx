import { Material } from "../lib/types";
import MaterialRow from "./materialRow";

const MaterialDetails = (props: {
  materials: Material[];
  multiplier?: number;
  roundNumber?: "default" | "formatted" | "rounded" | "precision";
  className?: string;
}) => {
  return (
    <div className={props.className}>
      {props.materials.map((mat) => (
        <MaterialRow
          key={mat.Type}
          material={mat}
          multiplier={props.multiplier}
          roundNumber={props.roundNumber}
        />
      ))}
    </div>
  );
};
export default MaterialDetails;
