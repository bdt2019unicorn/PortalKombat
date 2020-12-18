import React, { Component } from 'react';
import DisplayNotification from 'components/displayNotification/DisplayNotification';
import DatabaseService from 'services/DatabaseService';
import { Card, CardGroup, ContentWidth, Metric, Section } from '@kiwiwealth/ui';

class Dashboard extends Component {
  state: any;
  constructor(props: any) {
    super(props);
    this.state = { itemsArray: [] };
    this.onDataChange = this.onDataChange.bind(this);
  }
  componentDidMount() {
    //TODO get member id from authentication
    DatabaseService.getRequestsByMemberId('KWKS12345').on("value", this.onDataChange);
  }
  onDataChange(items: any[]) {
    let itemsArray: any[] = [];
    items.forEach((item: any) => {
      itemsArray.push({ key: item.key, info: item.val() });
    });
    //TODO only need a flag for array > 0
    this.setState({ itemsArray });
  }

  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Portal Kombat</h1>
        <Section>
          <CardGroup
            isStackedAtSmall
            widthClasses="width-1/2@medium"
          >


            <div className="u-margin-bottom">
              <Card isMiddleAligned
                isFlushBottom
                hasDropShadow
                hasDottedBackground
                className="u-color-grey-dark u-text-decoration-none@hover u-line-height-headline"
                heading={<>Santa's KiwiSaver</>}
              >
                <Metric size="large"
                  label="Balance"
                  color={'green'}
                  value="$10,000"
                >ready to withdrawal on Dec 25th</Metric> </Card>
            </div>
            <div className="u-margin-bottom">
              <DisplayNotification itemsArray={this.state.itemsArray} />
            </div>
          </CardGroup>
        </Section>
      </>
    );
  }
}

export default Dashboard;
