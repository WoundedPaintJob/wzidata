import { LevelControlProps } from "./types";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

const LevelControl = (props: LevelControlProps) => {
  return (
    <div className="mr-1 sm:mr-2">
      {props.CanLevelUp ? (
        <ArrowUpIcon
          onClick={props.LevelUp}
          className="h-6 w-6 sm:h-5 sm:w-5 text-slate-100"
        />
      ) : (
        <ArrowUpIcon className="h-6 w-6 sm:h-5 sm:w-5 text-slate-500" />
      )}
      {props.CanLevelDown ? (
        <ArrowDownIcon
          onClick={props.LevelDown}
          className="h-6 w-6 sm:h-5 sm:w-5 text-slate-100"
        />
      ) : (
        <ArrowDownIcon className="h-6 w-6 sm:h-5 sm:w-5 text-slate-500" />
      )}
    </div>
  );
};
export default LevelControl;
