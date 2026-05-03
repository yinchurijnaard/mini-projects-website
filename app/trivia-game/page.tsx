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

// THE LOGIC (REFINED WITH THE HELP OF GEMINI)

// Tracking
// - Track which question index the player is currently on (use useState for this!)

// Score
// - Increment only when the chosen answer is correct (use useState for this as well!)

// Progression
// - When a button is clicked, check the answer, then increment the current index

// End game
// - If currentIndex === questions.length, show the result screen

// Important
// - Use utility function to decode HTML Entities
// - Win state, instead of hasWon, perhaps track the score.

// Open Trivia DB
// - API URL: https://opentdb.com/api.php?amount=5&category=9
// - Returns 5 questions in the category 'General Knowledge'. Any difficulty and includes both multiple choice and true/false questions.
// - See triviaGameQuestions.json for a temporary hardcoded API response

//

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
        "https://opentdb.com/api.php?amount=5&category=9",
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

  // console.log(triviaData);

  // DESTRUCTURE PROPERTIES
  const { question, incorrect_answers, correct_answer } =
    triviaData[currentIndex];

  // SHUFFLE ANSWERS
  const answers = [...incorrect_answers, correct_answer];
  // eslint-disable-next-line react-hooks/purity
  const shuffled = answers.sort(() => Math.random() - 0.5);

  // START GAME
  const startGame = () => {
    setLoading(false);
  };

  // CHECK ANSWER
  const checkAnswer = (selectedAnswer: string) => {
    setSelectedAnswer(selectedAnswer);

    if (selectedAnswer === correct_answer) {
      setScore((prevScore) => prevScore + 10);

      // console.log("Correct!");
    } else {
      // console.log(":(");
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    }, 2500);
  };

  const buttonColor = (answer: string) => {
    if (!selectedAnswer) return "bg-main-bg";

    if (answer === selectedAnswer) {
      return answer === correct_answer ? "bg-green-500" : "bg-red-500";
    }
  };

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🕹️ Trivia Game 🧐 "} />

      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        {loading && (
          <button onClick={startGame} className="btn">
            Start game
          </button>
        )}

        {!loading && (
          <>
            <p className="bg-fuchsia-500 rounded font-bold text-center p-4">
              {decodeHTML(question)}
            </p>

            <p className="text-center font-bold">Your score: {score}</p>

            <ul className="grid grid-cols-2 gap-4 text-center">
              {shuffled.map((answer) => (
                <li
                  key={answer}
                  onClick={() => checkAnswer(answer)}
                  className={`${buttonColor(answer)} p-4 hover:font-bold hover:underline hover:cursor-pointer`}
                >
                  {decodeHTML(answer)}
                </li>
              ))}
            </ul>
          </>
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

// THE LOGIC
// 1. When the player clicks the "Start game" button, the Open Trivia DB API is called.
// 2. Questions will be loaded/rendered
// 3. useState has to be used to check progress (1/5 questions answered, 2/5 questions answered, etc)
// 4. useState has to be used to check amount of correct and incorrect answers
// 6. useState has to be used to determine if the player has won
// 7. useEffect has to be used to fetch the data when the component mounts (or if I want to have the questions timed (e.g., 30 seconds))
// 8. How do I implement a different layout for true/false questions, as opposed to the 'normal' multiple choice questions? --> conditional rendering based on the type of question
// 9. Do I use a .filter() to check if the player's clicked answer equals the actual answer? --> no, use this instead: if (clickedAnswer === currentQuestion.correct_answer)
