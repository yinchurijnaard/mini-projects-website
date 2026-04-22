import Link from "next/link";

// To Do / Check
// - Install daisyUI
// - Create a navbar
// - Render the links instead of hardcoding them
// - Create project cards instead of displaying links

// Other mini project ideas
// - Color generator
// - Meme generator using the Giphy API
// - Weather app using the OpenWeather API

// IMPORTANT: BECAUSE EVERY PROJECT IS A MINI PROJECT, THE STYLE DOESN'T NEED TO BE CONSISTENT ACROSS PROJECTSS/PAGES!!! :)

// OR

// MAYBE DESIGN IT LIKE I THOUGHT OF RIGHT NOW? THE SAMEM BASE LAYOUT. WITH A THICK BORDER TO INDICATE A DIFFERENT PROJECT. BUT WITIHIN IT, I CAN STYLE IT DIFFERENTLY? HMMM...

export default function Home() {
  return (
    <main className="">
      <h1 className="text-2xl">Projects:</h1>
      <div className="flex flex-col">
        <Link href="/palindrome-checker" className="underline">
          Palindrome Checker
        </Link>
        <Link href="/password-generator" className="underline">
          Password Generator
        </Link>
      </div>
    </main>
  );
}
