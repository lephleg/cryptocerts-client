import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RedirectToHome() {
    return <Redirect exact to={'/'} />
};

function RoleProtectedRoute(props) {
    const {protection, path, children } = props;

    const role = useSelector((state) => state.connection.role);

    let allowed = role === protection ? true : false;

    return allowed ? <Route path={path}>{children}</Route> : <RedirectToHome />;
}

function Web3ProtectedRoute(props) {
    const { path, children } = props;

    const web3Capable = useSelector((state) => state.connection.web3Capable);

    return web3Capable ? <Route path={path}>{children}</Route> : <RedirectToHome />;
}

export default function ProtectedRoute(props) {
    const { protection, path, children } = props;

    switch (protection) {
        case 'admin':
        case 'institution':
        case 'student':
            return <RoleProtectedRoute path={path} protection={protection}>{children}</RoleProtectedRoute>;
        case 'web3':
            return <Web3ProtectedRoute path={path}>{children}</Web3ProtectedRoute>;
        default:
            return <Route path={path}>{children}</Route>
    }
}