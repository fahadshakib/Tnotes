import {doc , getDoc, updateDoc} from 'firebase/firestore';
import {ref, deleteObject} from 'firebase/storage';
import { db, storage, COLLECTION_NOTES } from "../firebase.config";

const updateNoteInDatabase = async (noteID ,noteData) => {

    if(!noteID || !noteData.title || !noteData.description ) return;

    try {

      const reference = doc(db, COLLECTION_NOTES, noteID);
      const snapshot = await getDoc(reference);

      const {photo} = snapshot.data();

      if(photo){
        const photoRef = ref(storage , photo);
        await deleteObject(photoRef);
        await updateDoc(reference , {...noteData});
      }
      else await updateDoc(reference , {...noteData});
      

    } catch (error) {throw new Error('error occured during note update')};
}

export default updateNoteInDatabase;