"use client";

import { useState, useEffect, useMemo } from "react";
import TitleCard from "../components/TitleCard";
import { results } from "../data/triviaGameQuestions.json";

// To Do / Check
// - Implement points systems (e.g., +10 points for every correct answer and -5 points for every incorrect answer)
// - Add react-confetti IF the player has all questions correct!
// - Implement local storage logic such that the player doesn't lose its progress in case of an accidental page refresh
// - Add a 1/5 questions answered, 2/5 questions answered, etc

// QUESTIONS
// If I render decodeHTML(question), how will I know that's a dynamic question that updates as the player goes to the next question?

// THE LOGIC (REFINED WITH THE HELP OF GEMINI)
// Setup
// - Combine correct and incorrect answers ([...incorrect_answers, correct_answer]) into one array and shuffle them (array.sort(() => Math.random() - 0.5))

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

// THE LOGIC
// 1. When the player clicks the "Start game" button, the Open Trivia DB API is called.
// 2. Questions will be loaded/rendered
// 3. useState has to be used to check progress (1/5 questions answered, 2/5 questions answered, etc)
// 4. useState has to be used to check amount of correct and incorrect answers
// 6. useState has to be used to determine if the player has won
// 7. useEffect has to be used to fetch the data when the component mounts (or if I want to have the questions timed (e.g., 30 seconds))
// 8. How do I implement a different layout for true/false questions, as opposed to the 'normal' multiple choice questions? --> conditional rendering based on the type of question
// 9. Do I use a .filter() to check if the player's clicked answer equals the actual answer? --> no, use this instead: if (clickedAnswer === currentQuestion.correct_answer)

// Open Trivia DB
// - API URL: https://opentdb.com/api.php?amount=5&category=9
// - Returns 5 questions in the category 'General Knowledge'. Any difficulty and includes both multiple choice and true/false questions.
// - See triviaGameQuestions.json for a temporary hardcoded API response

// INTERFACES
interface TriviaGameTypes {
  id: number;
  type: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

// HELPER FUNCTIONS
// const decodeHTML = (html: string) => {
//   const text = document.createElement("textarea");
//   text.innerHTML = html;
//   return text.value;
// };

const TriviaGame = () => {
  // useState
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // useEffect

  // DESTRUCTURING DATA
  const { type, question, correct_answer, incorrect_answers } =
    results[currentIndex];

  // START GAME
  const startGame = () => {
    const answers = [...incorrect_answers, correct_answer];
    const shuffled = answers.sort(() => Math.random() - 0.5);
    // console.log("Game started!");
    console.log(shuffled);
  };

  // RESET GAME
  // const resetGame = () => {
  //   console.log("Game reset!");
  // };

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🕹️ Trivia Game 🧐 "} />

      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        <button onClick={startGame} className="btn">
          Start game
        </button>
      </div>

      {/* THE ACTUAL GAME, FOR NOW */}
      {/* <div className="bg-sky-300">
        {results[currentIndex].map((qa: TriviaGameTypes) => (
          <div key={qa.id}>
            <p>{qa.question}</p>
          </div>
        ))}
      </div> */}
    </main>
  );
};

export default TriviaGame;
