"use client";

import { useEffect, useState } from "react";

// To Do / Check
// - Find a solutio for the following temp. fix:   // eslint-disable-next-line react-hooks/exhaustive-deps (the useEffect error)

import TitleCard from "../components/TitleCard";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let charset: string =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const getStrength = () => {
    if (length < 11)
      return {
        label: "Your password is weak",
        color: "text-red-500",
        slider: "text-red-500",
      };
    if (length < 20)
      return {
        label: "Your password is average",
        color: "text-orange-500",
        slider: "text-orange-500",
      };
    if (length < 30)
      return {
        label: "Your password is strong",
        color: "text-green-500",
        slider: "text-green-500",
      };
    return {
      label: "Who are you afraid of?",
      color: "text-green-500",
      slider: "text-green-500",
    };
  };

  const strength = getStrength();

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🤖 Password Generator 🔒"} />

      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        <p className="font-bold">Password length: {length}</p>
        <input
          type="range"
          min="10"
          max="50"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className={`${strength.slider} range w-full`}
        />

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="checkbox"
          />
          <span>Include numbers</span>
        </label>

        <label className=" flex gap-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="checkbox"
          />
          <span>Include symbols</span>
        </label>
      </div>

      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded border-2 border-main-border">
        <p className="font-bold">Your password:</p>
        <p className="font-mono break-all">{password}</p>
        <p className={`${strength.color}`}>{strength.label}</p>
        <button
          onClick={handleCopy}
          className={`${isCopied ? "text-green-500" : ""} btn btn-outline w-fit`}
        >
          {isCopied ? "Copied!" : "Copy password"}
        </button>
      </div>
    </main>
  );
};

export default PasswordGenerator;
