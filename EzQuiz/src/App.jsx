import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./views/Registration/Registration";
import { Toaster } from "react-hot-toast";
import Login from "./views/Login/Login";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={true} />
      <h1>EzQuiz</h1>
        <Routes>
          <Route path="/signup" element={<Registration />}></Route>
          <Route path="/signin" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
