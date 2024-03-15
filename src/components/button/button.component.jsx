import { useNavigate } from 'react-router-dom';
import './button.styles.scss';
import signInWithGoogle from '../../utilities/google-signin.utilities';
import {useUserContext} from '../../contexts/user.context';
import IconGoogle  from '../../assets/image/google.svg';




const Button = () => {

    const {uid , forceRefresh} = useUserContext();
    const navigate = useNavigate();

    const handleSignIn = async (e) => {

        try {

            await signInWithGoogle();
            forceRefresh();
            navigate('/');

        } catch(error){alert(error.message)};
    }

    return (
        <div className='button' onClick={handleSignIn}>
            <p className="button--text">
                conitnue
            </p>
            <img src={IconGoogle} alt="sign in" className='button--image' />
        </div>
    )
}

export default Button;