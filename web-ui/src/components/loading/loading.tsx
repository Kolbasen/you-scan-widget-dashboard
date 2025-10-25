import type { ReactNode } from 'react';
import { Spinner } from '../ui/spinner';

type Props = {
  isLoading?: boolean;
  children?: ReactNode;
};

export const Loading = ({ isLoading, children }: Props) => {
  return (
    isLoading ? <Spinner /> : <>{children}</>
  );
};
