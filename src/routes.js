import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/homepage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/homepage" component={HomePage} />
    </Route>
)