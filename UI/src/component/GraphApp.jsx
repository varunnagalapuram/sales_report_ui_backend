import React, { Component } from 'react';
//import ListStores from './ListStores';
import GraphComponent from './GraphComponent';
import GraphMarketComponent from './GraphMarketComponent'


class GraphApp extends Component {
    render() {
        return (
            
            <div className="grid-container">
                <div class="grid-item"><GraphComponent/></div>
                <div class="grid-item"><GraphMarketComponent/></div>
            </div>
            
        )
    }
}

export default GraphApp