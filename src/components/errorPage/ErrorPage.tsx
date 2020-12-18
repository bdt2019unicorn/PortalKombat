import React from 'react';
import { FeaturedBackground, Main, Wrapper } from '@kiwiwealth/ui';
import strings from './en-NZ';

const ErrorPage = () => {
  return (
    <Wrapper width="wide">
      <Main removeMainGutters={false} hasVerticalSpacing>
        <FeaturedBackground
          image={null}
          headingLevel={2}
          heading={strings.SORRY}
          className="u-text-center u-margin-bottom"
        >
          <p className="text-intro content-width-small content-width--centered">
            {strings.thereIsAnIssue('0800 427 384')}
          </p>
        </FeaturedBackground>
        <div className="u-text-center">
          <h4>{strings.IN_THE_MEAN_TIME}</h4>
          <p>{strings.checkOutOurWebsite('https://www.kiwiwealth.co.nz')}</p>
        </div>
      </Main>
    </Wrapper>
  );
};

export default ErrorPage;
