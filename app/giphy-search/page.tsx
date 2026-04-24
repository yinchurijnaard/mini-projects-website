"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import TitleCard from "../components/TitleCard";

// To Do / Check
// - Add "get a random GIF" button next to the seach bar?
// - Users can add @ before the username (?) to search more specifically? Does that impact how I should build the search function??? (See GIPHY Docs)
// - Show a GIF by default
// - Modal for when a user clicks/taps on a GIF
// - Modal: copy link feature
// - Search by predetermined searches (such as funny, animals, cute)

// Logic / Flow
// INITIAL LOAD
// - Trigger: when the component first mounts
// - Action: call the GIPHY Trending endpoint
// - Result: show popular GIFs

// SEARCH MONITOR
// - Observer: use a useEffect that watches search input state (useState?)
// - Gatekeeper: inside this effect, add a conditional that says if the length is less than 3, do nothing. If it's 3 or more, proceed to search
// - Debounce: use a debounce to wait 300-500ms. Waits until you've stopped typing for a split second before hitting the API

// INFINITE SCROLL
// - Offset: GIPHY API uses offset parameter. 20 GIFs per page, first call is offset 0. The next is offset 20, etc
// - Observer: use a sentinel (invisible <div></div>) at the bottom of the list. When that <div> enters the screen, trigger a function to fetch th next batch
// - Merger: instead of replacing the current GIFs, append the new ones to the existing array

// LOADING & FEEDBACK
// - While data is traveling, use skeletons
// - If the user types 'fsdiojfas' for example and nothing comes back, show "No results found"
// - If there's no internet, show "Connection error"

// MODAL
// - Create a modal that opens up when a user taps/clicks on a GIF
// - Add a button to copy the GIF link
// - Add sharing feature on modal???

interface GiphyGif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
      width: number;
      height: number;
    };
  };
}

const breakpointColumnsObj = {
  default: 4, // 4 columns on desktop
  1100: 3, // 3 columns on tablets
  700: 2, // 2 columns on mobile (Exactly what you wanted!)
};

const GiphySearch = () => {
  // useState
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // REVIEW THE BELOW CODE TO MAKE SURE I UNDERSTAND WHAT'S HAPPENING, SUCH THAT I CAN RECREATE THIS NEXT TIME BY MYSELF!!!
  const getGifs = async (searchTerm: string, offset: number = 0) => {
    const apiKey = process.env.NEXT_PUBLIC_GIPHY_SEARCH_API_KEY;
    const limit = 20;

    const endpoint = searchTerm.length >= 3 ? "search" : "trending";

    const queryParam = searchTerm.length >= 3 ? `&q=${searchTerm}` : "";

    const url = `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}&limit=${limit}&offset=${offset}${queryParam}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.log("Fetch failed:", error);
      return [];
    }
  };

  useEffect(() => {
    // We create an internal async function because useEffect is picky
    const fetchData = async () => {
      const data = await getGifs(searchTerm); // searchTerm comes from your useState
      setGifs(data);
    };

    fetchData();
  }, [searchTerm]); // "Re-run this block every time searchTerm changes"

  const GiphyGrid = ({ gifs }) => {
    // Define how many columns for each screen size
  };

  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"👾 GIPHY Search 🔎"} />

      {/* Search bar */}
      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        {/* Searching */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="input p-2"
        />
        <div className="skeleton w-full h-full flex flex-col items-center justify-center">
          <p>Default GIF comes here</p>
        </div>
      </div>

      {/* GIFs resutls */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 border-pink-500 mx-8">
        {gifs.map((gif) => (
          <Masonry
            key={gif.id}
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            <Image
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-full h-auto object-cover"
              width={gif.images.fixed_height.width}
              height={gif.images.fixed_height.height}
              style={{ maxWidth: "100%" }}
            />
          </Masonry>
        ))}
      </div>

      {/* Results <div> */}
    </main>
  );
};

export default GiphySearch;
