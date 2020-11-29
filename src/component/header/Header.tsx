import React from 'react'
import { Router, Link, NavLink } from 'react-router-dom'

import './heade.scss'

export const Header = () => {
  return (
      <div className="header">
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
  )
}