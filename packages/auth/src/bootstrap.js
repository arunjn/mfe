import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// define mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory(
        {
            initialEntries: [initialPath],
        }
    );

    if( onNavigate ) {
        history.listen(onNavigate);
    }

    ReactDom.render(
        <App onSignIn={onSignIn} history={history}/> , el
    );

    return {
        onParentNavigate : ( { pathname: nextPathname} ) => {
            const { pathname } = history.location;
            console.log("Container just navigated");
            if(nextPathname != pathname) {
                history.push(nextPathname);
            }
        }
    }
}

// if we are in development and in isolation
// call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory()});
    }
}


// we are running through container
// and we should export the mount function

export {mount};