import { useMemo } from "react";

interface TriviaData {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const TriviaGameComponent = ({
  data,
  currentIndex,
  onAnswer,
  score,
  selectedAnswer,
}: {
  data: TriviaData[];
  currentIndex: number;
  onAnswer: (selected: string, correct: string) => void;
  score: number;
  selectedAnswer: string | null;
}) => {
  const {
    question = "",
    incorrect_answers = [],
    correct_answer = "",
  } = data[currentIndex] || {};

  //   SHUFFLE ANSWERS
  const shuffledAnswers = useMemo(() => {
    const answers = [...incorrect_answers, correct_answer];
    // eslint-disable-next-line react-hooks/purity
    return answers.sort(() => Math.random() - 0.5);
  }, [incorrect_answers, correct_answer]);

  //   if (!data || !data[currentIndex]) {
  //     return null;
  //   }

  // HELPER FUNCTIONS
  const decodeHTML = (html: string) => {
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
  };

  //   BUTTON COLOR
  const buttonColor = (answer: string) => {
    if (!selectedAnswer)
      return "bg-main-bg hover:font-bold hover:underline hover:cursor-pointer";

    if (answer === correct_answer) return "bg-green-500 text-white";

    if (answer === selectedAnswer) return "bg-red-500 text-white";

    return "bg-main-bg";
  };

  return (
    <div className="font-pixel-square flex flex-col gap-8">
      <p className="border border-main-text text-red-500 font-bold rounded text-center p-4">
        {decodeHTML(question)}
      </p>

      <p className="text-center font-bold">Your score: {score}</p>

      <ul className="grid grid-cols-2 gap-4 text-center">
        {shuffledAnswers.map((answer) => (
          <li
            key={answer}
            onClick={() => !selectedAnswer && onAnswer(answer, correct_answer)}
            className={`${buttonColor(answer)} rounded p-4 border border-main-text`}
          >
            {decodeHTML(answer)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TriviaGameComponent;
