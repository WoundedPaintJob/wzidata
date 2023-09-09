import { Settings } from "src/settings";
import { Material } from "../lib/types";

const MaterialImage = (props: { material: Material }) => {
  return (
    <img
      src={`${Settings.ResourceUrl}${props.material.Image}`}
      alt={props.material.Name}
      title={props.material.Name}
      className="mr-2 w-4"
    />
  );
};
export default MaterialImage;
