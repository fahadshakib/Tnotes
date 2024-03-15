import { useNavigate } from 'react-router-dom';
import './route-error.styles.scss';
import ErrorImage from '../../assets/image/404.svg';
import HomeImage from '../../assets/image/house.svg';


const RouteError = () => {

    const navigate = useNavigate();

    const handleNavigation = () => {navigate('/')}

        return(

            <div className="route-error">
                <img src={ErrorImage} alt="route not found" className="route-error--image" />
                <div className='route-error__button' onClick={handleNavigation}>
                        back to home
                    <img src={HomeImage} alt="back to homepage"/>
                </div>
            </div>
        )
}

export default RouteError;