import { twMerge } from "tailwind-merge";
import { CardProps } from "./types";

const CardHeader = (props: CardProps) => {
  return (
    <h3 className="text-sm sm:text-md font-base leading-6 text-slate-100">
      {props.children}
    </h3>
  );
};

const CardBody = (props: CardProps) => {
  return <div>{props.children}</div>;
};
const Card = (props: CardProps) => {
  const size = props.size ? props.size : "normal";
  const mode = props.mode ? props.mode : "normal";
  const className = twMerge(
    mode == "passive" && "bg-slate-700",
    mode == "semi" && "bg-slate-800",
    mode == "normal" && "bg-slate-900",
    "text-slate-100 rounded",
    size == "normal" && "px-2 py-1 sm:px-3 sm:py-2",
    size == "small" && "px-1 py-1",
    size == "xsmall" && "px-0 py-0",
    props.className
  );
  return <div className={className}>{props.children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
export default Card;
