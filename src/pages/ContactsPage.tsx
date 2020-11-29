import React, { FC } from 'react'
import '../App.scss'
import { Search } from '../component/search/Search'
import ListItem from '../component/listItem/ListItem'

export const ContactsPage: FC = () => {
  return (
    <div className="contact">
      <h1>Contact</h1>
      <Search />
      <ListItem />
    </div>
  )
}