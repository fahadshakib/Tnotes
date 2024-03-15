import {signOut} from 'firebase/auth'
import {auth} from '../firebase.config';

const signOutUser = async () => {

    try{
  
      await signOut(auth); } 
    
    catch(error){throw new Error('error during signing out')}
}

export default signOutUser;