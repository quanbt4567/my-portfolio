"use client";

export const ShinyText = ({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) => {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent bg-[linear-gradient(110deg,#a1a1aa,45%,#fff,55%,#a1a1aa)] bg-[length:200%_100%] animate-shimmer dark:bg-[linear-gradient(110deg,#52525b,45%,#fff,55%,#52525b)] ${className}`}
    >
      {text}
    </span>
  );
};
