import React from 'react'
import { useHistory } from 'react-router-dom'
import arrow from '../../assets/img/Arrow-left.svg'

const Header = () => {
  let history = useHistory()
  return (
    <header id='header'>
      <img
        src={arrow}
        alt='Pil pekar mot vänster'
        onClick={() => history.push('/')}
      />
      {/* // TODO - Appears only in BuyTicket view */}
      <p>Bekräfta</p>
      <p onClick={() => history.push('/')}>Avbryt</p>
    </header>
  )
}

export default Header
