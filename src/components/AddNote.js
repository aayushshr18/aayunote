import React from 'react'
import { useContext,useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context
    const [note, setNote] = useState({title:"",description:"",tag:"default"})
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        props.showAlert('Added Note Successfully!','success')
        setNote({title:"",description:"",tag:"default"})

    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" minLength={5} required className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" minLength={5} required className="form-control" value={note.description} id="description" name='description' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" minLength={5} required className="form-control" value={note.tag} id="tag" name='tag' onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length<5||note.description.length<5} onClick={handleclick} className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote