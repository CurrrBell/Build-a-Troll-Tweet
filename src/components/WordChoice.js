import React from 'react';

const WordChoice = (props) => {
    return(
        <div onClick={props.click}>{props.word}</div>
    )
}

export default WordChoice;