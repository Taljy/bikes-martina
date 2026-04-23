import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import BikeList from './pages/BikeList'
import BikeDetail from './pages/BikeDetail'
import Compare from './pages/Compare'
import Wissen from './pages/Wissen'
import Neuheiten from './pages/Neuheiten'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bikes" element={<BikeList />} />
          <Route path="bikes/:id" element={<BikeDetail />} />
          <Route path="vergleich" element={<Compare />} />
          <Route path="wissen" element={<Wissen />} />
          <Route path="neuheiten" element={<Neuheiten />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
