// /backend/models/Note.js
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    tags: { type: [String], required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
