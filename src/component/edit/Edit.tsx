import React, { FC, useState, createRef, useEffect } from 'react'
import { storage } from '../../services/firebase'
import { InputEdit } from '../input/InputEdit';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBook, removeBook } from '../../store/contactReducer'
import { AppStateType } from '../../store/root'
import DeleteIcon from '@material-ui/icons/Delete'

import './edit.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
);

type typeEditItem = {
  id?: string,
  name: string,
  secondName: string,
  phone: string,
  photo: null | File
}

export const Edit: FC = () => {
  const editContact = useSelector((state: AppStateType ) => state.contact.editContact);
  const [value, setValue] = useState<typeEditItem>({name: '', secondName: '', phone: '', photo: null as null | File});
  const [url, setURL] = useState<any>({});
  const [disabled, setDisabled] = useState<boolean>(true);
  const history = useHistory();
  const dispatch = useDispatch()
  const fileInput = createRef<HTMLInputElement>();

  useEffect(() => {
    setValue(editContact)
  }, [editContact])

  const handleOnBlur = (e: any) => {
    setValue({...value, ...e, ...url})
  }

  const fileSelectHandler = (e: any) => {
    if ( e.target.files == null ) {
      throw new Error("Error finding e.target.files");
    }
    if(e.target.files[0].size > 2000000){
      alert("File is too big! Max size 2mb");
      return
    }
    const uploadTask = storage.ref(`/images/${e.target.files[0].name}`).put(e.target.files[0]);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(e.target.files[0].name)
        .getDownloadURL()
        .then((url) => {
          setURL({photo: url});
        });
    });
  }

  const handleRemove = (item: typeEditItem) => {
    if (item.id) {
      dispatch(removeBook(item.id))
    }
    history.push(`/contact`);
  }

  const handleSave = () => {
    if (value.phone === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
    dispatch(createBook({...value, ...url}))
    setValue({name: '', secondName: '', phone: '', photo: null});
    history.push(`/contact`);
  };

  const handleDisabled = (e: boolean) => {
    setDisabled(e)
  }


  const classes = useStyles();

  return (
    <div className="edit">
      <div className="edit_header">
        <h2>Editing Contact</h2>
        <IconButton
          aria-label="delete"
          onClick={(e) => handleRemove(value)}
        >
          <DeleteIcon className='edit_header_delete' />
        </IconButton>
      </div>

    <form className="edit_form">
      <InputEdit data={value.name} name={'name'}  handleDisabled={handleDisabled} handleOnBlur={handleOnBlur} label={'Имя'}  />
      <InputEdit data={value.secondName} name={'secondName'}  handleDisabled={handleDisabled} handleOnBlur={handleOnBlur} label={'Фамилия'} />
      <InputEdit data={value.phone} name={'phone'} handleDisabled={handleDisabled} handleOnBlur={handleOnBlur} label={'Номер'} />
       <div className="edit_form_group_button">
         <div className="edit_form_group_img">
            {url.photo ? <img src={url.photo} alt='' /> : value.photo && <img src={editContact.photo} alt='' />}
            <input
              accept=".jpg, .jpeg, .png"
              className={classes.input}
              id="contained-button-file"
              type="file"

              onChange={fileSelectHandler}
              ref={fileInput}
            />

          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              size="large"
              component="span"
              style={{color: '#00CE80', background: '#fff', border: '1px solid #00CE80'}}
              startIcon={<InsertPhotoIcon style={{color: '#C9D0CD'}} />}>
              Upload
            </Button>
          </label>
         </div>

        <Button
          className="edit_form_save"
          variant="contained"
          size="large"
          style={{color: '#fff', background: '#00CE80'}}
          disabled={disabled}
          onClick={handleSave}
        >
          Save
        </Button>
       </div>




    </form>
    </div>
  );
}