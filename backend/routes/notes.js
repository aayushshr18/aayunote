const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

//ROUTE 1 GET ALL THE NOTES
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some Error Occured !")

    }

})

//ROUTE 2 to add NOTES
router.post('/addnote', fetchuser, [
    body('title', "Enter a Valid Title!").isLength({ min: 3 }),
    body("description", "Enter a Valid Description!").isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()
        res.json(savednote);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some Error Occured !")

    }

})

//ROUTE  to update a note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title }
        if (tag) { newNote.tag = tag }
        if (description) { newNote.description = description }

        //finding the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send('Not Found!')
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some Error Occured !")

    }

})

//Route 4 To delete a note  
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //finding the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send('Not Found!')
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some Error Occured !")

    }

})


module.exports = router