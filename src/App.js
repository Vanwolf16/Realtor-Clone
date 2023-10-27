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
import { PrivateRoute } from "./components/PrivateRoute";
import { CreateListing } from "./pages/CreateListing";
import { EditListing } from "./pages/EditListing";
import { Listing } from "./pages/Listing";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<PrivateRoute />}>

          <Route path="/profile" element={<Profile />} />
          
          </Route>
          {/* Private Route to Profile */}
          <Route path="create-listing" element={<PrivateRoute />}>

          <Route path="/create-listing" element={<CreateListing />}/>
          
          </Route>
          {/*  Private Route to Create Listing */}

          <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
          {/* Private Route to Edit Listing */}
          
          
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={ <SignUp /> }/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/offers" element={<Offers />}/>
          <Route path="/category/:categoryName/:listingId" element={<Listing />}/>

          

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
