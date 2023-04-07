import React,{useContext}from 'react'
import noteContext from '../context/notes/noteContext';
import { Notes } from './Notes';

export const Home = (props) => {
    const {showAlert}=props
  return (
    <div>
      <Notes showAlert={showAlert}></Notes>

      
    </div>
  )
}
