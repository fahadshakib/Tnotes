import {doc, deleteDoc} from 'firebase/firestore';
import {db, COLLECTION_NOTES} from '../firebase.config';

const deleteNoteFromFirestore = async (noteID) => {

    try {

        await deleteDoc(doc(db, COLLECTION_NOTES, noteID));

    } catch (error) {throw new Error('error during deletion of note item')}
};

export default deleteNoteFromFirestore;