import './notes-container.styles.scss';
import Note from '../note/note.component';

const NotesContainer = ({notes , deleteNoteItem}) => {


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