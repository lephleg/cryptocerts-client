import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RedirectToHome() {
    return <Redirect exact to={'/'} />
};

function RoleProtectedRoute(props) {
    const { roles, path, children } = props;
    const roleState = useSelector((state) => state.connection.role);
    const allowed = roles.includes(roleState);

    return allowed ? <Route path={path}>{children}</Route> : <RedirectToHome />;
}

function Web3ProtectedRoute(props) {
    const { path, children } = props;
    const web3Capable = useSelector((state) => state.connection.web3Capable);

    return web3Capable ? <Route path={path}>{children}</Route> : <RedirectToHome />;
}

export default function ProtectedRoute(props) {
    const { protection, roles, path, children } = props;

    switch (protection) {
        case 'role':
            return <RoleProtectedRoute path={path} roles={roles}>{children}</RoleProtectedRoute>;
        case 'web3':
            return <Web3ProtectedRoute path={path}>{children}</Web3ProtectedRoute>;
        default:
            return <Route path={path}>{children}</Route>
    }
}