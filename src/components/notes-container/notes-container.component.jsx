import { useState , useEffect } from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import './notes-container.styles.scss';
import {db , COLLECTION_NOTES} from '../../firebase.config';
import {useUserContext} from '../../contexts/user.context';
import deleteNoteFromFirestore from '../../utilities/delete-note.utilities';
import Note from '../note/note.component';

const NotesContainer = () => {

    const { uid, user } = useUserContext();
    const [notes, setNotes] = useState([]);




    const deleteNoteItem = async (noteID) => {

        try {

            await deleteNoteFromFirestore(noteID);
            setNotes(notes.filter(item => item.id !== noteID));

        } catch (error) {

            alert(error.message);
        }
    };


    useEffect(() => {

        const fetchNotesFromDatabase = async () => {

            if (!user) return;

            const q = query(collection(db, COLLECTION_NOTES), where('uid', '==', uid));

            const unsubscribe = onSnapshot(q, (snapshot) => {

                const updatedNotes = [];
                snapshot.forEach((doc) => {

                    const noteId = doc.id;
                    const noteData = doc.data();
                    updatedNotes.push({ id: noteId, ...noteData });
                });

                setNotes(updatedNotes);

            });

            return () => unsubscribe();
        };

        fetchNotesFromDatabase();

    }, [uid, user]);


    return (

        <div className="notes-container">
            {notes && notes.map((item) => (<Note key={item.id} 
                    id={item.id}
                    title={item.title} 
                    description={item.description} 
                    photo={item.photo}
                    creationTime = {item.createdAt}
                    deleteNoteItem={() => deleteNoteItem(item.id)}/>))
            }
        </div>
    )
}


export  default NotesContainer;