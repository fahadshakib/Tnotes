import {v4 as uuid} from 'uuid';
import {doc, setDoc , collection} from 'firebase/firestore';
import {db, COLLECTION_NOTES} from '../firebase.config';


const createNoteInFirestore = async (uid, note) => {

  if (!uid || !note) return;

  try {

    const collectionRef = collection(db, COLLECTION_NOTES);
    const id = uuid();
    await setDoc(doc(collectionRef, id), { uid, ...note });

  } catch (error) {throw new Error('error during note creation')}
};


export default createNoteInFirestore;