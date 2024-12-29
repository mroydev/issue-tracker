'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = () => {
  const currentPath = usePathname();
  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <>
      {' '}
      <ul className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
        {navLinks.map((navLink) => (
          <li key={navLink.href}>
            <Link
              href={navLink.href}
              className={classNames('transition-colors duration-300', {
                'font-semibold text-zinc-900': currentPath === navLink.href,
                'text-zinc-500 hover:text-zinc-800':
                  currentPath !== navLink.href,
              })}
            >
              {navLink.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavLinks;
