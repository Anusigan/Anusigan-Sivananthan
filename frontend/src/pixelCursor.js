const ARROW = [
  'K..........',
  'KK.........',
  'KWK........',
  'KWWK.......',
  'KWWWK......',
  'KWWWWK.....',
  'KWWWWWK....',
  'KWWWWWWK...',
  'KWWWWWWWK..',
  'KWWWWWWWWK.',
  'KWWWWKKKKK.',
  'KWWKWK.....',
  'KWK.KWK....',
  'KK..KWK....',
  '.....KWK...',
  '.....KK....',
]

const HAND = [
  '....KK.......',
  '...KWWK......',
  '...KWWK......',
  '...KWWK......',
  '...KWWKKK....',
  '...KWWKWWKK..',
  'KK.KWWKWWKWK.',
  'KWKKWWWWWKWWK',
  'KWWKWWWWWWWWK',
  '.KWWWWWWWWWWK',
  '..KWWWWWWWWWK',
  '..KWWWWWWWWK.',
  '...KWWWWWWWK.',
  '...KWWWWWWK..',
  '....KKKKKKK..',
]

const COLORS = { K: '#04110b', W: '#d1fae5' }
const SCALE = 2

function toCursor(rows, hotX, hotY, fallback) {
  const w = rows[0].length * SCALE
  const h = rows.length * SCALE
  let rects = ''
  rows.forEach((row, y) => [...row].forEach((c, x) => {
    if (COLORS[c]) rects += `<rect x="${x * SCALE}" y="${y * SCALE}" width="${SCALE}" height="${SCALE}" fill="${COLORS[c]}"/>`
  }))
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" shape-rendering="crispEdges">${rects}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotX} ${hotY}, ${fallback}`
}

export function installPixelCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return
  const root = document.documentElement.style
  root.setProperty('--px-cursor', toCursor(ARROW, 0, 0, 'auto'))
  root.setProperty('--px-pointer', toCursor(HAND, 8, 0, 'pointer'))
}
