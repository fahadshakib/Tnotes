import { Routes , Route } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import Home from "./routes/home.component";
import CreateNoteForm from './routes/note-creation/note-creation.component';
import EditNoteForm from './routes/note-modification/note-modification.component';
import RouteError from "./routes/route-error/route-error.component";

const App = () => {

  return  (

    <Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path="/notes/creation" element={<CreateNoteForm/>}/>
            <Route path="/notes/:id/modification" element={<EditNoteForm/>}/>
        </Route>
        <Route path="*" element={<RouteError/>}/>
    </Routes>
  )
}
export default App
