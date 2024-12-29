import classNames from 'classnames';
import React from 'react';

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: H1Props) {
  return (
    <h1 className={classNames('font-medium text-2xl leading-6', className)}>
      {children}
    </h1>
  );
}
