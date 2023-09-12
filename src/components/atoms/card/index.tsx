import { twMerge } from "tailwind-merge";
import { CardProps } from "./types";

const CardHeader = (props: CardProps) => {
  return (
    <h3 className="text-base font-semibold leading-6 text-main">
      {props.children}
    </h3>
  );
};

const CardSmallHeader = (props: CardProps) => {
  return (
    <p className="text-md truncate font-medium text-main">{props.children}</p>
  );
};

const CardBody = (props: CardProps) => {
  return <div>{props.children}</div>;
};
const Card = (props: CardProps) => {
  const size = props.size ? props.size : "normal";
  const mode = props.mode ? props.mode : "normal";
  const className = twMerge(
    mode == "passive" && "bg-cardBackgroundPassive",
    mode == "semi" && "bg-cardBackgroundSemiPassive",
    mode == "normal" && "bg-cardBackground",
    "text-main rounded",
    size == "normal" && "px-2 py-3  sm:px-4",
    size == "small" && "px-1 py-1"
  );
  return <div className={className}>{props.children}</div>;
};

Card.Header = CardHeader;
Card.SmallHeader = CardSmallHeader;
Card.Body = CardBody;
export default Card;
