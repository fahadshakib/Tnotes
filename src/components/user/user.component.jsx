import './user.styles.scss';
import {useUserContext} from '../../contexts/user.context';
import signOutUser from '../../utilities/sign-out.utilities';
import IconSignOut from '../../assets/image/sign-out.svg';
import photoDefault from '../../assets/image/avatar.jpg';

const User = () => {

    const {user} = useUserContext();
    const name = user?.name || 'unknown user';
    const photo = user?.photo || photoDefault;

    return (

        <div className="user-container">
            <div className="user">
                <img src={photo} alt={name} className="user--image" />
                <p className="user--name">{name}</p>
            </div>
            <img src={IconSignOut} alt='sign out' className="user-container--icon" onClick={signOutUser}/>
        </div>
    )

}

export default User;