import { PropsWithChildren } from 'react';

const SectionHeader = (props: PropsWithChildren) => {
  return (
    <div className="mb-8 text-base font-semibold leading-6 text-main">
      {props.children}
    </div>
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
    <div className="m-2 rounded bg-background px-4 py-4 sm:px-6">
      {props.children}
    </div>
  );
};
Section.Header = SectionHeader;
Section.Body = SectionBody;
Section.CardList = SectionCardList;
export default Section;
