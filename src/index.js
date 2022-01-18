import React, { Suspense} from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import BlockUI from './components/BlockUI';

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<BlockUI blocking={true} />}>
            <App />
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
)