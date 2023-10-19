import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Header = () =>{
    const [pageState,setPageState] = useState("Sign In")

    //useLocation gives the pathname
    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                setPageState("Profile")
            }else{
                setPageState("Sign In")
            }
        })
    },[auth])

    function pathMatchesRoute(route){
        if(route === location.pathname){
            return true   
        }
    }

    return(

        

       <div className="bg-white border-b shadow-sm sticky top-0 z-50">

            <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">

                <div>
                    
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo"  className="h-5 cursor-pointer"/>
                </div>
                {/* Logo */}
                
                <div>
                    <ul className="flex space-x-10">

                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent  ${pathMatchesRoute("/") && "text-black border-b-red-500"}`} onClick={() => navigate('/')}>
                           Home 
                        </li>

                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent  ${pathMatchesRoute("/offers") && "text-black border-b-red-500"}`} onClick={() => navigate('/offers')}>
                           Offers
                        </li>


                        <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent  ${ (pathMatchesRoute("/sign-in") || pathMatchesRoute("/profile")) && "text-black border-b-red-500"}`} onClick={() => navigate('/profile')}>
                           {pageState}
                        </li>

                    </ul>
                </div>

            </header>

       </div>
    )
}