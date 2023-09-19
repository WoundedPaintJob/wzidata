import { Settings } from "src/settings";
import { Material } from "../lib/types";

const MaterialImage = (props: { material: Material }) => {
  return (
    <img
      src={`${Settings.ResourceUrl}${props.material.Image}`}
      alt={props.material.Name}
      title={props.material.Name}
      className="mr-0 ml-0 w-3 h-3 sm:h-4 sm:w-4 md:mr-2"
    />
  );
};
export default MaterialImage;
