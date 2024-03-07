import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BucketList from './components/BucketList/BucketList';

const App = () => {
    return (
        <Router>
            <div>
                <BucketList />
            </div>
        </Router>
    );
};

export default App;
