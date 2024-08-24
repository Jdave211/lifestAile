import React from "react";

const searchBar = () => {
  return (
    <>
      <form class="max-w-md mx-auto">
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-6 text-sm text-[#FFFFFF] border border-[#FFFFFF] rounded-3xl bg-transparent  dark:placeholder-[#FFFFFF] dark:text-white "
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default searchBar;
