import React, { FC } from 'react'
import { Link } from 'react-router-dom'

export const NotFound: FC = () => {
  return (
    <>
    <h1>404</h1>
      <Link to="/" >Home Page </Link>
    </>
  )
}