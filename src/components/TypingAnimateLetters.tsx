"use client"

import { PropsWithChildren, useEffect, useRef, useState } from 'react';

const TYPING_DELAY = 8;

export default function TypingAnimatedLetters({start, children, onDone}: PropsWithChildren<{start: boolean, onDone?: () => void}>) {
    const lettersRef = useRef(children!.toString());
    const [typingLetters, setTypingLetters] = useState('');
    const letters = lettersRef.current;

    useEffect(() => {
        if (!start) {
            return;
        }

        if (typingLetters.length >= letters.length && onDone) {
            onDone();
        } else if (typingLetters.length === 0) {
            setTypingLetters(letters[0]);
        } else {
            setTimeout(() => {
                setTypingLetters(letters.slice(0, typingLetters.length + 1));
            }, TYPING_DELAY);
        }
    }, [typingLetters, letters, start, onDone]);

    return <>{typingLetters}</>;
}