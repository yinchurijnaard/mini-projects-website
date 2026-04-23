"use client";

import { useEffect, useState } from "react";

// To Do / Check
// - Add a copy HEX code to clipboard feature
// - Make color change on spacebar tap (event listener to the entire window or document (use useEffect), mount and unmount, id check such that it only works when the space is pressed. Use preventDefault() as well)

// About HEX codes
// A HEX code (like #3A86FF) is just 6 characters chosen from a specific list
// - Numbers: 0123456789
// - Letters: ABCDEF
// - 16 possible characters

// The Logic / Flow
// - Create a Master Pool of those 16 characters
// - Initialize a variable with #
// - Start a loop that runs exactly 6 times
// - Inside the loop, pick one random character from the pool of 16
// - Append the character to the string
// - Once the loop finishes, save that string to state

// The Visual Logic
// - Use inline styles (e.g.: <div className="style={{ backgroundColor: currentColor}}">)
// - Add logic to change the text to white if the background is dark and vice versa

import TitleCard from "../components/TitleCard";

const ColorGenerator = () => {
  const [hexCode, setHexCode] = useState<string>("");

  // Change to let?
  const charset: string = "0123456789ABCDEF";

  // Change to let?
  const hexCodeStart: string = "#";

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"🎨 Colour Generator 🌈"} />

      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        <p>Content</p>
      </div>
    </main>
  );
};

export default ColorGenerator;
