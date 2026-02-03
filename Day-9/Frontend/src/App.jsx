import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      const res = await axios.get("http://localhost:3000/api/notes")
    setNotes(res.data.notes)
    }

    fetchNotes()
  }, [notes]);

  function titleHandler(e) {
    setTitle(e.target.value);
  }
  function descriptionHandler(e) {
    setDescription(e.target.value);
  }

  function addNote(e) {
    e.preventDefault();
    const note = {
      title: title,
      description: description,
    };

    axios.post("http://localhost:3000/api/notes", note).then(() => {
      console.log("Post submitted");
    });

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
        <input type="submit" value="Create Note" id="button" />
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
