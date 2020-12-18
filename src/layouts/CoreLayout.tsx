import { Wrapper, Header, Main, Footer, Grid, GridItem } from '@kiwiwealth/ui';
import ExternalLink from 'components/externalLink/ExternalLink';
import React from 'react';

type CoreLayoutProps = {
  children: React.ReactNode;
};

/** TOUPDATE */
const CoreLayout = ({ children }: CoreLayoutProps) => {
  return (
    <Wrapper width="wide">
      <Header navPrimary={null} navSecondary={null} />
      <Main>{children}</Main>
      <Footer
        navPrimary={
          <Grid hasColumnSpacing hasRowSpacing spacingSize="small">
            <GridItem g="auto">
              <p x-ms-format-detection="none">
                <span className="u-font-weight-semi-bold">0800 427 384 </span>
                Available Thu-Fri, 8.00am-5.00pm
              </p>
            </GridItem>
            <GridItem g="auto">
              <ul className="list-inline list-inline--borders">
                <li>
                  <a
                    className="u-font-weight-medium"
                    href="#"
                  >
                    Help
                  </a>
                </li>
                <li>
                  <ExternalLink
                    className="u-font-weight-medium"
                    href="https://www.kiwiwealth.co.nz/website-terms-of-use-and-privacy-policy"
                  >
                    Privacy Statement
                  </ExternalLink>
                </li>
              </ul>
            </GridItem>
          </Grid>
        }
        navSecondary={
          <p className="u-font-size-xxs">
            There isn't really anything important in this paragraph but it's still important to make it look big and meaningful.          </p>
        }
      />
    </Wrapper>
  );
};

export default CoreLayout;
