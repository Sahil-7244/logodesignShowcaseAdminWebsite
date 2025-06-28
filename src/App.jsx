import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import Login from "./Pages/Login";
import ViewProduct from "./Pages/ViewProduct";
import Feedback from "./Pages/Feedback";
import ContactUs from "./Pages/ContactUs";
import AddBannner from "./Pages/AddBannner";
import { useEffect, useState } from "react";
import checkSession from "./auth/authService";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./Pages/EditProduct";
import EditBanner from "./Pages/EditBanner";
import ViewBanner from "./Pages/ViewBanner";
import ViewProductEnquiries from "./Pages/ViewProductEnquiries";
import AddServiceImg from "./Pages/AddserviceImg";
import ViewServiceImg from "./Pages/Viewserviceimg";
import EditServiceImg from "./Pages/EditServiceImg";
import EditContactDetails from "./Pages/editContactDetail";
import AddServicebgbanner from "./Pages/AddServicbgbanner";
import ViewServicebgbanner from "./Pages/Viewservicebgbanner";
import EditServicebgbanner from "./Pages/EditServicebgbanner";
import AddCarouselImg from "./Pages/AddCarouselImg";
import EditCarouselImg from "./Pages/EditCarouselImg";
import ViewCarouselImg from "./Pages/ViewCarouselImg";
import AddTeam from "./Pages/AddTeam";
import ViewTeam from "./Pages/Viewteam";
import EditTeamMember from "./Pages/Editteam";
import AddExperience from "./Pages/AddExperience";
import ViewExperience from "./Pages/ViewExperience";
import EditExperience from "./Pages/editexperience";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  axios.defaults.withCredentials = true;

  //for checking session
  useEffect(() => {
    const authenticateUser = async () => {
      // Call checkSession to determine if user is authenticated
      try {
        const isAuthenticated = await checkSession();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
    };
    authenticateUser();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ToastContainer stacked={true} />
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/addProduct"
                element={
                  isAuthenticated ? <AddProduct /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editProduct"
                element={
                  isAuthenticated ? <EditProduct /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewProduct"
                element={
                  isAuthenticated ? <ViewProduct /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewProductEnquiries"
                element={
                  isAuthenticated ? (
                    <ViewProductEnquiries />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/addserviceimg"
                element={
                  isAuthenticated ? <AddServiceImg /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewserviceimg"
                element={
                  isAuthenticated ? <ViewServiceImg /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editserviceimg"
                element={
                  isAuthenticated ? <EditServiceImg /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/feedback"
                element={
                  isAuthenticated ? <Feedback /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/contactUs"
                element={
                  isAuthenticated ? <ContactUs /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editContact"
                element={
                  isAuthenticated ? <EditContactDetails /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/addBanner"
                element={
                  isAuthenticated ? <AddBannner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewBanner"
                element={
                  isAuthenticated ? <ViewBanner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editBanner"
                element={
                  isAuthenticated ? <EditBanner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/addservicebgbanner"
                element={
                  isAuthenticated ? <AddServicebgbanner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewservicebgbanner"
                element={
                  isAuthenticated ? <ViewServicebgbanner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editservicebgbanner"
                element={
                  isAuthenticated ? <EditServicebgbanner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/addCarouselImg"
                element={
                  isAuthenticated ? <AddCarouselImg /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editcarouselImg"
                element={
                  isAuthenticated ? <EditCarouselImg /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewcarouselimg"
                element={
                  isAuthenticated ? <ViewCarouselImg /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/addteam"
                element={
                  isAuthenticated ? <AddTeam /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewteam"
                element={
                  isAuthenticated ? <ViewTeam /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editteammember"
                element={
                  isAuthenticated ? <EditTeamMember /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/addexp"
                element={
                  isAuthenticated ? <AddExperience /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewexp"
                element={
                  isAuthenticated ? <ViewExperience /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editexp"
                element={
                  isAuthenticated ? <EditExperience /> : <Navigate to="/login" />
                }
              />
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    <h3 className="text-center">Page Not Found</h3>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
