"use client"

import { useCallback, useState } from 'react';

import TypingAnimatedLetters from '../components/TypingAnimateLetters';

import './page.css';
import ParticleBackground from '../components/ParticleBackground';

export default function Home() {
  const [typingIdx, setTypingIdx] = useState(0);
  const increaseTypingIdx = useCallback(() => setTypingIdx(idx => idx += 1), []);

  return <>
    <div className='particleBackground'><ParticleBackground></ParticleBackground></div>
    <main className='mainWrap'>
      <header className='welcomeHeader'><TypingAnimatedLetters start={typingIdx === 0} onDone={increaseTypingIdx}>Welcome. 👋</TypingAnimatedLetters></header>
      <article>
        <header className='subHeader'><TypingAnimatedLetters start={typingIdx === 1} onDone={increaseTypingIdx}>Information</TypingAnimatedLetters></header>
        <div><TypingAnimatedLetters start={typingIdx === 2} onDone={increaseTypingIdx}>Software Engineer &amp; Frontend Developer</TypingAnimatedLetters></div>
        <div><TypingAnimatedLetters start={typingIdx === 3} onDone={increaseTypingIdx}>Jonghyun Kim (daileve)</TypingAnimatedLetters></div>
      </article>
      <article>
        <header className='subHeader'><TypingAnimatedLetters start={typingIdx === 4} onDone={increaseTypingIdx}>Programming or Markup Languages</TypingAnimatedLetters></header>
        <div><TypingAnimatedLetters start={typingIdx === 5} onDone={increaseTypingIdx}>Mostly used: HTML, CSS (Less), Javascript (Typescript)</TypingAnimatedLetters></div>
        <div><TypingAnimatedLetters start={typingIdx === 6} onDone={increaseTypingIdx}>Not mostly used: Ruby, Python, PHP, Java, C#, Swift</TypingAnimatedLetters></div>
      </article>
      <article>
        <header className='subHeader'><TypingAnimatedLetters start={typingIdx === 7} onDone={increaseTypingIdx}>Libraries</TypingAnimatedLetters></header>
        <div><TypingAnimatedLetters start={typingIdx === 8} onDone={increaseTypingIdx}>Mostly used: Angular, Webpack, Yarn, Nginx, Docker, Node.js, Redux &amp; NgRx</TypingAnimatedLetters></div>
        <div><TypingAnimatedLetters start={typingIdx === 9} onDone={increaseTypingIdx}>Not mostly used: React, Rails, Grunt, Esbuild, Kubernetes, Next.js, Electron, Turborepo</TypingAnimatedLetters></div>
      </article>
      <article>
        <header className='subHeader'><TypingAnimatedLetters start={typingIdx === 10} onDone={increaseTypingIdx}>Tools</TypingAnimatedLetters></header>
        <div><TypingAnimatedLetters start={typingIdx === 11} onDone={increaseTypingIdx}>VS Code, Figma, Slack, Teams, Notion, Asana, Linear, Git</TypingAnimatedLetters></div>
      </article>
      <article>
        <header className='subHeader'><TypingAnimatedLetters start={typingIdx === 12} onDone={increaseTypingIdx}>Experiences</TypingAnimatedLetters></header>
        <div><TypingAnimatedLetters start={typingIdx === 13} onDone={increaseTypingIdx}>Monorepo, Frontend base library migration, RESTful API, GraphQL</TypingAnimatedLetters></div>
        <div><TypingAnimatedLetters start={typingIdx === 14} onDone={increaseTypingIdx}>Conventional Commits, SSL</TypingAnimatedLetters></div>
      </article>
      <article>
        <header className='subHeader'><TypingAnimatedLetters start={typingIdx === 15} onDone={increaseTypingIdx}>Languages</TypingAnimatedLetters></header>
        <div><TypingAnimatedLetters start={typingIdx === 16} onDone={increaseTypingIdx}>Korean as native level</TypingAnimatedLetters></div>
        <div><TypingAnimatedLetters start={typingIdx === 17} onDone={increaseTypingIdx}>English as intermediate level</TypingAnimatedLetters></div>
      </article>
    </main>
  </>;
}
