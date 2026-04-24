"use client";

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

const GiphySearch = () => {
  return (
    <main className="h-screen min-h-full flex flex-col gap-12">
      <TitleCard title={"👾 GIPHY Search 🔎"} />

      {/* Default GIF and search bar <div> */}
      <div className="sm:w-1/2 sm:self-center flex flex-col gap-4 mx-8 p-8 rounded bg-main-border">
        {/* Searching */}
        <input type="text" placeholder="Search..." className="input p-2" />

        {/* Get a random GIF
        <button className="btn btn-outline">Get a random GIF</button> */}

        {/* Default GIFs Skeleton */}
        <div className="skeleton w-full h-full flex flex-col items-center justify-center">
          <p>Default GIF comes here</p>
        </div>
      </div>

      {/* Results <div> */}
    </main>
  );
};

export default GiphySearch;
