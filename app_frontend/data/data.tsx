"use client"; // <-- needed in App Router for client-side interactivity

import React, { createContext, useContext, useState, ReactNode, useRef } from "react";
import { ApiClient } from "./apiClient";

// 🔹 Define context type
interface DataContextType {
    apiClient: React.RefObject<ApiClient>
}

// 🔹 Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// 🔹 Provider
export const DataProvider = ({ children }: { children: ReactNode }) => {
    
    const apiClient = useRef(
        new ApiClient("https://zeg08w2po8.execute-api.us-east-1.amazonaws.com/prod", {
            Authorization: "Bearer token",
        })
    );

  return (
    <DataContext.Provider
      value={{
        apiClient,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// 🔹 Custom hook for easier usage
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};