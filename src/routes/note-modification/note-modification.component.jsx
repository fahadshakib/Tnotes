import { useState , useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import './note-modification.styles.scss';
import { useUserContext } from "../../contexts/user.context";
import getNoteFromFirestore from '../../utilities/get-note-item.utilities';
import uploadPhoto from '../../utilities/upload-photo.utilities';
import updateNoteInDatabase from '../../utilities/update-note.utilities';
import Message from '../../components/message/message.component';
import IconArrow from '../../assets/image/right-arrow.svg';


const EditNoteForm = () => {

    const navigate = useNavigate();
    const {id : noteID} = useParams();
    const {uid ,forceRefresh} = useUserContext();
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);
    const [success , setSuccess] = useState('');
    const [hideSuccess , setHideSuccess] = useState(true);

    let noteTitle = '', noteDescription = '', noteImage = null;

    const [formData , setFormData] = useState({
        title: noteTitle,
        description: noteDescription,
        photo: noteImage
    })

    const {title , description} = formData;

    useEffect(() => {

        const fetchNote = async () => {

            try {

                const { title, description, photo } = await getNoteFromFirestore(noteID);
                setFormData({
                    title: title || '',
                    description: description || '',
                    photo: photo || null
                });

            } catch (error) {alert('error getting note information')}
        };

        fetchNote();

    }, [noteID]);

    const handleChange = (event) => {

        const { name, value, files } = event.target;

        if ((name === 'photo') && files && (files.length > 0)) {

            setFormData((oldData) => ({
                ...oldData,
                photo: files[0]
            }));

        } else {

            setFormData((oldData) => ({
                ...oldData,
                [name]: value
            }));
        }
    };
    

    const handleNoteUpdate = async (e) => {

            e.preventDefault();

            try{

                const {photo} = formData;
                let url = null;

                if(photo) url = await uploadPhoto(photo , title);
                
                const noteData = {title, description, photo:url}
                await updateNoteInDatabase(noteID , noteData);
                setSuccess('🎉🎉 note update completed');
                setTimeout(()=> {
                    navigate('/');
                    forceRefresh();
                }, 4100)
                
                
            }  catch(err){setWarning(`😢 ${err.message}`)}
    }

    useEffect(() => {

        if (success) {

            setHideSuccess(false);

            const timeout = setTimeout(() => {

                setHideSuccess(true);
                setSuccess(''); 

            }, 4000);
            
            return () => clearTimeout(timeout);
        }

    }, [success]);

    useEffect(() => {

        if (warning) {

            setHideWarning(false);

            const timeout = setTimeout(() => {

                setHideWarning(true);
                setWarning('');

            }, 2400);

            return () => clearTimeout(timeout);
        }

    }, [warning]);       

    return (

        <>

        <form className="form" onSubmit={handleNoteUpdate}>

            <div className="form__field">
                <label className="form__field--label">
                    title :
                </label>
                <input 
                    className="form__field--input"
                    type='text'  
                    name='title' 
                    value={title} 
                    onChange={handleChange} 
                    placeholder='enter note title'  required/>
            </div>
            <div className="form__field form__field-image">
                <label className="form__field--label">
                  photo (*optional) :
                </label>
                <input 
                    className="form__field--input form__field--input-image"
                    type='file'  
                    name='photo' 
                    accept="/image*"
                    onChange={handleChange}/>
            </div>
            <div className="form__field">
                <label className="form__field--label">
                    description :
                </label>
                <textarea 
                    className="form__field--input"
                    type='text'  
                    name='description' 
                    value={description} 
                    onChange={handleChange} 
                    placeholder='enter some details'  required/>
            </div>

            <button type="submit" className="form__button">
                update note
                <img src={IconArrow} alt="proceed" className="form__button--arrow"/>
            </button>

        </form>

        {!hideSuccess  && <Message  msg={success} type='success'/>}
        {!hideWarning  && <Message  msg={warning} type='error'/>}
    </>

    );
}

export default EditNoteForm;