import React, {lazy , Suspense, useState, useEffect } from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'

import Header from './components/Header';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import Progress from './components/progress';
// import MarkettingApp from './components/markettingApp';
// import AuthApp from './components/AuthApp';
import DashboardApp from './components/DashboardApp';
const MarketingLazy = lazy(() => import('./components/markettingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
// const DashboardLazy = lazy(()=> import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default ()=> {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(()=>{
        if(isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);
    return(
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={()=> {setIsSignedIn(false)}} isSignedIn={isSignedIn}></Header>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy onSignIn={()=>{setIsSignedIn(true)}}/>
                            </Route>
                            <Route path='/dashboard'>
                                {!isSignedIn && <Redirect to='/'/>}
                                <DashboardApp/>
                            </Route>
                            <Route path='/'>
                                <MarketingLazy/>
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};