import React from "react";
import {render} from 'react-dom';
import RepLogAAA from './RepLog/RepLogAAA'

const shouldShowHeart = true;
console.log(<RepLogAAA/>);
render(
    <div>
        <RepLogAAA withHeart={shouldShowHeart} />
    </div>, document.getElementById('lift-stuff-app'));
