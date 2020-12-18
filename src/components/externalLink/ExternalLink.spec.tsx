import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ExternalLink from './ExternalLink';

const children = <>A link to somewhere</>;

describe('ExternalLink', () => {
  it('renders without crashing', () => {
    render(<ExternalLink href="#">{children}</ExternalLink>);
  });

  it('captures clicks', () => {
    const { baseElement } = render(
      <ExternalLink href="#">{children}</ExternalLink>,
    );

    fireEvent.click(baseElement);
  });
});
