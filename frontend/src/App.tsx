import { Routes, Route } from 'react-router-dom'

import Top from './components/Top.tsx'
import Feed from './components/Feed.tsx'
import ForYou from './components/ForYou.tsx'

function App() {
  return (
    <div>
      <Top />
      <Feed />

      <Routes>
        <Route path='/' element={<ForYou />}></Route>
      </Routes>
    </div>
  )
}

export default App
