import { BaseThunkType, InferActionsTypes } from './root'
import { bookRef } from '../services/firebase'

const initialState = {
  allContacts: [] as Array<object>,
  searchContacts: [] as Array<object>,
  editContact: {name: '', secondName: '', phone: '', photo: null} as any,
  loadingContacts: true as boolean,
  errorContacts: null as null
}

export const contactsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'MB/BOOK/GET_BOOK':
    case 'MB/BOOK/SEARCH_BOOK':
    case 'MB/BOOK/EDIT_BOOK':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const actions = {
  getBook: (allContacts: Array<object>) =>
    ({
      type: 'MB/BOOK/GET_BOOK',
      payload: {
        allContacts,
        loadingContacts: true,
        errorContacts: null,
      },
    } as const),
  searchBook: (searchContacts: Array<object>) =>
    ({
      type: 'MB/BOOK/SEARCH_BOOK',
      payload: {
        searchContacts,
        loadingContacts: true,
        errorContacts: null,
      },
    } as const),
  editBook: (editContact: {}) =>
    ({
      type: 'MB/BOOK/EDIT_BOOK',
      payload: {
        editContact,
        loadingContacts: true,
        errorContacts: null,
      },
    } as const),
}

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export const searchBook = (term: string = ''): ThunkType => async (dispatch, getState) => {
  const allContacts = getState().contact.allContacts
  if(term.length === 0) {
    dispatch(actions.searchBook(allContacts))
  } else {
    const searche = allContacts.filter((item: any) => {
      if (term.length !== 0 && item.name) {
        return  item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
      } else if (term.length !== 0 && item.secondName) {
        return  item.secondName.toLowerCase().indexOf(term.toLowerCase()) > -1
      } else if (term.length !== 0 && item.phone) {
        return  item.phone.toLowerCase().indexOf(term.toLowerCase()) > -1
      }
    })
    dispatch(actions.searchBook(searche))
  }
}

export const getBook = (): ThunkType =>  async (dispatch) => {
  bookRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState: Array<object> = [];
    for (let item in items) {
      newState.push({
        ...items[item], id: item
      });
    }
    dispatch(actions.getBook(newState))
    dispatch(searchBook())
  })
}

export const createBook = (item: {id: string}): ThunkType =>  async (dispatch) => {
  try {
    if (item.id) {
      await bookRef.child(item.id).update(item)
    } else {
      bookRef.push(item)
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const editBook = (item: {}): ThunkType =>  async (dispatch) => {
  dispatch(actions.editBook(item))
}

export const removeBook = (id: string): ThunkType => async (dispatch) => {
  bookRef.child(id).remove()
}




