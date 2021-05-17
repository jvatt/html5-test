import React from 'react';
import {Users, Header} from './components';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="container">
                <Header></Header>
                <Users/>
            </div>
        </div>
    );
}

export default App
