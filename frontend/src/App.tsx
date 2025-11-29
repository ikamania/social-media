import { Routes, Route } from 'react-router-dom'

import Menu from './components/Menu.tsx'
import ForYou from './components/ForYou.tsx'

function App() {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-full max-w-md h-full border-1 border-gray-100">
        <Menu />

        <Routes>
          <Route path='/' element={<ForYou />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
