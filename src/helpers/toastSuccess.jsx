import successIcon from '../assets/toast_success.svg';
import { toast } from 'react-toastify';


export function toastSuccess(message) {
    return toast(
        <div className='flex flex-row items-center'>
            <img src={successIcon} className='w-7 h-7 mr-3' alt='Success Icon'/>
            <span>{message}</span>
        </div>,
        {
            progressClassName: "Toastify__progress-bar--success"
        }
    );
}

