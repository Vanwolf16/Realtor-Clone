import spinner from "../assets/svg/spinner.svg"

export const Spinner = () => {
    return(
        <div>
            <div>
                <img src={spinner} alt="loading..." 
                className="h-24"/>
            </div>
        </div>
    )
}