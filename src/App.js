import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Signup/SignUp";
import Home from "./Pages/Home/Home";
import RequireUser from "./Components/RequireUser";
import Feed from "./Components/feed/Feed";
import Profile from "./Components/Profile/Profile";
import UpdateProfile from "./Components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";
import OnlyIfNotLoggedIn from "./Components/OnlyIfNotLoggedIn";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  const LoadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      LoadingRef.current?.continuousStart();
    } else {
      LoadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;

      
    }
  }, [toastData]);

  return (
    <div className="App">
      <LoadingBar color="#000" ref={LoadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* <Route element={<OnlyIfNotLoggedIn/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
