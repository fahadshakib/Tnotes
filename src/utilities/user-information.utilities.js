import {db , COLLECTION_USERS} from '../firebase.config';
import {doc , getDoc} from 'firebase/firestore'


const getUserDataFromFireStore = async (uid) => {

    try {
  
      const reference = doc(db, COLLECTION_USERS, uid);
      const snapshot = await getDoc(reference);
  
      if(snapshot.exists()) return snapshot.data();
      else return {};
  
    } catch (error){throw new Error(error.message)}
}


export default getUserDataFromFireStore;