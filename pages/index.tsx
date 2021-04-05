import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface Word {
    word: string;
    translationOfWord: string;
}

export default function Home() {
    const [word, setWordState] = useState<Word>({
        word: '',
        translationOfWord: '',
    });

    const randomWord = async () => {
        await fetch('/api/giveWord')
            .then(res => res.json())
            .then(res => {
                console.log(res.word);
                const theWord = Object.keys(res.word);
                const theTranslation = res.word[theWord[0]];
                console.log(theTranslation);
                setWordState({
                    word: theWord[0],
                    translationOfWord: theTranslation,
                });
            });
    };

    useEffect(() => {
        randomWord();
    }, []);
    return (
        <div className={styles.container}>
            <Head>
                <title>Deutsch Thing</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <h1>{word.word}</h1>
            <h2>{word.translationOfWord}</h2>
        </div>
    );
}
