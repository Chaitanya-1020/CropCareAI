/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar/Navbar";
import HomePage from "./page/HomePage";
import SignupPage from "./page/SignupPage";
import SigninPage from "./page/SigninPage";
import DashLayout from "./components/DashLayout";
import AdminDashboard from "./components/DashboardComponents/AdminDashboard";
import UsersInformation from "./page/UsersInformation";
import ErrorBoundary from "./ErrorBoundary";
import FeaturesPage from "./page/FeaturePage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/DashboardComponents/UserProfile";
import DiseaseDetection from "./components/Features/DiseaseDetection";
import SingleUserProfile from "./components/DashboardComponents/Farmer/SingleUser";
import MarketPrices from "./components/Features/MarketPrices";
import SoilAnalysis from "./components/Features/SoilAnalysis";
import Cropvideo from "./components/Features/cropVideo";
// import WeatherForecast from "./components/Features/WeatherForecast";
import NavigationBar from "./components/NavigationBar";
import CropRecommendation from "./components/Features/CropRecommendation";
import FertilizerRecommendation from "./components/Features/FertilizerRecommendation";
import AboutUs from "./page/Aboutus";
import DiseaseExpert from "./components/Features/AI_Features/DiseaseExpert";
import GeneralExpert from "./components/Features/AI_Features/GeneralExpert";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="max-w-8xl mx-auto">
            <Toaster position="top-right" />
            {/* <Navbar /> */}
            <NavigationBar />
            <Routes>
              {/* Open Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Features Routes */}
              <Route
                path="/features"
                element={
                  <ProtectedRoute>
                    <FeaturesPage />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DiseaseDetection />} />
                <Route path="soil" element={<SoilAnalysis />} />
                <Route
                  path="crop-recommendation"
                  element={<CropRecommendation />}
                />
                <Route
                  path="fertilizer-recommendation"
                  element={<FertilizerRecommendation />}
                />
                <Route path="weather" element={<Cropvideo />} />
                <Route path="cropvideo" element={<Cropvideo />} />

                <Route path="disease-expert" element={<DiseaseExpert />} />
                <Route path="general-expert" element={<GeneralExpert />} />
              </Route>

              <Route path="/aboutus" element={<AboutUs />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <DashLayout />
                  </ProtectedRoute>
                }
              >
                {/* Admin-only user profile route */}
                <Route
                  path="user/:id"
                  element={
                    <ProtectedRoute role="admin">
                      <SingleUserProfile />
                    </ProtectedRoute>
                  }
                />
                {/* All role profile page */}
                <Route index element={<UserProfile />} />

                {/* Admin only routes */}
                <Route
                  path="admin-dashboard"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                {/* Farmer Profile Information */}
                <Route
                  path="farmer-profile/:id"
                  element={
                    <ProtectedRoute role="admin">
                      {" "}
                      <UsersInformation />{" "}
                    </ProtectedRoute>
                  }
                />              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
