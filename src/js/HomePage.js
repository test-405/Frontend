import React, { useState, useId } from "react";
import SearchPage from "./SearchPage";
import AddLibrary from "./components/AddLibrary";

export default function HomePage() {

  return (
    // <div className="w-1/5 h-full bg-gray-500">
    <div className="relative">
      <div className="sticky left-0 top-0">
        <SearchPage />
      </div>
      
    </div>
    
  )

}