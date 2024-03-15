import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './note-creation.styles.scss';
import createNoteInFirestore from '../../utilities/create-note.utilities';
import uploadPhoto from '../../utilities/upload-photo.utilities';
import { useUserContext } from "../../contexts/user.context";
import Message from '../../components/message/message.component';
import IconArrow from '../../assets/image/right-arrow.svg';


const CreateNoteForm = () => {

    const navigate = useNavigate();
    const {uid ,forceRefresh} = useUserContext();
    const [warning , setWarning] = useState('');
    const [hideWarning , setHideWarning] = useState(true);
    const [success , setSuccess] = useState('');
    const [hideSuccess , setHideSuccess] = useState(true);

    const [formData , setFormData] = useState({
        title : '',
        description : '',
        photo : null
    })
    const {title, description} = formData;
    


    const generateDate = () => {

        const currentDate = new Date().toString().split(' ');
        return currentDate.slice(1,5).join(' ') + ' ' + currentDate.slice(6,currentDate.length).join(' ').split('(')[1].split(')')[0];

    }

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
    

    const handleNoteUpload = async (e) => {

            e.preventDefault();

            try{

                let url = null;
                const {photo} = formData;
                if(photo) url = await uploadPhoto(photo , title)

                const noteData = {
                    title: title.trim(),
                    description: description.trim(),
                    photo: url,
                    createdAt: generateDate()
                }
                await createNoteInFirestore(uid , noteData);
                setSuccess('🎉 note added successfully');
                setTimeout(()=> {
                    navigate('/');
                    forceRefresh();
                }, 4100)
                
                
            } catch(err){setWarning(`😢 ${err.message}`)}
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

        <form className="form" onSubmit={handleNoteUpload}>

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
                create note
                <img src={IconArrow} alt="proceed" className="form__button--arrow"/>
            </button>

        </form>

        {!hideSuccess  && <Message  msg={success} type='success'/>}
        {!hideWarning  && <Message  msg={warning} type='error'/>}

        </>
    );
}

export default CreateNoteForm;