import React, { Component } from 'react';
import Apidemo from './components/Apidemo';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <Apidemo/>
            </div>
        );
    }
}

export default App;