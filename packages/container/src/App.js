import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MarkettingApp from './components/markettingApp';
import Header from './components/Header';


export default ()=> {
    return(
        <BrowserRouter>
            <div>
                <Header></Header>
                <MarkettingApp/>
            </div>
        </BrowserRouter>
    );
};