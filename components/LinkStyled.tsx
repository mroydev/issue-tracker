import { Link as RadixLink } from '@radix-ui/themes';
import Link from 'next/link';

import React from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
}

const LinkStyled = ({ href, children }: Props) => {
  return (
    <Link href={href} legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </Link>
  );
};

export default LinkStyled;
