import React from 'react';
import allRoutes from './routes';
import { Switch, Route } from 'react-router-dom';

export default class AppRoutes extends React.Component {
    render() {
        return (
            <Switch>
                {
                    allRoutes.map(singleRoute => (
                        <Route {...singleRoute} />
                    ))
                }
            </Switch>
        );
    }
}
