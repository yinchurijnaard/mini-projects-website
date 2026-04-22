"use client";

import { ChangeEvent, useState } from "react";
import TitleCard from "../components/TitleCard";

// To Do / Check
// - Fix overflow issue with the results box
// - Turn title card into a reusable component?
// - Save to localStorage?
// localStorage.setItem("savedInput", inputValue);

const PalindromeChecker = () => {
  // Set state
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<React.ReactNode>(null);

  // Capture user input value and only allow characters (a-zA-Z)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ""));
  };

  // Check if user input value is a palindrome
  const handleSave = () => {
    const cleanInput = inputValue.toLowerCase().replace(/\s/g, "");

    const reversedClean = cleanInput.split("").reverse().join("");

    if (cleanInput === reversedClean) {
      setResult(
        <div>
          <span className="font-bold">&quot;{inputValue}&quot;</span> is a
          palindrome! 😃
        </div>,
      );
    } else {
      const reversedOriginal = inputValue.split("").reverse().join("");

      setResult(
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold">&quot;{inputValue}&quot;</span> is not a
            palindrome! 🙁
          </p>
          <p>
            &#40;Reversed:&nbsp;
            <span className="font-bold">&quot;{reversedOriginal}&quot;</span>
            &#41;
          </p>
        </div>,
      );
    }
  };

  return (
    // text-black below, to temp. fix the issue (remove later)
    <main className="h-screen min-h-full flex flex-col gap-12">
      {/* Title */}
      <TitleCard title={"🌮 Palindrome Checker 🐈"} />

      {/* Dictionary card */}
      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        <div className="flex items-end gap-4 font-serif">
          <p className="font-bold text-2xl">palindrome</p>
          <p className="text-sec-text text-xl ">noun</p>
        </div>
        <p className="font-light">pal·​in·​drome</p>
        <p>
          a word, verse, or sentence &#40;such as &quot;Able was I ere I saw
          Elba&quot;&#41; or a number &#40;such as 1881&#41; that reads the same
          backward or forward
        </p>
      </div>

      {/* Checking */}
      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded border-2 border-main-border">
        <p className="font-bold">Check your word or phrase:</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Begin typing..."
          className="input"
        />
        <button
          type="submit"
          onClick={handleSave}
          disabled={inputValue.length <= 2}
          className="btn btn-outline text-green-500 w-fit"
        >
          Check
        </button>
      </div>

      {/* Results */}
      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded border-2 border-main-border">
        <p className="font-bold">Result:</p>
        <div className="wrap-break-word whitespace-normal">{result}</div>
      </div>
    </main>
  );
};

export default PalindromeChecker;
