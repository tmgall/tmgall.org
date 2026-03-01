import { useEffect, useRef } from 'react'

const WALKER_COLORS = ['#d4a574', '#79b8ff']
const GRID_SIZE = 400
const STEPS_PER_FRAME = 3000
const PAUSE_MS = 500
const MORPH_TUBE_MS = 1400
const TUBE_HOLD_MS = 500
const MORPH_TORUS_MS = 1600
const TORUS_HOLD_MS = 1200

function RandomWalkDemo() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapRef.current
    if (!canvas || !wrapper) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const totalCells = GRID_SIZE * GRID_SIZE
    const owners = new Int8Array(totalCells).fill(-1)
    const walkers = WALKER_COLORS.map((color, index) => ({
      color,
      x: index === 0 ? Math.floor(GRID_SIZE * 0.25) : Math.floor(GRID_SIZE * 0.75),
      y: Math.floor(GRID_SIZE / 2),
    }))
    let coloredCount = 0
    let phase = 'walk'
    let phaseStartAt = 0

    let rafId = 0
    let cell = 0
    let offsetX = 0
    let offsetY = 0

    const resize = () => {
      const bounds = wrapper.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      const width = Math.max(1, Math.floor(bounds.width))
      const height = Math.max(1, Math.floor(bounds.height))
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      cell = Math.min((width - 4) / GRID_SIZE, (height - 4) / GRID_SIZE)
      offsetX = (width - cell * GRID_SIZE) / 2
      offsetY = (height - cell * GRID_SIZE) / 2
    }

    const paintCellIfEmpty = (x, y, walkerIndex) => {
      const index = y * GRID_SIZE + x
      if (owners[index] !== -1) return
      owners[index] = walkerIndex
      coloredCount += 1
    }

    const resetBoard = () => {
      owners.fill(-1)
      coloredCount = 0
      phase = 'walk'
      phaseStartAt = 0
      walkers[0].x = Math.floor(GRID_SIZE * 0.25)
      walkers[0].y = Math.floor(GRID_SIZE / 2)
      walkers[1].x = Math.floor(GRID_SIZE * 0.75)
      walkers[1].y = Math.floor(GRID_SIZE / 2)
      paintCellIfEmpty(walkers[0].x, walkers[0].y, 0)
      paintCellIfEmpty(walkers[1].x, walkers[1].y, 1)
    }

    const stepWalkers = () => {
      walkers.forEach((walker, walkerIndex) => {
        const direction = Math.floor(Math.random() * 4)
        if (direction === 0) walker.x = (walker.x + 1) % GRID_SIZE
        if (direction === 1) walker.x = (walker.x - 1 + GRID_SIZE) % GRID_SIZE
        if (direction === 2) walker.y = (walker.y + 1) % GRID_SIZE
        if (direction === 3) walker.y = (walker.y - 1 + GRID_SIZE) % GRID_SIZE
        paintCellIfEmpty(walker.x, walker.y, walkerIndex)
      })
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const clamp01 = (value) => Math.max(0, Math.min(1, value))
    const easeInOut = (value) => value * value * (3 - 2 * value)

    // Phase 1: rows wrap into a cylinder (tube cross-section).
    // The cylinder axis is horizontal. The middle row stays at the front,
    // top and bottom rows fold backward until they meet.
    const getCylinderRow = (row) => {
      const gridPxHeight = GRID_SIZE * cell
      const gridCenterY = offsetY + gridPxHeight / 2
      const R = gridPxHeight / (2 * Math.PI)
      const FOV = R * 7

      const theta = ((row + 0.5) / GRID_SIZE - 0.5) * 2 * Math.PI
      const cosT = Math.cos(theta)
      const sinT = Math.sin(theta)
      const zDepth = R * (1 - cosT)
      const perspScale = FOV / (FOV + zDepth)
      const screenY = gridCenterY + R * sinT * perspScale

      return { cosT, screenY, perspScale, zToward: R * cosT }
    }

    // Phase 2: columns wrap around the major circle (tube bends into a donut).
    // Middle column (phi=0) stays at the front; outer columns wrap to the back.
    // Torus lies in the XZ plane so the ring faces the viewer.
    // A slight X-axis tilt (~20°) gives a natural donut perspective.
    const getTorusCell = (col, row, width, height) => {
      const R_minor = (GRID_SIZE * cell) / (2 * Math.PI)
      const R_major = R_minor * 2
      const fov = (R_major + R_minor) * 4
      const tilt = Math.PI * 0.13  // ~23° tilt so the ring looks 3D

      const theta = ((row + 0.5) / GRID_SIZE - 0.5) * 2 * Math.PI
      const phi = ((col + 0.5) / GRID_SIZE - 0.5) * 2 * Math.PI

      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta)
      const cosPhi = Math.cos(phi)
      const sinPhi = Math.sin(phi)

      // Torus surface point in world space
      const wx = (R_major + R_minor * cosTheta) * sinPhi  // horizontal
      const wy0 = R_minor * sinTheta                       // vertical (pre-tilt)
      const wz0 = (R_major + R_minor * cosTheta) * cosPhi // depth (pre-tilt, + = toward viewer)

      // Tilt around the X axis so the torus top is slightly visible
      const cosTilt = Math.cos(tilt)
      const sinTilt = Math.sin(tilt)
      const wy = wy0 * cosTilt - wz0 * sinTilt
      const wz = wy0 * sinTilt + wz0 * cosTilt

      // Perspective: depth from viewer
      const zDepth = (R_major + R_minor) - wz
      const perspScale = fov / (fov + zDepth)

      const screenX = width / 2 + wx * perspScale
      const screenY = height / 2 + wy * perspScale

      return { screenX, screenY, perspScale, depth: wz }
    }

    const drawGridBackground = (width, height) => {
      ctx.fillStyle = '#1d2937'
      ctx.fillRect(0, 0, width, height)
    }

    const drawClaimedCellsAndGrid = (width, height, morphTube, morphTorus) => {
      const cellsToDraw = []

      for (let row = 0; row < GRID_SIZE; row += 1) {
        for (let col = 0; col < GRID_SIZE; col += 1) {
          const owner = owners[row * GRID_SIZE + col]
          if (owner === -1) continue

          const flatX = offsetX + col * cell + cell / 2
          const flatY = offsetY + row * cell + cell / 2

          // Tube state
          const { cosT, screenY: tubeY, perspScale: tubePerspScale, zToward } = getCylinderRow(row)
          const tubeX = flatX
          const tubeW = Math.max(1, cell)
          const tubeH = Math.max(1, cell * tubePerspScale)
          const tubeAlpha = Math.max(0, cosT) * 0.7

          // Torus state
          const { screenX: torusX, screenY: torusY, perspScale: torusPerspScale, depth: torusDepth } = getTorusCell(col, row, width, height)
          const torusCellSize = Math.max(1, cell * torusPerspScale)
          const torusAlpha = 0.65

          let drawX, drawY, drawW, drawH, alpha, depth

          if (morphTorus > 0) {
            // Tube → torus
            drawX = lerp(tubeX, torusX, morphTorus)
            drawY = lerp(tubeY, torusY, morphTorus)
            drawW = lerp(tubeW, torusCellSize, morphTorus)
            drawH = lerp(tubeH, torusCellSize, morphTorus)
            alpha = lerp(tubeAlpha, torusAlpha, morphTorus)
            depth = lerp(zToward, torusDepth, morphTorus)
          } else {
            // Flat → tube
            drawX = flatX
            drawY = lerp(flatY, tubeY, morphTube)
            drawW = tubeW
            drawH = lerp(Math.max(1, cell), tubeH, morphTube)
            alpha = lerp(0.42, tubeAlpha, morphTube)
            depth = lerp(0, zToward, morphTube)
          }

          const color =
            owner === 0
              ? `rgba(212,165,116,${alpha.toFixed(3)})`
              : `rgba(121,184,255,${alpha.toFixed(3)})`

          cellsToDraw.push({ drawX, drawY, drawW, drawH, color, depth })
        }
      }

      // Draw back-to-front so nearer cells render on top
      cellsToDraw.sort((a, b) => a.depth - b.depth)
      cellsToDraw.forEach(({ drawX, drawY, drawW, drawH, color }) => {
        ctx.fillStyle = color
        ctx.fillRect(drawX - drawW / 2, drawY - drawH / 2, drawW, drawH)
      })

      // Flat grid lines fade out as the tube morph begins
      const gridAlpha = (1 - morphTube) * 0.16
      if (gridAlpha > 0.01) {
        ctx.strokeStyle = `rgba(155,168,180,${gridAlpha})`
        ctx.lineWidth = 1
        for (let i = 0; i <= GRID_SIZE; i += 1) {
          const x = offsetX + i * cell
          const y = offsetY + i * cell
          ctx.beginPath()
          ctx.moveTo(x, offsetY)
          ctx.lineTo(x, offsetY + GRID_SIZE * cell)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(offsetX, y)
          ctx.lineTo(offsetX + GRID_SIZE * cell, y)
          ctx.stroke()
        }
      }
    }

    const drawWalkers = () => {
      walkers.forEach((walker) => {
        ctx.fillStyle = walker.color
        ctx.beginPath()
        ctx.arc(offsetX + walker.x * cell + cell / 2, offsetY + walker.y * cell + cell / 2, Math.max(3, cell * 0.32), 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const tick = (time) => {
      if (phase === 'walk' && coloredCount >= Math.ceil(totalCells * 0.99)) {
        phase = 'pause'
        phaseStartAt = time
      }

      if (phase === 'walk') {
        for (let s = 0; s < STEPS_PER_FRAME && coloredCount < totalCells; s += 1) {
          stepWalkers()
        }
      }

      if (phase === 'pause' && time - phaseStartAt >= PAUSE_MS) {
        phase = 'morph_tube'
        phaseStartAt = time
      } else if (phase === 'morph_tube' && time - phaseStartAt >= MORPH_TUBE_MS) {
        phase = 'tube_hold'
        phaseStartAt = time
      } else if (phase === 'tube_hold' && time - phaseStartAt >= TUBE_HOLD_MS) {
        phase = 'morph_torus'
        phaseStartAt = time
      } else if (phase === 'morph_torus' && time - phaseStartAt >= MORPH_TORUS_MS) {
        phase = 'torus_hold'
        phaseStartAt = time
      } else if (phase === 'torus_hold' && time - phaseStartAt >= TORUS_HOLD_MS) {
        resetBoard()
      }

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      const morphTube =
        phase === 'morph_tube'
          ? easeInOut(clamp01((time - phaseStartAt) / MORPH_TUBE_MS))
          : ['tube_hold', 'morph_torus', 'torus_hold'].includes(phase)
            ? 1
            : 0

      const morphTorus =
        phase === 'morph_torus'
          ? easeInOut(clamp01((time - phaseStartAt) / MORPH_TORUS_MS))
          : phase === 'torus_hold'
            ? 1
            : 0

      drawGridBackground(width, height)
      drawClaimedCellsAndGrid(width, height, morphTube, morphTorus)

      if (phase === 'walk' || phase === 'pause') {
        drawWalkers()
      }

      rafId = window.requestAnimationFrame(tick)
    }

    const onResize = () => resize()
    resize()
    resetBoard()
    rafId = window.requestAnimationFrame(tick)
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="random-walk-demo">
      <div className="random-walk-canvas-wrap" ref={wrapRef}>
        <canvas ref={canvasRef} aria-label="Random walk demonstration animation" />
      </div>
      <div className="random-walk-sidebar">
        <p className="random-walk-caption">
          This simulation takes place on a torus — a surface where opposite edges connect. The animation reveals the
          topology by folding the grid into a tube, then bending the tube into a donut.
        </p>
      </div>
    </div>
  )
}

export default RandomWalkDemo
