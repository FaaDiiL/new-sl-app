import React, { useState } from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { Wrapper } from './App-style'
import './App.css'
import dotenv from 'dotenv'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom'
import QRCode from 'react-qr-code'
import YourTickets from './components/yourTickets/YourTickets'
import BuyTicketList from './components/buyTicketList/BuyTicketList'
import HandleTicketsList from './components/handleTicketsList/HandleTicketsList'
import BuyTicket from './components/buyTicket/BuyTicket'
import BikeMap from './components/bikeMap/BikeMap'
import TicketBought from './components/ticketBought/TicketBought'
import BikeSite from './components/bikeSite/BikeSite'

dotenv.config()
// process.env.<Your_Key>                                                 // This is how you pass your env-Variables as Api-key etc..

// Todo - Fixa muspekaren on hover när man trycker på enkel biljett!

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [isEmpty, setIsEmpty] = useState(
    JSON.parse(localStorage.getItem('userTicket'))
      ? JSON.parse(localStorage.getItem('userTicket'))
      : null
  )

  /// Expire Check And Resetter - Start
  function checkExpiration() {
    //check if past expiration date
    let values = JSON.parse(localStorage.getItem('userTicket'))
      ? JSON.parse(localStorage.getItem('userTicket')).time
      : null
    //check "my hour" index here
    if (values < new Date()) {
      localStorage.removeItem('userTicket')
      setIsEmpty(null)
    }
  }
  function myFunction() {
    let myInterval = 0.1 * 60 * 1000 // 10 sec interval
    setInterval(function () {
      checkExpiration()
    }, myInterval)
  }
  myFunction()

  return (
    <Router>
      <Switch>
        <Wrapper>
          {/* This is apear - Start */}
          {isOpen && (
            <div
              className='modal-wrapper'
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen((prev) => !prev)
              }}
            >
              <div className='modal'>
                {/* This is for the generated QR-code image - Start */}
                <QRCode
                  value={`\n Enkelbiljett SL.
                  ${
                    isEmpty.adult & (isEmpty.adult !== 0) &&
                    ` ${isEmpty.adult} vuxen `
                  }
                  ${
                    isEmpty.discount & (isEmpty.discount !== 0) &&
                    `${isEmpty.discount} rabatterad`
                  }
                  ${
                    isEmpty.time &&
                    `
                    \n Expires: 
                    ${new Date(isEmpty.time)
                      .toISOString()
                      .replace(/T/, ' ')
                      .replace(/\..+/, '')}
                      `
                  }
                  `}
                  title='da'
                  style={{ margin: 'auto' }}
                />
                {/* This is for the generated QR-code image - End */}

                {/* This is the text that appears under the QR-code image - Start */}
                <p>{isEmpty.adult !== 0 && `${isEmpty.adult} vuxen `}</p>
                <p>
                  {isEmpty.discount !== 0 && `${isEmpty.discount} rabatterad`}
                </p>
                <p>
                  {isEmpty &&
                    `Expires: ${new Date(isEmpty.time)
                      .toISOString()
                      .replace(/T/, ' ')
                      .replace(/\..+/, '')}`}
                </p>
                {/* This is the text that appears under the QR-code image - End */}
              </div>
            </div>
          )}
          <Route exact path='/'>
            {/* If no tickets, show empty black box with information else show Ticket */}
            {isEmpty ? (
              <TicketBought isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
              <YourTickets />
            )}
            <BuyTicketList />
            <HandleTicketsList />
          </Route>

          <Route exact path='/buy-ticket'>
            <Header />
            <BuyTicket setIsEmpty={setIsEmpty} />
          </Route>

          <Route exact path='/pick-bike'>
            <Header />
            <BikeMap selected={selected} setSelected={setSelected} />
          </Route>

          <Route exact path='/bike-screen'>
            <Header />
            <BikeSite
              isEmpty={isEmpty}
              selected={selected}
              setSelected={setSelected}
            />
          </Route>
          <Footer />

          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Wrapper>
      </Switch>
    </Router>
  )
}

export default App
