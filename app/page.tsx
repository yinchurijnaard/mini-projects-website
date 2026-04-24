import Link from "next/link";

import { links } from "./constants/navigation";

// To Do / Check
// - Create project cards instead of displaying links (use daisyUI for mockups, create a short screen recording of the app, turn into a GIF)

// Other mini project ideas
// - Weather app using the OpenWeather API

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-2xl sm:text-4xl text-center">
        Mini Projects - by Yin Chu Rijnaard
      </h1>
      <h2 className="text-xl sm:text-3xl">Projects:</h2>
      <div className="flex flex-col">
        {links.map((link) => {
          return (
            <Link key={link.href} href={link.href} className="underline">
              {link.name}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
