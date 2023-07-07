import errorIcon from '../assets/toast_error.svg';
import { toast } from 'react-toastify';


export function toastError(message) {
    return toast(
        <div className='flex flex-row items-center'>
            <img src={errorIcon} className='w-7 h-7 mr-3' alt='Success Icon'/>
            <span>{message}</span>
        </div>,
        {
            progressClassName: "Toastify__progress-bar--error"
        }
    );
}

