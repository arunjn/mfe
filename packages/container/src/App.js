import React, {lazy , Suspense, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Header';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import Progress from './components/progress';
// import MarkettingApp from './components/markettingApp';
// import AuthApp from './components/AuthApp';
const MarketingLazy = lazy(() => import('./components/markettingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

export default ()=> {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return(
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={()=> {setIsSignedIn(false)}} isSignedIn={isSignedIn}></Header>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy onSignIn={()=>{setIsSignedIn(true)}}/>
                            </Route>
                            <Route path='/'>
                                <MarketingLazy/>
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};