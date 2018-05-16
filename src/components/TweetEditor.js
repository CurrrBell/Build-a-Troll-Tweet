import React from 'react';

const TweetEditor = (props) => {
    return(
        <div>{props.text || 'What\'s happening?'}</div>
    )
}

export default TweetEditor;