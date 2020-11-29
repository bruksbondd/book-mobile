import React, { useState, useEffect, FC } from 'react';

import Divider from '@material-ui/core/Divider';
import Item from './../item/Item';
import { useDispatch, useSelector } from 'react-redux'
import { editBook, getBook } from '../../store/contactReducer'
import { AppStateType } from '../../store/root'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { useHistory } from 'react-router-dom'
import './listItem.scss'

const ListItem: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const allContacts = useSelector((state: AppStateType ) => state.contact.searchContacts);

  useEffect(() => {
    dispatch(getBook())
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(editBook({}))
    history.push(`/edit/`);
  };


  return (
    <div className="contact_list">
      {allContacts.map((book: any, i: number) => {
        return (
          <div key={book.id}>
            <Item book={book}/>
            {i < allContacts.length - 1 && <Divider/>}
          </div>
        )
      })}
      <Fab className="contact_list_add" onClick={handleAdd} aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
};
export default ListItem;
