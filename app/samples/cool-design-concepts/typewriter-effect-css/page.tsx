import React from 'react';
import styles from './Typewriter.module.css';

const Typewriter = () => {
    return (
        <div className={styles.container}>
            <div className={styles.typewriter1}>This is the first effect.</div>
            <div className={styles.typewriter2}>This is the second effect.'\n' This one just might be the best one. '\n' You know what I mean?</div>
            <div className={styles.typewriter3}>This is the third effect.</div>
            <div className={styles.typewriter4}>This is the fourth effect.</div>
            <div className={styles.typewriter5}>This is the fifth effect.</div>
        </div>
    );
};

export default Typewriter;
