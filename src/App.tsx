import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import MainPage from "./pages/MainPage";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";
import LayOut from "./components/LayOut";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const createTag = (tag: Tag): void => {
    setTags([...tags, tag]);
  };
  const createNote = (noteData: NoteData): void => {
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };
    setNotes([...notes, newNote]);
  };
  const deleteNote = (id: string): void => {
    setNotes(notes.filter((n) => n.id !== id));
  };
  const updateNote = (id: string, updatedData: NoteData): void => {
    const updatedArr = notes.map((note) =>
      note.id === id ? { id, ...updatedData } : note
    );
    setNotes(updatedArr);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <Create
              createTag={createTag}
              handleSubmit={createNote}
              availableTags={tags}
            />
          }
        />
        <Route path="/note/:id" element={<LayOut notes={notes} />}>
          <Route index element={<Detail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <Edit
                handleSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
