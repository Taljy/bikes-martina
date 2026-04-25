import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CompareProvider } from './context/CompareContext'
import { ScrollToTop } from './components/ScrollToTop'
import Layout from './components/Layout'
import Home from './pages/Home'
import BikeList from './pages/BikeList'
import BikeDetail from './pages/BikeDetail'
import Compare from './pages/Compare'
import Wissen from './pages/Wissen'
import TrailVsEnduro from './pages/TrailVsEnduro'
import WissenMotoren from './pages/WissenMotoren'
import WissenNeuheiten from './pages/WissenNeuheiten'
import Impressum from './pages/Impressum'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CompareProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bikes" element={<BikeList />} />
            <Route path="bikes/:id" element={<BikeDetail />} />
            <Route path="vergleich" element={<Compare />} />
            <Route path="wissen" element={<Wissen />} />
            <Route path="wissen/trail-vs-enduro" element={<TrailVsEnduro />} />
            <Route path="wissen/motoren" element={<WissenMotoren />} />
            <Route path="wissen/neuheiten-2026" element={<WissenNeuheiten />} />
            <Route path="impressum" element={<Impressum />} />
          </Route>
        </Routes>
      </CompareProvider>
    </BrowserRouter>
  )
}
