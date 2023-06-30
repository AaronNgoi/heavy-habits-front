import React from 'react';
import LeftHeader from '../assets/PetDLeft.svg';
import MiddleHeader from '../assets/PetDMid.svg';
import RightHeader from '../assets/PetDRight.svg';
import Mascot from '../assets/Mascot.svg';

const PetDisplay = () => (

    <div className="relative w-full h-108 -mb-1">
        <div className="absolute inset-0 flex items-center h-108">
            <div className="flex w-full h-108 bg-pet-bg">
                <img src={LeftHeader} className="flex -mr-1  h-108" alt="Left Header" />
                <img src={MiddleHeader} className=" flex-grow w-1/12 h-108" alt="Middle Header" />
                <img src={RightHeader} className="flex -ml-1  h-108" alt="Right Header" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={Mascot} alt="Mascot" className="h-108" />
                </div>
            </div>
        </div>
    </div>
);


export default PetDisplay;