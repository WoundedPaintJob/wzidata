import { PropsWithChildren } from 'react';

export interface CardProps extends PropsWithChildren {
  size?: 'normal' | 'small';
  passive?: boolean;
}
