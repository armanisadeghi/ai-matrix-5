'use client';

import React, { useState, useEffect } from 'react';
import styles from './Typewriter.module.css';

const Typewriter = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');

    useEffect(() => {
        const type = (setText, text, speed) => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    setText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        };

        type(setText1, "This is the first effect.", 100);
        setTimeout(() => type(setText2, "This is the second effect.\nThis one just might be the best one.\nYou know what I mean?", 50), 3500);
        setTimeout(() => type(setText3, "This is the third effect.", 150), 7000);
        setTimeout(() => type(setText4, "This is the fourth effect.", 200), 10500);
        setTimeout(() => type(setText5, "This is the fifth effect.", 250), 14000);
    }, []);

    return (
        <div className={styles.container}>
            <div className={`${styles.typewriter} ${styles.typewriter1}`}>{text1}</div>
            <div className={`${styles.typewriter} ${styles.typewriter2}`}>{text2}</div>
            <div className={`${styles.typewriter} ${styles.typewriter3}`}>{text3}</div>
            <div className={`${styles.typewriter} ${styles.typewriter4}`}>{text4}</div>
            <div className={`${styles.typewriter} ${styles.typewriter5}`}>{text5}</div>
        </div>
    );
};

export default Typewriter;
