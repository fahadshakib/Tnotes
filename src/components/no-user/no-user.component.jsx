import './no-user.styles.scss';
import UnAuthorizedUserImage from '../../assets/image/user-writting.webp';


const NoUserComponent = () => {

    return(

        <div className="no-user">
            <h3 className="no-user--title">
                Tnotes - a note taking application
            </h3>
            <img src={UnAuthorizedUserImage} alt="sign in first" className="no-user--image" />
        </div>
    )
}

export default NoUserComponent;