'use client';

import React, { useState, useEffect } from 'react';
import styles from './CodeTypewriter.module.css';

const CodeTypewriter = () => {
    const [text, setText] = useState('');
    const [cursorPosition, setCursorPosition] = useState({ row: 0, col: 0 });

    const fullText = `Hi everyone. My name is Matrix A.... I... hehe
Did you see that cool trick I did with the A... I....????
You know. like.. I..... AM.... A.... ROBOT! ;)
But seriously. Let's get to work.

const greeting = "Hello, World!";
console.log(greeting);
let count = 5;
while (count > 0) {
    console.log(count);
    count--;
}
console.log("Blastoff!");`;

    useEffect(() => {
        let currentIndex = 0;
        let currentRow = 0;
        let currentCol = 0;

        const typeChar = () => {
            if (currentIndex < fullText.length) {
                const char = fullText[currentIndex];
                setText(prev => prev + char);

                if (char === '\n') {
                    currentRow++;
                    currentCol = 0;
                } else {
                    currentCol++;
                }

                setCursorPosition({ row: currentRow, col: currentCol });
                currentIndex++;

                const delay = char === '\n' ? 500 : 100;
                setTimeout(typeChar, delay);
            }
        };

        typeChar();
    }, []);

    return (
        <div className={styles.codeTypewriter}>
            <pre>{text}</pre>
            <span
                className={styles.cursor}
                style={{
                    top: `${cursorPosition.row * 2}em`,
                    left: `${cursorPosition.col * 0.6}em`
                }}
            ></span>
        </div>
    );
};

export default CodeTypewriter;
