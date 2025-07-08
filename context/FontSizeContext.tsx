// FontSizeContext.tsx
import React, { createContext, useContext, useState } from "react";

type FontSizeContextType = {
  fontSize: number;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFont = () => setFontSize((size) => Math.min(size + 2, 36));
  const decreaseFont = () => setFontSize((size) => Math.max(size - 2, 12));
  const resetFont = () => setFontSize(16);

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFont, decreaseFont, resetFont }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) throw new Error("useFontSize must be used within FontSizeProvider");
  return context;
};
