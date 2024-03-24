import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashbord from "./pages/Dashbord"
import Projects from "./pages/Projects"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/sign-up" element={<Signup/>} />
        <Route path="/dashbord" element={<Dashbord/>} />
        <Route path="/projects" element={<Projects/>} />
      </Routes>
    </BrowserRouter>
  )
}