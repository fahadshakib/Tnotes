import { useUserContext } from "../contexts/user.context";
import ButtonCreate from "../components/button-create/button-create.component";
import SearchBox from "../components/search-box/search-box.component";
import NotesContainer from "../components/notes-container/notes-container.component";
import NoUserComponent from "../components/no-user/no-user.component";


const Home = () => {

    const {user} = useUserContext();

    return(
        <>
            {!user && <NoUserComponent/>}
            {user && <SearchBox/>}
            {user && <ButtonCreate/>}
            {user && <NotesContainer/>}
        </>
    )
}

export default Home;