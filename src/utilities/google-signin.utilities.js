import {db , auth , COLLECTION_USERS} from '../firebase.config';
import {doc , getDoc , setDoc} from 'firebase/firestore';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import uploadSampleNotesInFirestore from './upload-sample-notes.utilities';


const provider = new GoogleAuthProvider().setCustomParameters({prompt : 'select_account'});

const signInWithGoogle = async () => {

    const signInWithGooglePopup = () => signInWithPopup(auth , provider);
    const {user} = await signInWithGooglePopup();
    if(!user)  return;

    try{

      const {displayName , email , photoURL , uid} = user;
      const reference = doc(db , COLLECTION_USERS , uid);
      const snapshot = await getDoc(reference);
  
      if(!snapshot.exists()) {
  
          const userData = {
  
            name : displayName,
            email : email,
            photo : photoURL,
            joinedOnSite : new Date().toString()
          }
  
          await setDoc(reference, userData);
      }
      if(!snapshot.exists()) await uploadSampleNotesInFirestore(uid);

    } catch (error) {throw new Error('error during sign in with google')}

}

export default signInWithGoogle;