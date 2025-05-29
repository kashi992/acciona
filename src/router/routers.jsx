import { Routes,Route} from "react-router-dom"
import HomePage from "../pages/home-page/HomePage"
import LoginForm from "../pages/login-page"
import Vision from "../pages/home-page/vision"
import HeroSlider from "../pages/home-page/heroSlider"
import Safety from "../pages/home-page/safety"
import SystemEngineering2 from "../pages/home-page/SystemEngineering2/index"
import SydneyMetroFacility from "../pages/home-page/SydneyMetroFacility"
import InterfaceIntegration from "../pages/home-page/InterfaceIntegration"
import ConstructionMethodology from "../pages/home-page/ConstructionMethodology"
import Community from "../pages/home-page/Community"
import SocialInclusion from "../pages/home-page/SocialInclusion"
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute

const Routers = () => {
  return (
  <Routes>
    <Route index element={<HomePage/>} />
    <Route path="/login" element={<LoginForm/>} />
   
    <Route element={<ProtectedRoute />}>
    <Route path="/home" element={<HeroSlider/>} />
    <Route path="/vision" element={<Vision/>} />
    <Route path="/safety" element={<Safety/>} />
    <Route path="/sustainability" element={<SystemEngineering2/>} />
    <Route path="/sydney-metro-facility" element={<SydneyMetroFacility/>} />
    <Route path="/interface-and-integration" element={<InterfaceIntegration/>} />
    <Route path="/methodology" element={<ConstructionMethodology/>} />
    <Route path="/community" element={<Community/>} />
    <Route path="/social-inclusion" element={<SocialInclusion/>} />
    </Route>
  
  </Routes>
  )
}

export default Routers
