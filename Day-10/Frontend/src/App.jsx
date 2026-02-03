import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState('')

    async function fetchNotes() {
      const res = await axios.get("/api/notes")
    setNotes(res.data.notes)
    }

  useEffect(() => {
    fetchNotes()
  }, []);

  function titleHandler(e) {
    setTitle(e.target.value);
  }
  function descriptionHandler(e) {
    setDescription(e.target.value);
  }

  async function deleteHandler(id) {
    await axios.delete('/api/notes/'+id)
    fetchNotes()

    console.log("Note Deleted");
  }

  async function updateHandler(id) {

    const note = notes.find(obj=> obj._id === id);
    const {title,description} = note

    setTitle(title)
    setDescription(description)
    setId(id)

    document.querySelector('.update').style.display = 'block';
  }

  async function updateNote(note) {
    const {title,description} = note
    await axios.patch('/api/notes/'+id,{title,description})

      fetchNotes()
    console.log("Note Updated succesfully");
  }

  async function createNote(note){
    axios.post("/api/notes", note).then(() => {
      fetchNotes()
      console.log("Post submitted");
    });
  }

  function addNote(e) {
    e.preventDefault();
    const note = {
      title: title,
      description: description,
    };

    if(e.nativeEvent.submitter.classList.contains('update')){
      updateNote(note)
    }
    else{
      createNote(note)
    }

    setTitle("");
    setDescription("");
  }

  return (
    <>
      <form onSubmit={addNote}>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => {
            titleHandler(e);
          }}
        />
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => {
            descriptionHandler(e);
          }}
        ></textarea>
        <div className="btns">
          <input type="submit" value="Create Note" id="button" />
        <input type="submit" value="Update Note" id="button" className="update" />
        </div>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>

              <p>{note.description}</p>
              
              <button 
              className="btn"
              onClick={()=>{
                updateHandler(note._id)
              }}
              >
                Update
                </button>
              
              <button 
              className="btn del"
              onClick={()=>{
                deleteHandler(note._id)
              }}
              >
                delete
                </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
