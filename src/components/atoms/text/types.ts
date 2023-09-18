import { PropsWithChildren } from 'react';
export interface TextProps extends PropsWithChildren {
  size?: 'body' | 'header' | 'small' | 'xsmall';
  mode?: 'default' | 'inactive' | 'link' | 'passive';
  container?: 'p' | 'div';
  className?: string;
  onClick?: () => void;
}
