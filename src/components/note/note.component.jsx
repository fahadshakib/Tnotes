import { useNavigate } from 'react-router-dom';
import './note.styles.scss';
import IconDelete from '../../assets/image/delete.svg';
import IconEdit from '../../assets/image/edit.svg';

const Note = ({id, title , description , photo , creationTime, deleteNoteItem}) => {

    const navigate = useNavigate();

    const handleNavigation = (e) => {

        e.preventDefault();

        const target = e.target.closest('.note');
        if(!target) return;

        const id = target.getAttribute('data-id');
        navigate(`/notes/${id}/modification`);
    }

    return (
        <div className='note' data-id={id}>

            <h4 className='note--title'>
                {title}
            </h4>

            <p className='note--date'>
                {creationTime}
            </p>

            {photo && <img src={photo} alt={title} className='note--image' />}

            <p className='note--description'>
                {description}
            </p>

            <div className='note__icons'>
                <img src={IconEdit} alt="edit note" className='note--icon' onClick={handleNavigation}/>
                <img src={IconDelete} alt="delete note" className='note--icon' onClick={deleteNoteItem}/>
            </div>

        </div>
    )

} 

export default Note;