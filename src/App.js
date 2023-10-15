import { Home } from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile";
import {SignIn} from './pages/Signin';
import {SignUp} from './pages/SignUp';
import {ForgotPassword} from './pages/ForgotPassword';
import {Offers} from './pages/Offers';
import { Header } from "./components/Header";

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
     
    </>
  );
}

export default App;