import React from 'react'
import { useHistory } from 'react-router-dom'
import CountDownTimer from '../countDownTimer/CountDownTimer'
import qr from '../../assets/img/Qr@2x.svg'

const TicketBought = ({ setIsOpen }) => {
  let history = useHistory()
  const { adult, discount } = JSON.parse(localStorage.getItem('userTicket'))
    ? JSON.parse(localStorage.getItem('userTicket'))
    : null
  return (
    <section id='your-tickets'>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Dina biljetter</h2>
      </div>
      <div id='tickets--active'>
        <div className='tickets-top'>
          <CountDownTimer />
          <p>Enkelbiljett SL</p>
          <p>
            {adult !== 0 && `${adult} vuxen `}
            {discount !== 0 && `${discount} rabatterad`}
          </p>
        </div>
        <div className='tickets-bottom hover'>
          <p onClick={() => history.push('/pick-bike')}>Reservera cykel</p>
          <div
            className='tickets-bottom-right  hover'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p>Visa biljett</p>
            <img src={qr} alt='white qr-code icon' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketBought
