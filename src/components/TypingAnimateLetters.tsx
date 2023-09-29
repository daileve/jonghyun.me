"use client"

import { PropsWithChildren, useEffect, useRef, useState } from 'react';

const TYPING_DELAY = 10;

export default function TypingAnimatedLetters({start, children, onDone}: PropsWithChildren<{start: boolean, onDone?: () => void}>) {
    const lettersRef = useRef(children!.toString());
    const [typingLetters, setTypingLetters] = useState('');

    useEffect(() => {
        if (!start) {
            return;
        }

        if (typingLetters.length >= lettersRef.current.length && onDone) {
            onDone();
        } else if (typingLetters.length === 0) {
            setTypingLetters(lettersRef.current[0]);
        } else {
            setTimeout(() => {
                setTypingLetters(lettersRef.current.slice(0, typingLetters.length + 1));
            }, TYPING_DELAY);
        }
    }, [typingLetters, start, onDone]);

    return <>{typingLetters}</>;
}