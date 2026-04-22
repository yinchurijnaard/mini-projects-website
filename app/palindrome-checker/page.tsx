"use client";

import { ChangeEvent, useState } from "react";

// To Do / Check
// - Save to localStorage?
// localStorage.setItem("savedInput", inputValue);

const PalindromeChecker = () => {
  // Set state
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<React.ReactNode>(null);

  // Capture user input value and only allow characters (a-zA-Z)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/[^a-zA-Z0-9]/g, ""));
  };

  // Check if user input value is a palindrome
  const handleSave = () => {
    const result = inputValue.toLowerCase().split("").reverse().join("");

    if (inputValue === result) {
      setResult(<p>{result} is a palindrome! 😃</p>);
    } else {
      setResult(<p>{result} is not a palindrome! 🙁</p>);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-sky-100">
      {/* Turn it into a reusable component? */}
      <h1 className="p-2 font-mono text-4xl text-center">
        🌮 Palindrome Checker 🐈
      </h1>

      {/* Palindrome Checker */}
      <div className="h-screen w-full flex flex-col gap-8 items-center p-4">
        {/* Definition card */}
        <div className="bg-neutral-200 rounded p-4 flex flex-col gap-2">
          <p className="font-serif font-bold text-2xl">palindrome</p>
          <p className="text-neutral-500">noun</p>
          <p>pal•in•drome</p>
          <p>
            a word, verse, or sentence &#40;such as &quot;Able was I ere I saw
            Elba&quot;&#41; or a number &#40;such as 1881&#41; that reads the
            same backward or forward
          </p>
        </div>

        {/* Change this input field to a daisyUI input field */}
        <div className="flex flex-col gap-2 items-center">
          <p>Check your word or phrase:</p>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Begin typing..."
            className="border-2 border-neutral-500 p-2 rounded"
          />
        </div>

        {/* Change this button to a daisyUI button */}
        <button
          type="submit"
          onClick={handleSave}
          disabled={inputValue.length <= 2}
          className="bg-green-400 w-fit py-2 px-4 rounded text-white font-bold"
        >
          Check
        </button>

        {/* Divider */}
        <hr className="text-neutral-500 w-1/2" />

        {/* Output */}
        <div className="border-2 border-neutral-500 p-4 rounded w-1/2 h-1/6">
          <p className="font-bold">Result:</p>
          <p>{result}</p>
        </div>
      </div>
    </main>
  );
};

export default PalindromeChecker;
