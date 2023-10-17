import { Home } from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile";
import {SignIn} from './pages/Signin';
import {SignUp} from './pages/SignUp';
import {ForgotPassword} from './pages/ForgotPassword';
import {Offers} from './pages/Offers';
import { Header } from "./components/Header";
//Toastify
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={ <SignUp /> }/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/offers" element={<Offers />}/>

        </Routes>

      </Router>

      <ToastContainer position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    </>
  );
}

export default App;
