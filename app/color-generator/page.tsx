"use client";

import { useEffect, useState } from "react";

// To Do / Check
// - useState error?
// - Make color change on spacebar tap (event listener to the entire window or document (use useEffect), mount and unmount, id check such that it only works when the space is pressed. Use preventDefault() as well)

import TitleCard from "../components/TitleCard";

const ColorGenerator = () => {
  const [hexCode, setHexCode] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const generateRandomColor = () => {
    const charset: string = "0123456789ABCDEF";

    let generatedHexCode: string = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = charset[Math.floor(Math.random() * charset.length)];

      generatedHexCode += randomIndex;
    }

    const finalGeneratedHexCode = "#" + generatedHexCode;

    setHexCode(finalGeneratedHexCode);
  };

  useEffect(() => {
    generateRandomColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(hexCode);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Dark / White text for Dark / White colors
  const getContrast = (hexCode: string) => {
    const r = parseInt(hexCode.slice(1, 3), 16);
    const g = parseInt(hexCode.slice(3, 5), 16);
    const b = parseInt(hexCode.slice(5, 7), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance < 128) {
      return "text-neutral-100";
    } else {
      return "text-neutral-900";
    }
  };

  const setBackgroundColor = getContrast(hexCode);

  return (
    <main className="h-screen min-h-full flex flex-col">
      <TitleCard title={"🎨 Colour Generator 🌈"} />

      <div
        className={`${setBackgroundColor} w-screen h-screen flex flex-col gap-12 items-center pt-12`}
        style={{ backgroundColor: hexCode }}
      >
        <button className="btn btn-outline w-fit" onClick={generateRandomColor}>
          Generate a new random colour
        </button>
        <button className="btn btn-outline w-fit" onClick={handleCopy}>
          {isCopied ? "Copied!" : "Copy HEX code"}
        </button>
      </div>
    </main>
  );
};

export default ColorGenerator;
