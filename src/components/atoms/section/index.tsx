import { PropsWithChildren } from "react";

const SectionHeader = (props: PropsWithChildren) => {
  return (
    <div className="mb-2 text-slate-200 font-semibold">{props.children}</div>
  );
};
const SectionBody = (props: PropsWithChildren) => {
  return <div className="text-main">{props.children}</div>;
};
const SectionCardList = (props: PropsWithChildren) => {
  return <div className="flex flex-wrap gap-2">{props.children}</div>;
};
const Section = (props: PropsWithChildren) => {
  return (
    <div className="m-2 rounded bg-slate-600 px-2 py-2 lg:px-6 lg:py-6">
      {props.children}
    </div>
  );
};
Section.Header = SectionHeader;
Section.Body = SectionBody;
Section.CardList = SectionCardList;
export default Section;
