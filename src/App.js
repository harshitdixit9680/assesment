import "./App.css";
import CountDownTimer from "./Component/CountDownTimer";
import Navbar from "./Component/Navbar";
import { Routes, Route } from "react-router-dom";
import UserList from "./Component/UserList";

function App() {
  return (
    <>
     <Navbar />
      <Routes>
        {/* <Route exact path="/" element={ <Navbar />} /> */}
        <Route exact path="/" element={<CountDownTimer />} />
        <Route exact path="/userlist" element={<UserList />} />
      </Routes>
    </>
  );
}

export default App;
