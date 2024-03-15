import { Link , Outlet} from 'react-router-dom';
import './navigation.styles.scss';
import {useUserContext} from '../../contexts/user.context';
import Button from '../button/button.component';
import User from '../user/user.component';


const Navigation = () => {

    const {user} = useUserContext();

    return (

        <>

        <nav className="navigation">
            <Link className='navigation--heading' to='/'>Tnotes</Link>
            {!user && <Button/>}
            {user && <User />}
        </nav>
        
        <Outlet/>
        </>
    )
}

export default Navigation;