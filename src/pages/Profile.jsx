import { useEffect, useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where} from "firebase/firestore"
import { db } from "../firebase"

import {FcHome} from 'react-icons/fc'
import { Link } from "react-router-dom"
import { ListingItem } from "../components/ListingItem"

export const Profile = () => {
    const navigate = useNavigate()
    const [changeDetail,setChangeDetail] = useState(false)
    const [listings,setListings] = useState(null)
    const [loading,setLoading] = useState(true)
    const auth = getAuth()
    
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const {name, email} = formData

    function onLogout(){
        auth.signOut()
        navigate("/")
    }

    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

   async function onSubmit(){
        try {
            if (auth.currentUser.displayName !== name) {
                //then change the name for firebase firestore
                await updateProfile(auth.currentUser,{
                    displayName: name,
                })
                //update the name in the firestore
                const docRef = doc(db,"users", auth.currentUser.uid)
                await updateDoc(docRef,{
                    name: name,
                })

                toast.success("Profile update complete")
            }
        } catch (error) {
            toast.error("could not update the profile detail")
        }
    }

    useEffect(() => {
        async function fetchUserListings() {
          //db get the listing collection
          const listingRef = collection(db, "listings");
          //Query it to get the user listing only
          const q = query(
            listingRef,
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc")
          );
          //make a await function to getDocs
          const querySnap = await getDocs(q);
          //make a empty array to get the data like on swift
          let listings = [];
          //listing push
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });

          setListings(listings);
          setLoading(false);
        }
        fetchUserListings();
      }, [auth.currentUser.uid]);


      async function onDelete(listingID) {
        if (window.confirm("Are you sure you want to delete?")) {
          await deleteDoc(doc(db, "listings", listingID));
          const updatedListings = listings.filter(
            (listing) => listing.id !== listingID
          );
          setListings(updatedListings);
          toast.success("Successfully deleted the listing");
        }
      }

      function onEdit(lisitingID){
        navigate(`/edit-listing/${lisitingID}`)
      }


    return(
        <>
            <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
                <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
                <div className="w-full md:w-[50%] mt-6 px-3">
                    <form>

                        <input type="text" id="name" value={name} disabled={!changeDetail}
                        onChange={onChange}
                        className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300
                        rounded transtion ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
                        {/* Name Input */}

                        <input type="email" id="email" value={email} disabled
                        className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300
                        rounded transtion ease-in-out"/>
                        {/* Email Input */}

                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
                            <p className="flex items-center mb-6">Do you want to change your name? <span
                             onClick={() => {
                                changeDetail && onSubmit()
                                setChangeDetail((prevState) => !prevState)
                             }}
                            className="text-red-600 hover:text-red-700 transition ease-in-out
                            duration-200 ml-1 cursor-pointer">{changeDetail ? "Apply Change" : "Edit"}</span></p>
                            <p onClick={onLogout} className="text-blue-600 hover:text-blue-800
                            transition duration-200 ease-in-out cursor-pointer">Sign out</p>
                        </div>

                    </form>


                    <button type="submit" className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium
                    rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg
                    active:bg-blue-800">
                        <Link to="/create-listing" className="flex justify-center items-center ">
                        <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2"/>
                        Sell or rent your home 
                        </Link>
                    </button>

                </div>

            </section>
            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {!loading && listings.length > 0 && (
                    <>
                        <h2 className="text-center text-2xl font-semibold">My Listing</h2>
                        <ul>
                            {listings.map((listing) => (
                                <ListingItem key={listing.id}
                                id={listing.id} listing={listing.data} onDelete={() => onDelete(listing.id)}
                                onEdit={() => onEdit(listing.id)}/>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    )
}