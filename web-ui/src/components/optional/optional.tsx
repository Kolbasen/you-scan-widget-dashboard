import type { ReactNode } from 'react';

type Props = {
  show: boolean;
  children: ReactNode;
};

export const Optional = ({ show, children }: Props) => {
  return show ? <>{children}</> : null;
};
