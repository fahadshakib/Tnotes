import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './note-creation.styles.scss';
import createNoteInFirestore from '../../utilities/create-note.utilities';
import uploadPhoto from '../../utilities/upload-photo.utilities';
import { useUserContext } from "../../contexts/user.context";
import IconArrow from '../../assets/image/right-arrow.svg';


const CreateNoteForm = () => {

    const navigate = useNavigate();
    const {uid ,forceRefresh} = useUserContext();

    const [formData , setFormData] = useState({
        title : '',
        description : '',
        photo : null
    })
    const {title, description} = formData;
    


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

                const {photo} = formData;

                if(photo){

                    const url = await uploadPhoto(photo , title);
                    const newNote = {
                        title,
                        description,
                        photo: url,
                        createdAt: new Date().toString()
                    }
                    await createNoteInFirestore(uid , newNote);
                    navigate('/');
                    forceRefresh();

                } else {

                    const newNote = {
                        title,
                        description,
                        photo: null,
                        createdAt: new Date().toString()
                    }
                    await createNoteInFirestore(uid , newNote);
                    navigate('/');
                    forceRefresh();
                }
                
            } catch(err){alert(err.message)}
        }

        

    return (

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
    );
}

export default CreateNoteForm;