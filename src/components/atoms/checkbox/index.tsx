import { Switch } from "@headlessui/react";
import { CheckBoxProps } from "./types";
import { twMerge } from "tailwind-merge";

const CheckBox = (props: CheckBoxProps) => {
  return (
    <Switch
      checked={props.checked}
      onChange={props.onClick}
      className={twMerge("group relative inline-flex h-3 w-6 mt-1 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2", props.className)}
    >
      <span
        aria-hidden="true"
        className={twMerge(
          props.checked ? "bg-secondary" : "bg-gray-200",
          "pointer-events-none absolute mx-auto h-2 w-5 rounded-full transition-colors duration-200 ease-in-out", props.className
        )}
      />
      <span
        aria-hidden="true"
        className={twMerge(
          props.checked ? "translate-x-3" : "translate-x-0",
          "pointer-events-none absolute left-0 inline-block h-3 w-3 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out", props.className
        )}
      />
    </Switch>
  );
};
export default CheckBox;
