import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import Detail from "./components/pages/Detail";
import {BrowserRouter, Route, Routes  } from "react-router-dom"

function App () {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="blogs" element={<Blog/>} />
        <Route path="detail" element={<Detail/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App