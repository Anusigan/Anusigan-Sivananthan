import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import Pet from './components/Pet'
import Toasts from './components/Toasts'

function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  return (
    <>
      <ScrollProgress />
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={done} />}
      </AnimatePresence>
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Experience />
            <About />
            <Skills />
            <Achievements />
            <Contact />
          </main>
          <Footer />
          <Pet />
          <Toasts />
        </>
      )}
    </>
  )
}

export default App
