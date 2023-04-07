import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export const Notes = (props) => {
  const {showAlert}=props;
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
  let navigate=useNavigate();

  useEffect(() => {
    
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate('/login')
    }

  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag});
    
  }
  const ref = useRef(null)
  const refclose = useRef(null) 

  const handleclick=(e)=>{
    console.log('Updating the note...',note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert('Updated Note Successfully!','success');

}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})

}

  return (
    <>
      <AddNote showAlert={showAlert}></AddNote>

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" minLength={5} required  className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" minLength={5} required className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" minLength={5} required className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary" onClick={handleclick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'><h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}
