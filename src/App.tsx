// import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CreateAd from "./pages/CreateAd.tsx";
import CreateCategory from "./pages/CreateCategory.tsx";
import EditCategory from "./pages/EditCategory.tsx";
import AdDetail from "./pages/AdDetail.tsx";
import EditAd from "./pages/EditAd.tsx";
import CategoryAds from "./pages/CategoryAds.tsx";
import Header from "./components/Header.tsx";
function App() {

  return (
      <>
          <Header></Header>
    <Routes>
        <Route path={'/'} element={<HomePage/>}></Route>
        <Route path={'/createAd'} element={<CreateAd/>}></Route>
        <Route path={'/createCategory'} element={<CreateCategory/>}></Route>
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/ad/:id" element={<AdDetail />} />
        <Route path="/edit-ad/:id" element={<EditAd />} />
        <Route path="/category/:categoryId" element={<CategoryAds />} />
    </Routes>
      </>
  )
}

export default App
