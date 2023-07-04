import { Link } from 'react-router-dom';
import MascotSmallIcon from "../../assets/MascotSmallIcon.webp";
import AuthDetails from "./AuthDetails";


const BrandContainer = () => {


    return (
        <div className='top-brand-container max-w-2xl py-3 px-6 mx-auto'>
            <div className='bg-biege-form-colour px-3 py-2 items-center flex justify-between text-center rounded-3xl shadow '>
                <Link to="/">
                <div className='h-12 w-12 bg-orange-button rounded-2xl border border-brown-border'>
                    <img src={MascotSmallIcon} className='h-12 w-12 '  />
                </div>
                </Link>
                <Link to="/">
                <p className='text-2xl font-bold place-self-center font-fuzzy-bubbles'> Heavy Habits </p>
                </Link>

                <div className='h-12 w-12'>  </div>
            </div>
            <div className='mt-6 flex items-center justify-center text-center'>
                <AuthDetails/>
            </div>


        </div>
    )
}

export default BrandContainer;