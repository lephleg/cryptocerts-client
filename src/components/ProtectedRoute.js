import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute(props) {
    const connectedStatus = useSelector((state) => state.connection.connected);

    const renderedRoute = (
        <Route path={props.path}>
            {props.children}
        </Route>
    );

    const redirectToHome = (
        <Redirect exact to={'/'} />
    );

    return connectedStatus ? renderedRoute : redirectToHome;
}