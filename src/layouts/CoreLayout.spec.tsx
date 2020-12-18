import React from 'react';
import { render } from '@testing-library/react';
import CoreLayout from './CoreLayout';
import { createMemoryHistory } from 'history';
import { Switch, Route, Router } from 'react-router-dom';

describe('CoreLayout', () => {
  it('renders with children', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <CoreLayout>
          <Switch>
            <Route exact path="/">
              Test
            </Route>
          </Switch>
        </CoreLayout>
      </Router>,
    );
  });
});
