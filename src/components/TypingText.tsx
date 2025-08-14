import React, { useState, useEffect } from "react";

export default function TypingText() {
  const words = [
    "Have a great day!",
    "Keep smiling!",
    "Stay positive!",
    "You are amazing!",
    "Believe in yourself!",
    "Make today count!",

  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 120; // kecepatan ketik
  const deletingSpeed = 60; // kecepatan hapus
  const pauseTime = 1000; // jeda sebelum ganti kata

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <h1 className=" inline-block text-transparent bg-clip-text font-bold text-2xl font-sans cursor-pointer"
        style={{
                  backgroundImage:
                    "linear-gradient(270deg, #ec4899, #facc15, #3b82f6, #22c55e, #f43f5e)",
                  backgroundSize: "400% 400%",
                  animation: "slow-gradient 8s ease infinite"
                }}>
      {displayText}
      <span className="animate-pulse">|</span>
    </h1>
  );
}
