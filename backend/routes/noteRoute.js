// /backend/routes/noteRoutes.js
const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
    const { content, tags } = req.body;
    try {
        const newNote = new Note({
            content,
            tags
        });
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send('Note not found');
        res.json(note);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    const { content, tags } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, { content, tags }, { new: true });
        if (!note) return res.status(404).send('Note not found');
        res.json(note);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).send('Note not found');
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
