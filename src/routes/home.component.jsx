import { useState , useEffect } from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db , COLLECTION_NOTES} from '../firebase.config';
import {useUserContext} from '../contexts/user.context';
import deleteNoteFromFirestore from '../utilities/delete-note.utilities';
import ButtonCreate from "../components/button-create/button-create.component";
import SearchBox from "../components/search-box/search-box.component";
import NotesContainer from "../components/notes-container/notes-container.component";
import NoUserComponent from "../components/no-user/no-user.component";


const Home = () => {

    const { uid, user } = useUserContext();
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState(null);


    const handleChange = (e) => {

        const keyword = e.target.value.toLowerCase();

        if (!keyword) {
            setFilteredNotes(null);
            return;
        }

        const filteredNotes = notes.filter((item) => {
            const title = item.title.toLowerCase();
            const description = item.description.toLowerCase();
            return title.includes(keyword) || description.includes(keyword);
        });

        setFilteredNotes(filteredNotes);
    };


    const deleteNoteItem = async (noteID) => {

        try {

            await deleteNoteFromFirestore(noteID);
            setNotes(notes.filter(item => item.id !== noteID));
            setFilteredNotes(filteredNotes ? filteredNotes.filter(item => item.id !== noteID) : null);

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

    return(
        <>
            {!user && <NoUserComponent/>}
            {user && <SearchBox handleChange={handleChange}/>}
            {user && <ButtonCreate/>}
            {user && <NotesContainer notes={filteredNotes !== null ? filteredNotes : notes} deleteNoteItem={deleteNoteItem} />}
        </>
    )
}

export default Home;