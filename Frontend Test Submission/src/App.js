import { Route, Routes } from 'react-router'
import Home from './page/home'

export default function App() {
  return (
      <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    
  )
}
