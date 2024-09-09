// /frontend/src/components/NoteList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteEditor from './NoteEditor';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NoteEditor note={editingNote} fetchNotes={fetchNotes} />
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
            <p>Tags: {note.tags.join(', ')}</p>
            <button onClick={() => setEditingNote(note)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
