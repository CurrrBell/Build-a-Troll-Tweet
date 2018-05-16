import React from 'react';
import styles from '../App.css';

const TweetEditor = (props) => {
    return(
        <div className={styles.Tweet}>
            {props.text || 'What\'s happening?'}
            <span className={styles.CharacterCount}>{props.text.length || 0}</span>
        </div>
    )
}

export default TweetEditor;