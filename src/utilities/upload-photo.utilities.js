import { ref , getDownloadURL, uploadBytes} from 'firebase/storage';
import { storage } from "../firebase.config";

const uploadPhoto = async (photo, name) => {

    if (!photo) return null;
        
    try {
        
        let ext = photo.name.split('.');
        ext = ext[ext.length -1];
        name = name.split(' ').join('-') + '.' + ext;
        const storageReference = ref(storage , 'photos/' + name );
        await uploadBytes(storageReference , photo);
        const url = await getDownloadURL(storageReference);
        return url;
  
    } catch (error) {throw new Error('error during photo upload')}
  
  };


export default uploadPhoto;