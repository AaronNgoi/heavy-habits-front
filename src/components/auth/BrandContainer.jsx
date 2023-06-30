import { Link } from 'react-router-dom';
import MascotSmallIcon from "../../assets/MascotSmallIcon.webp";
import AuthDetails from "./AuthDetails";


const BrandContainer = () => {


    return (
        <div className='top-brand-container max-w-lg py-3 px-6 mx-auto '>
            <div className='bg-biege-form-colour px-3 py-2 items-center flex justify-between text-center rounded-3xl'>
                <Link to="/">
                <div className='h-12 w-12 bg-orange-button rounded-2xl'>
                    <img src={MascotSmallIcon} className='h-12 w-12 '  />
                </div>
                </Link>
                <Link to="/">
                <p className='text-2xl font-bold place-self-center font-fuzzy-bubbles'> Heavy Habits </p>
                </Link>
                <AuthDetails/>
                {/*<div className='h-12 w-12'>  </div>*/}
            </div>


        </div>
    )
}

export default BrandContainer;