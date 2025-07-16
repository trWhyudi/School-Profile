import React, { useEffect, useContext, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./page/Home"
import About from "./page/About"
import Contact from "./page/Contact"
import Services from "./page/Services"
import Help from "./page/Help"
import Policy from "./page/Policy"
import Terms from "./page/Terms"
import Faq from "./page/Faq"
import PageNotFound from "./page/PageNotFound"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Login from './page/Login'
import Register from './page/Register'
import axios from 'axios'
import { Context } from './main'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Profile from './page/Profile'
import ForgotPassword from './page/ForgotPassword'
import Dashboard from './page/Dashboard'

const App = () => {
  const {isAuth, setIsAuth, setUser} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setIsAuth(false);
          setUser(null);
          setLoading(false);
          return;
        }
        const {data} = await axios.get("http://localhost:5050/api/v1/user/me", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (data?.user) {
          setIsAuth(true);
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          let profileUrl = "";

          switch (data.user.role) {
            case "Murid":
              profileUrl = "http://localhost:5050/api/v1/student/profile";
              break;
            case "Guru":
              profileUrl = "http://localhost:5050/api/v1/teacher/profile";
              break;
            case "Admin":
              profileUrl = "http://localhost:5050/api/v1/user/admin-profile";
              break;
            default:
              profileUrl = "";
          }

          if (profileUrl) {
            const profileRes = await axios.get(profileUrl, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            const profileData = 
            profileRes.data[data.user.role.toLowerCase()] || 
            profileRes.data.user || 
            data.user;

            setUser(profileData);
            localStorage.setItem("user", JSON.stringify(profileData));
          }
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.log("Error di fetch user profile", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setIsAuth(false);
        setUser({});
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile()
  }, [setIsAuth, setUser]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: 'ease-in',
      delay: 100
    });
    AOS.refresh();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-2xl font-semibold text-sky-600'>Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/help' element={<Help />}></Route>
        <Route path='/policy' element={<Policy />}></Route>
        <Route path='/terms' element={<Terms />}></Route>
        <Route path='/faq' element={<Faq />}></Route>
        <Route path='/login' element={!isAuth ? <Login /> : <Home />}></Route>
        <Route path='/register' element={!isAuth ? <Register /> : <Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right"/>
    </div>
  )
}

export default App