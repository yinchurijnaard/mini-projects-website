import Link from "next/link";

// To Do / Check
// - Create a navbar
// - Render the links instead of hardcoding them
// - Create project cards instead of displaying links

// Other mini project ideas
// - Color generator
// - Meme generator using the Giphy API
// - Weather app using the OpenWeather API

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
