import React from 'react';

type ExternalLinkProps = {
  href: string;
  children: React.ReactChildren | React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink = ({ href, children, ...rest }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

export default ExternalLink;
