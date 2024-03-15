import { useNavigate } from 'react-router-dom';
import './button-create.styles.scss';
import IconCreate from '../../assets/image/create.svg';


const ButtonCreate = () => {

    const navigate = useNavigate();

    const handleNavigation = (e) => {

        e.preventDefault();
        navigate('/notes/creation');
    }
    return (


            <div className='button-create' onClick={handleNavigation}>
                create
                <img src={IconCreate} alt='create note' className="button-create--icon" />
            </div>
    )
}


export default ButtonCreate;