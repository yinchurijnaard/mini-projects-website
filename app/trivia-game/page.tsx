"use client";

import { useState, useEffect, useMemo } from "react";
import TitleCard from "../components/TitleCard";
import { results } from "../data/triviaGameQuestions.json";

// To Do / Check
// - Implement points systems (e.g., +10 points for every correct answer and -5 points for every incorrect answer)
// - Add react-confetti IF the player has all questions correct!
// - Implement local storage logic such that the player doesn't lose its progress in case of an accidental page refresh
// - Add a 1/5 questions answered, 2/5 questions answered, etc
// - Fix/update layout, make it look actually nice

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

// interface TriviaResponse {
//   response_code: number;
//   results: TriviaQuestion[];
// }

// interface TriviaQuestion {
//   type: string;
//   question: string;
//   correct_answer: string;
//   incorrect_answers: string[];
// }

const TriviaGame = () => {
  // useState
  // const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [triviaData, setTriviaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch the data (???) (instead of the 'normal' Next.js 'pure' fetch?)
  useEffect(() => {
    const getTriviaData = async () => {
      // try {
      //   const res = await fetch(
      //     "https://opentdb.com/api.php?amount=5&category=9",
      //   );
      //   if (!res.ok) throw new Error("Failed to fetch questions");
      //   const data = await res.json();
      //   setTriviaData(data);
      // } catch (error) {
      //   setError(error.message);
      // }

      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9",
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const { results } = await res.json();

      setTriviaData(results);
    };

    getTriviaData();
  }, []);

  // FETCHING API DATA
  // const getTriviaData = async () => {
  //   const res = await fetch("https://opentdb.com/api.php?amount=5&category=9");

  //   if (!res.ok) throw new Error("Failed to fetch data");

  //   const { results } = await res.json();
  //   setTriviaData(results);
  //   console.log(triviaData);
  // };

  // START GAME
  const startGame = () => {
    // console.log(shuffled);
  };

  console.log(triviaData);

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🕹️ Trivia Game 🧐 "} />

      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        <button onClick={startGame} className="btn">
          Start game
        </button>
      </div>

      {/* Temporary hard coded UI */}
      <div className="border border-blue-500 sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded">
        <p className="bg-red-500 text-white rounded font-bold text-center p-4">
          Question
        </p>

        <ul className="grid grid-cols-2 gap-4">
          <p>Answers</p>
          <p>Answers</p>
          <p>Answers</p>
          <p>Answers</p>
        </ul>
      </div>
    </main>
  );
};

export default TriviaGame;

// GAME SETUP
// const answers = [...incorrect_answers, correct_answer];
// const shuffled = answers.sort(() => Math.random() - 0.5);

// INTERFACES
// interface TriviaGameTypes {
//   id: number;
//   type: string;
//   question: string;
//   correctAnswer: string;
//   incorrectAnswers: string[];
// }

// RESET GAME
// const resetGame = () => {
//   console.log("Game reset!");
// };

// HELPER FUNCTIONS
// const decodeHTML = (html: string) => {
//   const text = document.createElement("textarea");
//   text.innerHTML = html;
//   return text.value;
// };

// // useMemo
// const shuffledAnswers = useMemo(() => {
//   const allAnswers = [...incorrect_answers, correct_answer];

//   // eslint-disable-next-line react-hooks/purity
//   return allAnswers.sort(() => Math.random() - 0.5);
// }, [correct_answer, incorrect_answers]);

// OLD CODE FOR THE LOCAL JSON FILE
// DESTRUCTURING DATA
// const { question, correct_answer, incorrect_answers } = results[currentIndex];

// THE LOGIC
// 1. When the player clicks the "Start game" button, the Open Trivia DB API is called.
// 2. Questions will be loaded/rendered
// 3. useState has to be used to check progress (1/5 questions answered, 2/5 questions answered, etc)
// 4. useState has to be used to check amount of correct and incorrect answers
// 6. useState has to be used to determine if the player has won
// 7. useEffect has to be used to fetch the data when the component mounts (or if I want to have the questions timed (e.g., 30 seconds))
// 8. How do I implement a different layout for true/false questions, as opposed to the 'normal' multiple choice questions? --> conditional rendering based on the type of question
// 9. Do I use a .filter() to check if the player's clicked answer equals the actual answer? --> no, use this instead: if (clickedAnswer === currentQuestion.correct_answer)
