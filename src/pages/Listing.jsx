import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { db } from "../firebase"
import { Spinner } from "../components/Spinner"
//Slider

import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectFade,Autoplay,Navigation, Pagination} from 'swiper/modules'


import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"


export const Listing = () => {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading,setLoading] = useState(true)

    

    useEffect(() => {
        async function fetchListing(){
            const docRef = doc(db,"listings", params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    },[params.listingId])

    if(loading){
        return <Spinner />
    }

    return(
        <main>
            <Swiper modules={[Navigation,Pagination,Autoplay,EffectFade]} slidesPerView={1} navigation pagination={{type: "progressbar"}}
            effect="fade"  autoplay={{delay: 3000}}>
                {listing.imgUrls.map((url,index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full overflow-hidden h-[500px]" style={{background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: "cover"}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </main>
    )
}