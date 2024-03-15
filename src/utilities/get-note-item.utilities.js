import { doc, getDoc } from "firebase/firestore";
import { db, COLLECTION_NOTES } from "../firebase.config";

const getNoteFromFirestore = async (id) => {

    try {

      if (!id) return;
  
      const reference = doc(db, COLLECTION_NOTES, id);
      const snapShot = await getDoc(reference);
  
      if (!snapShot.exists()) {
        throw new Error('no note item found');
      }
  
      const noteData = snapShot.data();
      return { id: snapShot.id, ...noteData };

    } catch (error) {throw new Error(`error getting note fromm database`)}
  };

  export default getNoteFromFirestore;