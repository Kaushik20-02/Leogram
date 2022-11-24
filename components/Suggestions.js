import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(
      [...Array(5)].map((profile) => ({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
    );
  }, []);
  console.log(suggestions);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between ">
        <p className="text-sm font-semibold text-gray-400 mt-1">
          Suggestions for you
        </p>
        <button className="font-semibold text-xs">See All</button>
      </div>

      {suggestions.map((profile) => (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <div className="w-8 h-8 ">
              <img src={profile.avatar} alt="" className="
              border-[3px] border-[#b368ff] rounded-full" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold">{profile.username}</p>
              <p className="text-xs text-gray-500">Suggested for you</p>
            </div>
          </div>
          <button className="text-xs font-semibold
           text-[#b368ff]">Follow</button>
        </div>
      ))}

      <div className="flex flex-wrap text-xs mt-6 
      text-semibold text-[#dcb9fe] gap-2">
        <p>About</p>
        <span>.</span>
        <p>Privacy</p>
        <span>.</span>
        <p>Language</p>
        <span>.</span>
        <p>Terms</p>
        <span>.</span>
        <p>Help</p>
        <span>.</span>
        <p>Locations</p>
      </div>
      <div className="text-sm mt-6 text-semibold text-[#d2d2d2]">
        <p>--Project id:Leo</p>
        <p>--Developer Rio</p>
      </div>
    </div>
  );
};

export default Suggestions;