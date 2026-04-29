"use client";

import { useState, useEffect } from "react";
import TitleCard from "../components/TitleCard";

const DoNotClickMe = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [timesClicked, setTimesClicked] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("don't click me");
  const [buttonHeight, setButtonHeight] = useState("100px");
  const [buttonWidth, setButtonWidth] = useState("100px");

  // const [toasts, setToasts] = useState([]);

  // const addToast = () => {
  //   const id = Date.now();
  //   const newMessage = { id, text: "I said NOOO" };
  //   setToasts((prev) => [...prev, newMessage]);
  //   setTimeout(() => {
  //     setToasts((prev) => prev.filter((t) => t.id !== id));
  //   }, 2000);
  // };

  const message = () => {
    if (timesClicked === 0) {
      return (
        <p>
          Click the button... <span className="text-xs">or not</span>
        </p>
      );
    } else {
      return (
        <p>
          <span className="font-bold">Button says:</span> {buttonText}
        </p>
      );
    }
  };

  const moveButton = () => {
    const x = Math.random() * 90; // stay within 90% of width
    const y = Math.random() * 90; // stay within 90% of height

    setPosition({ top: y, left: x });
    setTimesClicked((prevTimesClicked: number) => prevTimesClicked + 1);

    if (timesClicked >= 5 && timesClicked < 11) {
      setButtonText("seriously, don't click me");
    } else if (timesClicked >= 11 && timesClicked <= 16) {
      setButtonText("I said: do NOT click me");
    } else if (timesClicked >= 16 && timesClicked <= 21) {
      setButtonText("DO NOT CLICK ME!!!");
    } else if (timesClicked >= 21 && timesClicked <= 26) {
      setButtonText("please don't click me pwetty pwease 🥺");
    } else if (timesClicked >= 26 && timesClicked <= 31) {
      setButtonText("🙁🙁🙁");
    } else if (timesClicked >= 31 && timesClicked <= 36) {
      setButtonText("you're hurting me :(");
    } else if (timesClicked > 36) {
      setButtonText("Okay, you won... 😐");
    }
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
        <>{message()}</>
        <button
          onClick={moveButton}
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
            height: `${buttonHeight}`,
            width: `${buttonWidth}`,
            transition: `all 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
          }}
          className={`rounded-full absolute bg-red-500 border-b-4 border-red-700 hover:bg-red-400 active:border-b-0 active:mt-1 shadow-lg active:shadow-inner cursor-pointer`}
        ></button>
      </div>
    </main>
  );
};

export default DoNotClickMe;
