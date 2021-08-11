import React, {Component} from 'react';
import {render} from 'react-dom';
class RepLogApp extends React.Component {
    render() {
        return <h2>Lift Stuff! <span>❤️</span></h2>;
    }
}
//const el = <h2>Lift Stuff! <span>❤️</span></h2>;
console.log(<RepLogApp />);
render(<RepLogApp />, document.getElementById('lift-stuff-app'));
