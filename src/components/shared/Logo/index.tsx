
import { useNavigate } from 'react-router-dom';
import biodermisLogo from '../../../assets/logo-biodermis.png';
import { DEFAULT_PATH } from '../../../constants/paths/paths';


export const Logo = () => {

    const navigate = useNavigate();


    return (

    <div className='h-[96px] border border-[#EFEFEF] p-3 text-white flex items-center justify-center'>

        <img 
        src={biodermisLogo} 
        alt='Logo empresa Biodermis'
        className=' cursor-pointer '
        onClick={()=> navigate(DEFAULT_PATH)}
        
        />
        
    </div>

    );

}