import { twMerge } from 'tailwind-merge';
import { TextProps } from './types';

const Text = (props: TextProps) => {
  const textType = props.size ? props.size : 'body';
  const container = props.container ? props.container : 'p';
  const textSize =
    textType == 'small'
      ? 'sm'
      : textType == 'header'
        ? 'lg'
        : textType == 'xsmall'
          ? 'xs'
          : 'md';
  const textMode = props.mode ? props.mode : 'default';
  const className = twMerge(
    props.className,
    textSize == 'md' && 'text-md',
    textSize == 'lg' && 'text-xl',
    textSize == 'sm' && 'text-sm',
    textSize == 'xs' && 'text-xs',
    textMode == 'default' && 'text-main',
    textMode == 'link' &&
    'text-main hover:cursor-pointer hover:underline text-sm',
    textMode == 'inactive' && 'text-subText',
    textMode == 'passive' && 'text-subText',
    'mr-1',
  );
  if (container == 'div') {
    return (
      <div onClick={props.onClick} className={className}>
        {props.children}
      </div>
    );
  }
  else {
    return (
      <p onClick={props.onClick} className={className}>
        {props.children}
      </p>
    );
  }
};
export default Text;
