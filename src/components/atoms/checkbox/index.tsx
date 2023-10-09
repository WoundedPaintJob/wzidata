import { CheckBoxProps } from "./types";

const CheckBox = (props: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      className="w-6 h-6 sm:w-4 sm:h-4"
      defaultChecked={props.checked}
      onChange={props.onClick}
    ></input>
  );
};
export default CheckBox;
