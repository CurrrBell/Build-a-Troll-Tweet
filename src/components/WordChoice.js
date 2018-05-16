import React from 'react';
import styles from '../App.css';

const WordChoice = (props) => {
    return(
        <span onClick={props.click} className={styles.Choice}>{props.word}</span>
    )
}

export default WordChoice;