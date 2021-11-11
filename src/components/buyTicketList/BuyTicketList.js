import React from 'react'
import { useHistory } from 'react-router-dom'
const BuyTicketList = () => {
  let history = useHistory()
  return (
    <section id='buy-tickets'>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Köp ny biljett</h2>
      </div>
      <ul className='list'>
        <li
          className='item-first'
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/buy-ticket')}
        >
          <h4>Enkelbiljett</h4>
          <p>Obegränsat antal resor inom 75 minuter</p>
        </li>
        <li className='item'>
          <h4>30-dagarsbiljett</h4>
          <p>För dig som reser regelbundet</p>
        </li>
        <li className='item'>
          <h4>Övriga biljetter</h4>
          <p>Se hela biljettutbudet</p>
        </li>
      </ul>
    </section>
  )
}

export default BuyTicketList
