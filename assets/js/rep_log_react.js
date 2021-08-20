import React from "react";
import 'whatwg-fetch';
import {render} from 'react-dom';
import RepLogApp from './RepLogs/RepLogAAA'

const shouldShowHeart = true;
//console.log(<RepLogApp/>);
render(
    <div>
        <RepLogApp withHeart={shouldShowHeart}/>
    </div>, document.getElementById('lift-stuff-app')
);
