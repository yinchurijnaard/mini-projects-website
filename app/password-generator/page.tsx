"use client";

import { useEffect, useState } from "react";

// To Do / Check
// - Add az-AZ
// - Elements: horizontal on big screen, vertical on small screen
// - Change buttons/inputs/etc to daisyUI components
// - Ask AI about what I just remembered, naming constants in all caps?
// - Add a copy button (navigator.clipboard.writeText(password))
// - Use useEffect to trigger it every time a checkbox is toggled
// - Use useEffect to trigger it while sliding the slider
// - Find a solutio for the following temp. fix:   // eslint-disable-next-line react-hooks/exhaustive-deps (the useEffect error)

// The logic / flow

// For my own sanity: by default generate random letters both lowercaes and uppercase

// Things useState needs to track
// - length
// - includeNumbers
// - includeSymbols
// - result

// Master Pool
// - Array which starts empty
// - if includeNumbers = true --> append '0123456789'
// - if includeSymbols = true --> append '!@#$%^&*'

// Pick and Pull loop
// - Create empty string for the password
// - Use a for loop that iterates based on the state of length
// - Inside the loop, ue Math.random() to pick a random index from the Master Pool
// - Grab the character at that index and append it to the password string

// React trigger
// - Wrap logic in a generatePassword function
// - Fire the function whenever the generate button is clicked
// - Use useEffect to trigger it every time a checkbox is toggled
// - Use Math.floor() to get a whole number

import TitleCard from "../components/TitleCard";

const PasswordGenerator = () => {
  // useState
  const [length, setLength] = useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  // useEffect
  // Basic syntax
  // useEffect(() => {
  //   // 1. The action
  //   // Call existing generatePassword function here
  // }, [/* 2. The dependencies */])

  // Generate password function
  const generatePassword = () => {
    let charset: string = "abcdefghijklmnopqrestuvwxyz";

    if (includeNumbers) {
      charset += "0123456789";
    }

    if (includeSymbols) {
      charset += "!@#$%^&*";
    }

    let generatedPassword: string = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);

      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
  };

  // useEffect
  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);

    alert("Password has been copied");
  };

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🤖 Password Generator 🔒"} />

      {/* Password Generator design - for now */}
      <div className="border-2 p-2 m-2 border-sky-500 flex flex-col gap-2">
        <p>{length}</p>
        <input
          type="range"
          min="10"
          max="30"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />

        <label className="flex gap-2 border-2 border-pink-500">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <span>Include numbers</span>
        </label>

        <label className=" flex gap-2 border-2 border-teal-500">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <span>Include symbols</span>
        </label>

        <div className="bg-violet-500 text-white flex flex-col gap-2 items-center justify-center">
          <p>Your password</p>
          <p>{password}</p>
          <button onClick={handleCopy} className="bg-yellow-500 text-white">
            Copy
          </button>
        </div>
      </div>
    </main>
  );
};

export default PasswordGenerator;
