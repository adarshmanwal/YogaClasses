import React from "react";
import logoimge from "../assets/channel-2.jpg";
import searchIcon from "../assets/icons/search.svg";
import thumbnail from "../assets/thumbnail-1.webp";
export default function Home() {
  return (
    <>
      <div className="h-[55px] border-b border-gray-200 flex justify-between items-center px-4">
        <div className="flex items-center"></div>

        <div className="flex flex-1 max-w-[500px] mx-16 items-center">
          <input
            className="flex-1 h-9 px-2 text-base border border-gray-400 rounded-sm shadow-inner outline-none"
            type="text"
            placeholder="Search Shop"
          />
          <button className="h-10 w-[66px] bg-gray-200 border border-gray-400 flex items-center justify-center ml-[-1px] mr-2 relative">
            Search
          </button>
        </div>

        <div className="w-[180px] flex items-center justify-between shrink-0 mr-5">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Add Shop
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 m-1 m-11">
        <div className="w-full md:w-1/3">
          <div className="relative mb-2">
            <img className="w-full" src={thumbnail} alt="Thumbnail" />
            <div className="absolute bottom-2 right-1 bg-black text-white text-xs font-medium px-1.5 py-0.5 rounded">
              14:20
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <img
                className="w-9 h-9 rounded-full"
                src={logoimge}
                alt="Channel"
              />
            </div>
            <div>
              <p className="mt-0 text-sm font-medium leading-5 mb-2">
                Talking Tech and AI with Google CEO Sundar Pichai!
              </p>
              <p className="text-xs text-gray-600 mb-1">Marques Brownlee</p>
              <p className="text-xs text-gray-600">3.4M views · 6 months ago</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="relative mb-2">
            <img className="w-full" src={thumbnail} alt="Thumbnail" />
            <div className="absolute bottom-2 right-1 bg-black text-white text-xs font-medium px-1.5 py-0.5 rounded">
              14:20
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <img
                className="w-9 h-9 rounded-full"
                src={logoimge}
                alt="Channel"
              />
            </div>
            <div>
              <p className="mt-0 text-sm font-medium leading-5 mb-2">
                Talking Tech and AI with Google CEO Sundar Pichai!
              </p>
              <p className="text-xs text-gray-600 mb-1">Marques Brownlee</p>
              <p className="text-xs text-gray-600">3.4M views · 6 months ago</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="relative mb-2">
            <img className="w-full" src={thumbnail} alt="Thumbnail" />
            <div className="absolute bottom-2 right-1 bg-black text-white text-xs font-medium px-1.5 py-0.5 rounded">
              14:20
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <img
                className="w-9 h-9 rounded-full"
                src={logoimge}
                alt="Channel"
              />
            </div>
            <div>
              <p className="mt-0 text-sm font-medium leading-5 mb-2">
                Talking Tech and AI with Google CEO Sundar Pichai!
              </p>
              <p className="text-xs text-gray-600 mb-1">Marques Brownlee</p>
              <p className="text-xs text-gray-600">3.4M views · 6 months ago</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
