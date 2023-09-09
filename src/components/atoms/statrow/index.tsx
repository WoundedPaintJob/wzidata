import Text from '../text';
const StatRowName = (props: { name: string; isLink?: boolean }) => {
  return (
    <Text
      size="small"
      mode={`${props.isLink ? 'link' : 'passive'}`}
      container="span"
    >
      {props.name}
    </Text>
  );
};
const StatRowValue = (props: { value?: string }) => {
  if (props.value) {
    return (
      <Text size="small" container="span">
        {props.value}
      </Text>
    );
  }
  return <></>;
};
const StatRowPercentage = (props: { percentage?: string }) => {
  if (props.percentage) {
    return (
      <Text size="xsmall" mode="passive" container="span">
        ({props.percentage})
      </Text>
    );
  }
  return <></>;
};
export interface StatRowProps {
  name: string;
  value?: string;
  percentage?: string;
  onClick?: () => void;
}

const StatRow = (props: StatRowProps) => {
  return (
    <div onClick={props.onClick}>
      <StatRowName name={props.name} isLink={props.onClick != null} />
      <StatRowValue value={props.value} />
      <StatRowPercentage percentage={props.percentage} />
    </div>
  );
};
export default StatRow;
