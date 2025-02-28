"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="p-4">
      <ul className="flex space-x-2 text-lg">
        <li>
          <Link href="/">Home</Link>
        </li>
        {segments.map((segment, index) => (
          <Fragment key={index}>
            <li>/</li>
            {index === segments.length - 1 ? (
              <li className="font-bold capitalize">{segment}</li>
            ) : (
              <li className="capitalize">
                <Link href={`/${segment}`}>{segment}</Link>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
