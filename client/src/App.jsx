import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import { useSelector } from "react-redux";

import Home from "./pages/Home.page";
import Navbar from "../src/components/common/Navbar";
import Login from "./pages/Login.page";
import Signup from "./pages/Signup.page";
import ForgotPassword from "./pages/ForgotPassword.page";
import UpdatePassword from "./pages/UpdatePassword.page";
import VerifyEmail from "./pages/VerifyEmail.page";
import About from "./pages/About.page";
import Contact from "./pages/Contact.page";
import Dashboard from "./pages/Dashboard.page";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error.page";
import Sidebar from "./components/core/Dashboard/Sidebar";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog.page";
import CourseDetails from "./pages/CourseDetails.page";
import ViewCourse from "./pages/ViewCourse.page";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Admin from "./pages/Admin.page";
import AdminDashboard from "./components/core/Dashboard/Admin/AdminDashboard";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="App w-full min-h-screen bg-richblack-900 flex flex-col font-inter text-white">
      <Navbar />
      <Routes>
        <Route path="*" element={<Error />}></Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="admin" element={<AdminDashboard />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="instructor" element={<Instructor />} />
              <Route path="edit-course/:courseId" element={<EditCourse />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              <Route path="cart" element={<Cart />} />
            </>
          )}
        </Route>

        <Route
          path="view-course/:courseId"
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              ></Route>
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
