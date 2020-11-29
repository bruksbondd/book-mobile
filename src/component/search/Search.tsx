import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { searchBook } from '../../store/contactReducer'
import { useDispatch } from 'react-redux'
import './search.scss'

export function Search() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch()
  const handleSearch = (term: string) => {
    setValue(term)
    dispatch(searchBook(term))
  }

  return (
    <div className='contact_search'>
      <TextField
        className='contact_search_input'
        id="outlined-basic"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        label="Search..."
        variant="outlined"
      />
    </div>
  );
}