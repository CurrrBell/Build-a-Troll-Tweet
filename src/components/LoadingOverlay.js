import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from '../App.css';

const LoadingOverlay = (props) => {
    return(
        <div className={props.loading ? styles.Loading : styles.Loading + ' ' + styles.Loaded}>
            <div className={styles.LoadingContents}>
                <h3>Build A Troll Tweet</h3>
                <i className="fa fa-spinner fa-spin 4x"></i><br/>
                <span>Drinking vodka...</span>
            </div>
        </div>
    )
}

export default LoadingOverlay