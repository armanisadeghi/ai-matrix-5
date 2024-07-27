'use client';

import React, { useEffect } from 'react';
import styles from './Typewriter.module.css';

const Typewriter = () => {
    useEffect(() => {
        const typeEffect = (el, toRotate, period) => {
            let loopNum = 0;
            let txt = '';
            let isDeleting = false;

            const tick = () => {
                const i = loopNum % toRotate.length;
                const fullTxt = toRotate[i];

                txt = isDeleting
                    ? fullTxt.substring(0, txt.length - 1)
                    : fullTxt.substring(0, txt.length + 1);

                el.innerHTML = `<span class="wrap">${txt}</span>`;

                let delta = 200 - Math.random() * 100;

                if (isDeleting) delta /= 2;

                if (!isDeleting && txt === fullTxt) {
                    delta = period;
                    isDeleting = true;
                } else if (isDeleting && txt === '') {
                    isDeleting = false;
                    loopNum++;
                    delta = 500;
                }

                setTimeout(tick, delta);
            };

            tick();
        };

        const elements = document.getElementsByClassName('typewrite');
        Array.from(elements).forEach((element) => {
            const toRotate = element.getAttribute('data-type');
            const period = element.getAttribute('data-period');
            if (toRotate) {
                typeEffect(element, JSON.parse(toRotate), period);
            }
        });

        const css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; white-space: pre-wrap; }";
        document.body.appendChild(css);
    }, []);

    return (
        <div className={styles.container}>
            <h1>
                <a href="#" className="typewrite" data-period="2000" data-type='[
          "Hi, Im Si.",
          "I am Creative.",
          "I Love Design.",
          "I Love to Develop.",
          "Welcome to my portfolio.",
          "Lets create something amazing together."
        ]'>
                    <span className="wrap"></span>
                </a>
            </h1>
        </div>
    );
};

export default Typewriter;
