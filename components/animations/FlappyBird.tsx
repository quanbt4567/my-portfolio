"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const GRAVITY = 0.6;
const JUMP = -8;
const PIPE_SPEED = 3;
const PIPE_WIDTH = 50;
const PIPE_GAP = 150;
const BIRD_SIZE = 30;
const GAME_WIDTH = 400; // max width
const GAME_HEIGHT = 450;

type GameState = "START" | "PLAYING" | "GAME_OVER";

interface Pipe {
  x: number;
  topHeight: number;
  passed: boolean;
}

export const FlappyBird = () => {
  const [gameState, setGameState] = useState<GameState>("START");
  const [birdPos, setBirdPos] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);

  // Load high score from local storage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("flappyHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const jump = useCallback(() => {
    if (gameState === "PLAYING") {
      setBirdVelocity(JUMP);
    } else if (gameState === "START" || gameState === "GAME_OVER") {
      // Start game
      setGameState("PLAYING");
      setBirdPos(GAME_HEIGHT / 2);
      setBirdVelocity(JUMP);
      setPipes([]);
      setScore(0);
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const gameLoop = (time: number) => {
      const deltaTime = time - lastTime;
      // Normalizing to roughly 60fps for consistency
      const timeScale = Math.min(deltaTime / (1000 / 60), 2);
      lastTime = time;

      if (gameState === "PLAYING") {
        setBirdPos((prev) => {
          let newPos = prev + birdVelocity * timeScale;
          // Floor collision
          if (newPos >= GAME_HEIGHT - BIRD_SIZE) {
            newPos = GAME_HEIGHT - BIRD_SIZE;
            setGameState("GAME_OVER");
          }
          // Ceiling collision
          if (newPos <= 0) {
            newPos = 0;
            setBirdVelocity(0); // Optional: hit head and fall
          }
          return newPos;
        });

        setBirdVelocity((prev) => prev + GRAVITY * timeScale);

        setPipes((prevPipes) => {
          let newPipes = prevPipes.map((pipe) => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED * timeScale,
          }));

          // Spawn new pipe
          if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 200) {
            const minHeight = 50;
            const maxHeight = GAME_HEIGHT - PIPE_GAP - minHeight;
            const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
            newPipes.push({
              x: GAME_WIDTH,
              topHeight,
              passed: false,
            });
          }

          // Check collisions and scoring
          let currentScore = score;
          let hit = false;

          newPipes = newPipes.filter((pipe) => {
            // Collision detection
            const birdRect = {
              left: 50, // Fixed horizontal pos
              right: 50 + BIRD_SIZE,
              top: birdPos,
              bottom: birdPos + BIRD_SIZE,
            };

            const topPipeRect = {
              left: pipe.x,
              right: pipe.x + PIPE_WIDTH,
              top: 0,
              bottom: pipe.topHeight,
            };

            const bottomPipeRect = {
              left: pipe.x,
              right: pipe.x + PIPE_WIDTH,
              top: pipe.topHeight + PIPE_GAP,
              bottom: GAME_HEIGHT,
            };

            // Hit logic
            if (
              (birdRect.right > topPipeRect.left &&
                birdRect.left < topPipeRect.right &&
                birdRect.top < topPipeRect.bottom) ||
              (birdRect.right > bottomPipeRect.left &&
                birdRect.left < bottomPipeRect.right &&
                birdRect.bottom > bottomPipeRect.top)
            ) {
              hit = true;
            }

            // Score logic
            if (pipe.x + PIPE_WIDTH < birdRect.left && !pipe.passed) {
              pipe.passed = true;
              currentScore += 1;
            }

            return pipe.x + PIPE_WIDTH > 0;
          });

          if (currentScore > score) {
            setScore(currentScore);
          }

          if (hit) {
            setGameState("GAME_OVER");
          }

          return newPipes;
        });
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, birdVelocity, birdPos, score]);

  // Handle game over logic
  useEffect(() => {
    if (gameState === "GAME_OVER") {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("flappyHighScore", score.toString());
      }
    }
  }, [gameState, score, highScore]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="flex justify-between w-full px-4 mb-2 text-zinc-600 dark:text-zinc-400 font-bold">
        <div className="text-xl">Score: {score}</div>
        <div className="flex items-center gap-2 text-xl text-yellow-500">
          <Trophy size={20} /> {highScore}
        </div>
      </div>
      <div
        ref={gameRef}
        onClick={jump}
        className="relative w-full overflow-hidden bg-sky-200 dark:bg-sky-950 rounded-2xl border-4 border-zinc-200 dark:border-zinc-800 shadow-2xl cursor-pointer select-none"
        style={{ height: GAME_HEIGHT, maxWidth: GAME_WIDTH }}
      >
        {/* Bird */}
        <motion.div
          className="absolute rounded-full bg-yellow-400 border-2 border-white shadow-md flex items-center justify-center text-[10px]"
          style={{
            left: 50,
            top: birdPos,
            width: BIRD_SIZE,
            height: BIRD_SIZE,
            rotate: birdVelocity * 4,
          }}
          animate={{ rotate: birdVelocity * 4 }}
          transition={{ type: "tween", duration: 0.1 }}
        >
          <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full">
            <div className="absolute right-0 top-0.5 w-1 h-1 bg-black rounded-full" />
          </div>
          <div className="absolute -right-1 bottom-1 w-3 h-2 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <React.Fragment key={i}>
            <div
              className="absolute bg-green-500 border-2 border-green-700"
              style={{
                left: pipe.x,
                top: 0,
                width: PIPE_WIDTH,
                height: pipe.topHeight,
              }}
            >
              <div className="absolute bottom-0 w-[110%] -left-[5%] h-6 bg-green-500 border-2 border-green-700 rounded-t-sm" />
            </div>
            <div
              className="absolute bg-green-500 border-2 border-green-700"
              style={{
                left: pipe.x,
                top: pipe.topHeight + PIPE_GAP,
                width: PIPE_WIDTH,
                bottom: 0,
              }}
            >
              <div className="absolute top-0 w-[110%] -left-[5%] h-6 bg-green-500 border-2 border-green-700 rounded-b-sm" />
            </div>
          </React.Fragment>
        ))}

        {/* Start / Game Over Overlays */}
        {gameState !== "PLAYING" && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-white p-6 text-center">
            {gameState === "START" ? (
              <>
                <Play size={48} className="mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-2">Flappy Dev</h3>
                <p className="text-zinc-200">Click or Press Space to Jump</p>
              </>
            ) : (
              <>
                <RotateCcw size={48} className="mb-4 text-white" />
                <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                <p className="text-zinc-200 mb-4">Score: {score}</p>
                <p className="text-sm text-zinc-300">Click to restart</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
