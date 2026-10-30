export const SECRETS = [
  { id: 'poke', title: 'Hello, Byte', hint: 'say hi to the robot', desc: 'clicked Byte' },
  { id: 'throw', title: 'Yeet', hint: 'robots can fly, right?', desc: 'threw Byte across the screen' },
  { id: 'terminal', title: 'Root access', hint: 'the monitor in the room', desc: 'ran a command in the terminal' },
  { id: 'hire', title: 'Great taste', hint: 'sudo might help', desc: 'ran sudo hire anusigan' },
  { id: 'monsoon', title: 'Monsoon season', hint: 'look out the window', desc: 'made it rain in Colombo' },
  { id: 'night', title: 'Night owl', hint: 'clocks can be bent', desc: 'time-travelled to midnight' },
  { id: 'duck', title: 'Rubber duck debugger', hint: 'it’s on the desk', desc: 'asked the duck for help' },
  { id: 'cartridge', title: 'Player one', hint: 'try every cartridge', desc: 'played every project' },
  { id: 'konami', title: 'Old school', hint: '↑↑↓↓←→←→ b a', desc: 'entered the Konami code' },
  { id: 'bottom', title: 'Completionist', hint: 'reach the end', desc: 'scrolled all the way down' },
]

const KEY = 'anusigan.secrets'
let unlocked = null

export function getUnlocked() {
  if (!unlocked) {
    try { unlocked = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch { unlocked = new Set() }
  }
  return unlocked
}

export function unlock(id) {
  const set = getUnlocked()
  if (set.has(id)) return
  set.add(id)
  try { localStorage.setItem(KEY, JSON.stringify([...set])) } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('secret', { detail: id }))
}
