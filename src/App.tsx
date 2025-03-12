// import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Header from "./components/Header.tsx";
function App() {

  return (
      <>
          <Header></Header>
    <Routes>
        <Route path={'/'} element={<HomePage/>}></Route>

    </Routes>
      </>
  )
}

export default App
