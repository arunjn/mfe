import { mount } from 'marketing/MarketingApp'

import React, {useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect ( () => {
        const { onParentNavigate } = mount(ref.current,{
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathNnme}) => {
                const { pathname } = history.location;

                if(pathname != nextPathNnme) {
                    history.push(nextPathNnme);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref}></div>
}