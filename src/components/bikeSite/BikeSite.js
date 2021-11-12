import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CountDownTimer from '../countDownTimer/CountDownTimer'
import bike from '../../assets/img/bike-icon.svg'

const BikeSite = ({ isEmpty }) => {
  let history = useHistory()
  // eslint-disable-next-line
  const [selected, setSelected] = useState(
    localStorage.getItem('selected')
      ? JSON.parse(localStorage.getItem('selected'))
      : null
  )

  return (
    <div id='bikeSiteInfo'>
      <div id='bike-site-card'>
        <div className='top'>
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h3>Tid kvar</h3>
            <CountDownTimer />
          </div>
        </div>
      </div>

      <div id='bike-site-info'>
        <div className='top'>
          <img src={bike} alt='White bike icon' />
          <h3>cykel</h3>
        </div>
        <div className='bottom'>
          <p>Info:</p>
          <p className='info-description'>
            Var vänlig tryck på avsluta-knappen när du är färdig med cykelturen.
            Med vänliga hälsningar SL.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <p>
              <span>Address: </span>
              {selected &&
                selected.data.substring(0, selected.data.indexOf(','))}
            </p>
            <p>
              <span>Cykel-ID: </span> {selected && selected.id}
            </p>
          </div>

          <button
            style={{ background: '#dc3545' }}
            className='button'
            onClick={() => {
              history.push('/')
              localStorage.removeItem('selected')
            }}
          >
            Avsluta
          </button>
        </div>
      </div>
    </div>
  )
}

export default BikeSite
