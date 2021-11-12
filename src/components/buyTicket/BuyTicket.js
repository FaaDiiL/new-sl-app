import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
const BuyTicket = ({ setIsEmpty }) => {
  let history = useHistory()
  const [discount, setDiscount] = useState(0)
  const [adult, setAdult] = useState(1)
  const setTimeleft = (
    addDays = 0,
    addHours = 1,
    addMinutes = 15,
    addSeconds = 0
  ) => {
    let date = new Date() // Todays date - the Date() constructor will default to the current date/time if no value is passed to it

    // Add hours
    // The getTime() method returns the number of milliseconds since January 1, 1970, so we can use it to alter the value of the date by any number of milliseconds
    date.setTime(date.getTime() + addHours * 60 * 60 * 1000) // Convert hours to milliseconds - 60 minutes to an hour, 60 seconds to a minute, 1000 milliseconds to a second

    // Add days
    date.setTime(date.getTime() + addDays * 24 * 60 * 60 * 1000) // Similar to above, but additionally multiplying by 24 as there are 24 hours in a day

    // Add minutes
    date.setTime(date.getTime() + addMinutes * 60 * 1000) // Convert minutes to milliseconds

    // Add seconds
    date.setTime(date.getTime() + addSeconds * 1000) // Convert seconds to milliseconds

    return date.getTime()
  }

  const handleClick = (e) => {
    switch (e.target.id) {
      case 'decreaseAdult':
        setAdult((prev) => prev - 1)
        break
      case 'increaseAdult':
        setAdult((prev) => prev + 1)

        break
      case 'decreaseDiscounted':
        setDiscount((prev) => prev - 1)
        break
      case 'increaseDiscounted':
        setDiscount((prev) => prev + 1)
        break

      default:
        break
    }
  }

  const handleSubmit = () => {
    localStorage.setItem(
      'userTicket',
      JSON.stringify({ time: setTimeleft(0, 1, 15, 0), adult, discount })
    )
    setIsEmpty({ time: setTimeleft(0, 1, 15, 10), adult, discount })
    history.push('/')
  }

  return (
    <>
      <section id='buy-ticket-info'>
        <p>Biljetterna börjar gälla direkt efter genomfört köp.</p>
      </section>
      <section id='buy-ticket-main'>
        <ul className='list'>
          <li className='item item-first'>
            <p>Biljettyp</p>
            <p>EnkelBiljett SL</p>
          </li>
          <li className='item'>
            <p>Antal vuxen</p>
            <div id='adult-controller'>
              <button
                disabled={adult === 0 ? true : false}
                className={`decrease ${adult === 0 ? 'disabled-btn' : ''}`}
                id='decreaseAdult'
                onClick={handleClick}
              >
                -
              </button>
              <p>{adult}</p>
              <button
                className='increase'
                id='increaseAdult'
                onClick={handleClick}
              >
                +
              </button>
            </div>
          </li>
          <li className='item'>
            <p>Antal rabatterat</p>
            <div id='discount-controller'>
              <button
                disabled={discount === 0 ? true : false}
                className={`decrease ${discount === 0 ? 'disabled-btn' : ''}`}
                id='decreaseDiscounted'
                onClick={handleClick}
              >
                -
              </button>
              <p>{discount}</p>
              <button
                className='increase'
                id='increaseDiscounted'
                onClick={handleClick}
              >
                +
              </button>
            </div>
          </li>
          <li className='item'>
            <p>Att betala</p>
            <p>{adult * 38 + discount * 25} kr</p>
          </li>
        </ul>
        <button id='buy-btn' onClick={handleSubmit}>
          Betala
        </button>
      </section>
    </>
  )
}

export default BuyTicket
