"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Volume2, VolumeX, Sparkles } from "lucide-react"

type Point = { x: number; y: number }
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

export function SnakeGame() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Grid config matching Ownpath.com exactly:
  // Desktop: 7 rows, dynamic columns based on width
  // Mobile: 6 rows
  const [gridRows, setGridRows] = useState(7)
  const [gridCols, setGridCols] = useState(14)
  const [isAutonomous, setIsAutonomous] = useState(true) // Starts autonomous just like ownpath!
  const [hasStarted, setHasStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const [snake, setSnake] = useState<Point[]>([
    { x: 4, y: 3 },
    { x: 3, y: 3 },
    { x: 2, y: 3 },
  ])
  const [food, setFood] = useState<Point>({ x: 8, y: 3 })

  const directionRef = useRef<Direction>("RIGHT")
  const isAutonomousRef = useRef<boolean>(true)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("prax_snake_record")
      if (saved) setHighScore(parseInt(saved, 10))
    } catch {}
  }, [])

  // Responsive grid calculation based on container width (Ownpath ResizeObserver logic)
  useEffect(() => {
    const updateGrid = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth
      const isMobile = window.innerWidth < 768
      const cellStep = isMobile ? 36 : 56 // size + gap
      const cols = Math.max(8, Math.min(18, Math.floor((width - 40) / cellStep)))
      const rows = isMobile ? 6 : 7
      setGridCols(cols)
      setGridRows(rows)
    }

    updateGrid()
    window.addEventListener("resize", updateGrid)
    return () => window.removeEventListener("resize", updateGrid)
  }, [])

  // Play subtle audio beep
  const playBeep = useCallback((freq: number, duration: number) => {
    if (!soundEnabled) return
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") ctx.resume()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      const now = ctx.currentTime
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, now)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.linearRampToValueAtTime(0.001, now + duration)
      osc.start(now)
      osc.stop(now + duration)
    } catch {}
  }, [soundEnabled])

  // Random food placement
  const spawnFood = useCallback((currentSnake: Point[], cols: number, rows: number) => {
    let newFood: Point
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      }
      if (!currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y)) break
    }
    return newFood
  }, [])

  // Autonomous pathfinding towards food (Ownpath ambient crawl)
  const getAutonomousDirection = (head: Point, target: Point, currentDir: Direction, body: Point[], cols: number, rows: number): Direction => {
    const options: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"]
    
    // Disallow 180 turn
    const valid = options.filter((dir) => {
      if (dir === "UP" && currentDir === "DOWN") return false
      if (dir === "DOWN" && currentDir === "UP") return false
      if (dir === "LEFT" && currentDir === "RIGHT") return false
      if (dir === "RIGHT" && currentDir === "LEFT") return false

      let nextX = head.x
      let nextY = head.y
      if (dir === "UP") nextY -= 1
      if (dir === "DOWN") nextY += 1
      if (dir === "LEFT") nextX -= 1
      if (dir === "RIGHT") nextX += 1

      // avoid walls
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) return false
      // avoid self
      if (body.some((b) => b.x === nextX && b.y === nextY)) return false
      return true
    })

    if (valid.length === 0) return currentDir

    // Pick move that reduces distance to target
    valid.sort((a, b) => {
      const getDist = (dir: Direction) => {
        let nx = head.x
        let ny = head.y
        if (dir === "UP") ny -= 1
        if (dir === "DOWN") ny += 1
        if (dir === "LEFT") nx -= 1
        if (dir === "RIGHT") nx += 1
        return Math.hypot(nx - target.x, ny - target.y)
      }
      return getDist(a) - getDist(b)
    })

    return valid[0]
  }

  // Handle Player Inputs (Instantly switches off Autonomous mode!)
  const takePlayerControl = (newDir: Direction) => {
    if (isAutonomousRef.current) {
      isAutonomousRef.current = false
      setIsAutonomous(false)
      setHasStarted(true)
      setScore(0)
    }

    const current = directionRef.current
    if (newDir === "UP" && current !== "DOWN") directionRef.current = "UP"
    if (newDir === "DOWN" && current !== "UP") directionRef.current = "DOWN"
    if (newDir === "LEFT" && current !== "RIGHT") directionRef.current = "LEFT"
    if (newDir === "RIGHT" && current !== "LEFT") directionRef.current = "RIGHT"

    if (isGameOver) {
      resetGame()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d"].includes(e.key)) {
        // Prevent window scroll when interacting with game
        const gameEl = document.getElementById("game")
        if (gameEl) {
          const rect = gameEl.getBoundingClientRect()
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            e.preventDefault()
          }
        }
      }

      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") takePlayerControl("UP")
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") takePlayerControl("DOWN")
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") takePlayerControl("LEFT")
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") takePlayerControl("RIGHT")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isGameOver, gridCols, gridRows])

  // Reset Game
  const resetGame = () => {
    const initial = [
      { x: 4, y: 3 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
    ]
    setSnake(initial)
    directionRef.current = "RIGHT"
    setFood(spawnFood(initial, gridCols, gridRows))
    setScore(0)
    setIsGameOver(false)
    setHasStarted(true)
    isAutonomousRef.current = false
    setIsAutonomous(false)
  }

  // Pause tick loop when footer is offscreen to eliminate unnecessary CPU load
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Main Game Loop (relaxed, comfortable speed as requested)
  useEffect(() => {
    if (!isInView || isGameOver) return

    const tickInterval = isAutonomous ? 190 : Math.max(160, 200 - Math.floor(score / 50) * 5)

    const timer = setInterval(() => {
      if (isGameOver) return

      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] }
        let currentDir = directionRef.current

        // If in autonomous ambient mode, calculate next move
        if (isAutonomousRef.current) {
          currentDir = getAutonomousDirection(head, food, currentDir, prevSnake.slice(1), gridCols, gridRows)
          directionRef.current = currentDir
        }

        if (currentDir === "UP") head.y -= 1
        if (currentDir === "DOWN") head.y += 1
        if (currentDir === "LEFT") head.x -= 1
        if (currentDir === "RIGHT") head.x += 1

        // Autonomous mode wraps around walls for endless ambient animation
        if (isAutonomousRef.current) {
          if (head.x < 0) head.x = gridCols - 1
          if (head.x >= gridCols) head.x = 0
          if (head.y < 0) head.y = gridRows - 1
          if (head.y >= gridRows) head.y = 0
        } else {
          // Player mode: Wall collision
          if (head.x < 0 || head.x >= gridCols || head.y < 0 || head.y >= gridRows) {
            handleGameOver()
            return prevSnake
          }
          // Self collision
          if (prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
            handleGameOver()
            return prevSnake
          }
        }

        const newSnake = [head, ...prevSnake]

        // Food eaten
        if (head.x === food.x && head.y === food.y) {
          playBeep(440, 0.08)
          if (!isAutonomousRef.current) {
            const nextScore = score + 10
            setScore(nextScore)
            if (nextScore > highScore) {
              setHighScore(nextScore)
              try {
                localStorage.setItem("prax_snake_record", nextScore.toString())
              } catch {}
            }
          }
          setFood(spawnFood(newSnake, gridCols, gridRows))
          return newSnake
        }

        newSnake.pop()
        return newSnake
      })
    }, tickInterval)

    return () => clearInterval(timer)
  }, [isInView, isAutonomous, isGameOver, food, gridCols, gridRows, score, highScore, spawnFood, playBeep])

  const handleGameOver = () => {
    setIsGameOver(true)
    playBeep(180, 0.25)
  }

  return (
    <div id="game" className="w-full select-none mb-16">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-rosnoc font-bold text-white tracking-tight">
            Snake
          </h3>
          <p className="text-xs font-eurostile text-neutral-400 mt-1">
            {isAutonomous
              ? "Autonomous crawl. Use arrow keys or WASD to play."
              : "Arrow keys or WASD to steer."}
          </p>
        </div>

        {/* Minimalist Score & Sound Controls */}
        <div className="flex items-center gap-3 font-eurostile text-xs">
          <div className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center gap-2">
            <span className="text-neutral-500 font-normal">Score</span>
            <span className="font-bold">{score}</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-[#660033]/40 border border-[#660033] text-[#ff80bf] flex items-center gap-2">
            <span className="text-neutral-400 font-normal">Record</span>
            <span className="font-bold">{highScore}</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
            title={soundEnabled ? "Mute audio" : "Enable audio"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#ff80bf]" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Grid Arena */}
      <div
        ref={containerRef}
        className="w-full bg-neutral-950 rounded-3xl border border-neutral-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] sm:min-h-[420px]"
      >
        {/* Game Over Overlay */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
            >
              <h4 className="text-2xl sm:text-3xl font-rosnoc font-bold tracking-tight text-white mb-2">
                Score: {score}
              </h4>
              <p className="text-xs font-eurostile text-neutral-400 max-w-xs mb-6">
                {score >= highScore && score > 0
                  ? "New personal record!"
                  : "Good run. Press below to try again."}
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-2.5 rounded-full bg-[#660033] hover:bg-[#800040] text-white text-xs font-rosnoc font-bold tracking-wider uppercase shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Grid of Rounded Cells */}
        <div
          className="grid gap-2 sm:gap-2.5 p-2 select-none"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
          }}
        >
          {[...Array(gridRows * gridCols)].map((_, i) => {
            const x = i % gridCols
            const y = Math.floor(i / gridCols)

            const isHead = snake[0]?.x === x && snake[0]?.y === y
            const isBody = snake.slice(1).some((s) => s.x === x && s.y === y)
            const isFood = food.x === x && food.y === y

            return (
              <div
                key={i}
                className={`w-7 h-7 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl transition-all duration-150 flex items-center justify-center ${
                  isHead
                    ? "bg-white shadow-lg scale-105"
                    : isBody
                    ? "bg-white/80 scale-95"
                    : isFood
                    ? "bg-[#660033] shadow-lg scale-100 ring-2 ring-[#ff4d94]/60"
                    : "bg-neutral-900/60 border border-neutral-800/40"
                }`}
              >
                {isFood && (
                  <span className="w-2 h-2 rounded-full bg-white opacity-90 animate-pulse" />
                )}
                {isHead && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black opacity-80" />
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Arrow Controls */}
        <div className="mt-6 flex items-center justify-between w-full max-w-xs px-2 sm:hidden z-10">
          <button
            onClick={() => resetGame()}
            className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-eurostile text-neutral-300"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => takePlayerControl("UP")}
              className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 active:bg-[#660033] text-white flex items-center justify-center shadow-xs"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              <button
                onClick={() => takePlayerControl("LEFT")}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 active:bg-[#660033] text-white flex items-center justify-center shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => takePlayerControl("DOWN")}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 active:bg-[#660033] text-white flex items-center justify-center shadow-xs"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => takePlayerControl("RIGHT")}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 active:bg-[#660033] text-white flex items-center justify-center shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
