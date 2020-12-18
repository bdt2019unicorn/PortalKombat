import React from 'react';
import ExternalLink from 'components/externalLink/ExternalLink';

export default {
  ERROR: 'Error',
  IN_THE_MEAN_TIME: 'In the mean time, you can...',
  LOGIN_OR_SIGN_UP: 'Login or sign up',
  SORRY: 'Sorry, something has gone wrong',
  UNFORTUNATELY_THERE_IS_AN_ISSUE:
    'Unfortunately there is an issue, please try again at a later time.',
  thereIsAnIssue: (contactPhone: string) => (
    <span>
      Unfortunately there is an issue, please try again at a later time. <br />
      If you need to speak to someone, give us a call on{' '}
      <strong>{contactPhone}</strong> - we’re happy to help.
    </span>
  ),
  checkOutOurWebsite: (url: string) => (
    <span>
      Check out our website for{' '}
      <ExternalLink href={url}>more information.</ExternalLink>
    </span>
  ),
};
