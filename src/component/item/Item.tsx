import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './item.scss';
import { useDispatch } from 'react-redux'
import { editBook } from '../../store/contactReducer'

function Item(props: any) {
  const history = useHistory();
  const dispatch = useDispatch()
  const { book } = props
  const pushTo = (id: string) => {
    dispatch(editBook(book))
    history.push(`/edit/${id}`);
  }

  return (
    <div className="contact_item">
      <div className="contact_item_card">
        <div className="contact_item_photo">
          { book.photo
            ? <img src={book.photo} className="contact_item_photo_img" alt="User photo" />
            : <AccountCircleIcon className="contact_item_photo_icon" />
          }
        </div>
        <div className="contact_item_group">
          <div className="contact_item_name">{book.name}<span> {book.secondName}</span></div>
          <div className="contact_item_phone">{book.phone}</div>
        </div>
      </div>
      <div className="contact_item_tool">
        <IconButton
          aria-label="edit"
          onClick={() => pushTo(book.id)}
        >
          <ArrowForwardIosIcon className="contact_item_arrow" />
        </IconButton>
      </div>
    </div>
  );
}
export default Item;
