"use client";

import { useState, useEffect, useMemo } from "react";
import TitleCard from "../components/TitleCard";

// To Do / Check
// - Implement points systems (e.g., +10 points for every correct answer and -5 points for every incorrect answer)
// - Add react-confetti IF the player has all questions correct!
// - Implement local storage logic such that the player doesn't lose its progress in case of an accidental page refresh
// - Add a 1/5 questions answered, 2/5 questions answered, etc
// - Fix/update layout, make it look actually nice
// - Let players choose difficulty, question types and category themselves

// End game
// - If currentIndex === questions.length, show the result screen

// HELPER FUNCTIONS
const decodeHTML = (html: string) => {
  const text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
};

// INTERFACES
interface TriviaData {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const TriviaGame = () => {
  // Initializing state like this prevents the console from complaining that there's nothing to destructure
  const [triviaData, setTriviaData] = useState<TriviaData[]>([
    {
      question: "",
      incorrect_answers: [],
      correct_answer: "",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number>(0);

  // useEffect to fetch the data (???) (instead of the 'normal' Next.js 'pure' fetch?)
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getTriviaData = async () => {
      // Refactor to use a try / catch block
      const res = await fetch(
        "https://opentdb.com/api.php?amount=3&category=9",
        { signal },
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const { results } = await res.json();

      setTriviaData(results);
    };

    getTriviaData();

    // Cleanup
    return () => {
      controller.abort();
    };
  }, []);

  // Destructure properties
  const { question, incorrect_answers, correct_answer } =
    triviaData[currentIndex];

  // useMemo to shuffle questions
  const shuffledAnswers = useMemo(() => {
    const answers = [...incorrect_answers, correct_answer];
    // eslint-disable-next-line react-hooks/purity
    return answers.sort(() => Math.random() - 0.5);
  }, [incorrect_answers, correct_answer]);

  // Start game
  const startGame = () => {
    setLoading(false);
  };

  // Check answer
  const checkAnswer = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer);

    if (selectedAnswer === correct_answer) {
      setScore((prevScore) => prevScore + 10);
    } else {
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    }, 2000);
  };

  // Dynamic answer button styling
  const buttonColor = (answer: string) => {
    if (!selectedAnswer)
      return "bg-main-bg hover:font-bold hover:underline hover:cursor-pointer";

    if (answer === correct_answer) return "bg-green-500 text-white";

    if (answer === selectedAnswer) return "bg-red-500 text-white";

    return "bg-main-bg";
  };

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🕹️ Trivia Game 🧐 "} />

      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        {/* Start screen */}
        {loading && (
          <div className="font-pixel-square flex flex-col gap-8 items-center justify-center">
            <p className="text-4xl sm:text-6xl text-red-500">Trivia Game</p>
            <button
              onClick={startGame}
              className="text-2xl sm:text-4xl border border-main-text rounded-full px-8 py-4 cursor-pointer hover:text-red-500 hover:border-red-500"
            >
              Start game
            </button>

            <p className="text-lg sm:text-2xl text-center">
              You can get a total of {triviaData.length * 10} points. Are you
              smart enough?!
            </p>
          </div>
        )}

        {/* Actual Trivia Game  */}
        {!loading && (
          <div className="font-pixel-square flex flex-col gap-8">
            <p className="border border-main-text text-red-500 font-bold rounded text-center p-4">
              {decodeHTML(question)}
            </p>

            <p className="text-center font-bold">Your score: {score}</p>

            <ul className="grid grid-cols-2 gap-4 text-center">
              {shuffledAnswers.map((answer) => (
                <li
                  key={answer}
                  onClick={() => checkAnswer(answer)}
                  className={`${buttonColor(answer)} rounded p-4 border border-main-text`}
                >
                  {decodeHTML(answer)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Results */}
        {currentIndex >= triviaData.length && (
          <div>
            <p>Well done</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default TriviaGame;

// RESET GAME
// const resetGame = () => {
//   console.log("Game reset!");
// };
