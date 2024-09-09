// /frontend/src/components/NoteEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Rich text editor
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const NoteEditor = ({ note, fetchNotes }) => {
  const [content, setContent] = useState(note ? note.content : '');
  const [tags, setTags] = useState(note ? note.tags.join(', ') : '');

  const handleSave = async () => {
    const noteData = {
      content,
      tags: tags.split(',').map(tag => tag.trim())
    };

    try {
      if (note) {
        await axios.put(`http://localhost:5000/api/notes/${note._id}`, noteData);
      } else {
        await axios.post('http://localhost:5000/api/notes', noteData);
      }
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ReactQuill value={content} onChange={setContent} />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button onClick={handleSave}>Save Note</button>
    </div>
  );
};

export default NoteEditor;
