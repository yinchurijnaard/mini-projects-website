"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import TitleCard from "../components/TitleCard";

interface ToastItem {
  id: number;
  message: string;
}

const DoNotClickMe = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [timesClicked, setTimesClicked] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("Don't click me");
  const [buttonHeight, setButtonHeight] = useState("100px");
  const [buttonWidth, setButtonWidth] = useState("100px");
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  // const message = () => {
  //   if (timesClicked === 0) {
  //     return (
  //       <p>
  //         Click the button... <span className="text-xs">or not</span>
  //       </p>
  //     );
  //   } else {
  //     return (
  //       <p>
  //         <span className="font-bold">Button says:</span> {buttonText}
  //       </p>
  //     );
  //   }
  // };

  const resetGame = () => {
    setPosition({ top: 50, left: 50 });
    setTimesClicked(0);
    setButtonText("Don't click me");
    setToasts([]);
    setButtonHeight("100px");
    setButtonWidth("100px");
    setHasWon(false);
    setButtonDisabled(false);
  };

  const moveButton = () => {
    const x = Math.random() * 90; // stay within 90% of width
    const y = Math.random() * 90; // stay within 90% of height
    setPosition({ top: y, left: x });

    const newCount = timesClicked + 1;
    setTimesClicked(newCount);

    const newMessage = buttonText;
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: newMessage }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);

    if (newCount === 35) {
      setButtonText("Okay, you won... 😐");
      setHasWon(true);
      setButtonDisabled(true);

      // setTimeout(() => {
      //   resetGame();
      // }, 5000);
    } else if (newCount >= 30) {
      setButtonText("You're hurting me :(");
    } else if (newCount >= 25) {
      setButtonText("Please don't click me pwetty pwease 🥺");
    } else if (newCount >= 20) {
      setButtonText("DO NOT CLICK ME!!!");
    } else if (newCount >= 15) {
      setButtonText("I said: do NOT click me");
    } else if (newCount >= 10) {
      setButtonText("Seriously, don't click me");
    } else if (newCount >= 5) {
      setButtonText("Don't click me, please");
    }

    // OLD IF STATEMENT
    // if (timesClicked >= 35) {
    //   setButtonText("Okay, you won... 😐");
    //   setHasWon(true);
    // } else if (timesClicked >= 30) {
    //   setButtonText("You're hurting me :(");
    // } else if (timesClicked >= 25) {
    //   setButtonText("Please don't click me pwetty pwease 🥺");
    // } else if (timesClicked >= 20) {
    //   setButtonText("DO NOT CLICK ME!!!");
    // } else if (timesClicked >= 15) {
    //   setButtonText("I said: do NOT click me");
    // } else if (timesClicked >= 10) {
    //   setButtonText("Seriously, don't click me");
    // } else if (timesClicked >= 5) {
    //   setButtonText("Don't click me, please");
    // }
  };

  useEffect(() => {
    const currentHeight = buttonHeight;
    const newHeight = parseInt(currentHeight) - 1 + "px";
    const currentWidth = buttonWidth;
    const newWidth = parseInt(currentWidth) - 1 + "px";

    setButtonHeight((prevButtonHeight) => newHeight);
    setButtonWidth((prevButtonWidth) => newWidth);
  }, [timesClicked]);

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🛑 Don't Click Me ✋🏻"} />

      {/* CONTENT */}
      <div className="flex flex-row items-center justify-center">
        {timesClicked === 0 && <p>Click the button... or not</p>}
        {hasWon && (
          <button onClick={resetGame} className="btn">
            Reset game
          </button>
        )}
        {hasWon && <Confetti />}
        <button
          onClick={moveButton}
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
            height: `${buttonHeight}`,
            width: `${buttonWidth}`,
            transition: `all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
          }}
          disabled={buttonDisabled}
          className={`rounded-full absolute bg-red-500 border-b-4 border-red-700 hover:bg-red-400 active:border-b-0 active:mt-1 shadow-lg active:shadow-inner cursor-pointer`}
        ></button>

        {/* TOAST */}
        <div className="toast toast-center">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="alert alert-info text-white animate-bounce"
            >
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DoNotClickMe;
