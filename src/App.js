import React, { useState } from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import styled from 'styled-components'
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

// Styling - Start
const Wrapper = styled.section`
  color: white;
  position: relative;
  max-width: 37.5em;
  height: 74.7em;
  margin: 0 auto;
  border: 1px solid black;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  .hover {
    & :hover {
      cursor: pointer;
    }
  }
  p {
    font-family: slRegular;
    color: #c1c4cb;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: slBold;
    letter-spacing: 1px;
  }
  /* Header - Start */
  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    padding: 0 10px;
    background: #20252b;
    border-bottom: 1px solid #4a4f55;
    height: 4.5em;
  }
  /* Header - End */

  #your-tickets {
    min-height: 180px;
  }
  #tickets--active {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #167e50;
    color: white;
    margin: 0 5px;
    margin-bottom: 15px;
    border-radius: 14px;
    height: 180px;
    padding: 10px;
  }
  .tickets-top {
    padding-top: 15px;
    p,
    h3 {
      margin: 0;
      color: white;
    }
    h3 {
      font-family: slBold;
      font-weight: bold;
    }
    & :nth-child(2) {
      font-weight: bold;
    }
  }
  .tickets-bottom {
    color: white;
    display: flex;
    width: 100%;
    justify-content: space-between;
    p {
      margin: 0;
      color: white;
    }
    & :nth-child(2) {
      padding-right: 5px;
      font-weight: bold;
    }
    img {
      width: 2.2em;
    }
  }
  .tickets-bottom-right {
    display: flex;
    align-items: center;
    & :nth-child(1) {
      padding-right: 5px;
    }
  }

  /* Buy Ticket View - Star */
  #buy-btn,
  .button {
    background: #2970f0;
    color: #ffffff;
    font-family: slRegular;
    font-size: 1.8rem;
    letter-spacing: 1px;
    display: block;
    width: 94%;
    border-radius: 8px;
    padding: 14px;
    margin: 0 auto;
    border: none;
  }
  .button {
    padding: 8px;
  }
  #buyTicket {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    border-bottom: 1px solid #4a4f55;
    & :nth-child(2) {
      font-family: slBold;
      color: white;
    }
  }
  #buy-ticket-info {
    height: 50px;
    display: flex;
    p {
      margin: auto;
    }
  }
  #buy-ticket-main {
    height: 588px;
    p {
      margin: 0;
      display: inline-block;
      color: white;
      font-family: slBold;
    }
    ul {
      list-style-type: none;
      margin: 0 5px;
      padding: 0;
      color: white;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 15px;
      padding: 10px;
    }
    li div {
      display: flex;
      align-items: center;

      p {
        padding: 0 9px;
      }
    }
    li button {
      background: #2970f0;
      outline: none;
      border: none;
      width: 35px;
      height: 35px;
      border-radius: 4px;
      font-size: 3em;
      font-family: slRegular;
      color: white;
      line-height: 10px;
    }
    .disabled-btn {
      background: #4c5157;
    }
    ul li:last-child {
      margin-bottom: 15px;
      border-bottom: 1px solid #a4a9ad;
    }
    ul li:first-child {
      border-top: 1px solid #4a4f55;
      border-bottom: 1px solid #4a4f55;
    }
    .item {
      border-bottom: 1px solid #4a4f55;
    }
    .item-double {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  /* Buy Ticket View - End */

  .sub-title--container {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
  }
  .sub-title {
    margin: 0;
    padding: 0;
    margin-top: 5px;
    padding-top: 14px;
    margin-left: 5px;
    border-top: 4px solid #2a6fee;
    display: inline-block;
  }
  /* The empty black box when there is no tickets bought - Start */
  .ticket-placeholder-empty {
    display: flex;
    background: black;
    margin: 0 0px;
    margin-bottom: 15px;
    border-radius: 8px;
    height: 90px;
  }
  .ticket-placeholder-empty p {
    margin: auto;
  }
  /* The empty black box when there is no tickets bought - End */
  .list {
    list-style-type: none;
    margin: 0 5px;
    padding: 0;
  }
  .list:last-child {
    margin-bottom: 15px;
  }
  .item-first {
    border-top: 1px solid #e9eef4;
    border-bottom: 1px solid #e9eef4;
    padding: 10px;
  }
  .item {
    border-bottom: 1px solid #e9eef4;
    padding: 10px;
  }
  .item-double {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Handle Tickets - Start */
  /* Handle Tickets - End */

  /* Footer - Start */
  #footer {
    position: sticky;
    bottom: 0;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 59px;
    background: #20252b;
    border-top: 1px solid #4a4f55;
    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-evenly;
      list-style-type: none;
    }
    li {
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      align-content: center;
      p {
        display: block;
        font-family: slRegular;
        margin: 0px auto;
      }
      .active {
        color: #80b3f5;
      }
      img {
        display: block;
        margin: 0px auto;
        padding-top: 2px;
        height: 3.5rem;
      }
    }
  }
  /* Footer - Start */

  /* ChooseBike - Start */
  #bikeMap {
    display: flex;
    flex-direction: column;
    #map {
      height: 47em;
    }
    #bikeMapInfo {
      background: #4c5157;
      height: 17.1em;
      width: 100%;
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #697078;
        * {
          padding: 0 20px;
          margin: 10px 0;
        }
        h3 {
          font-family: 'slRegular';
          font-weight: normal;
        }
      }
      .bottom {
        margin: 0 20px;
        > p:first-child {
          font-size: 2em;
          font-weight: bold;
          font-family: slBold;
          color: white;
        }
        .bold {
          font-family: slBold;
          font-weight: bold;
          color: white;
        }
      }
    }
  }
  /* ChooseBike - End */

  #bikeSiteInfo {
    display: flex;
    flex-direction: column;
    margin: auto;
    min-height: 64em;
    justify-content: space-between;
    #bike-site-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #167e50;
      color: white;
      margin: 0 px;
      margin-bottom: 15px;
      border-radius: 14px;
      height: 180px;
      padding: 10px;
      margin: auto;
      width: 90%;
      .top {
        margin: auto;
      }
    }
    #bike-site-info {
      background: #4c5157;
      min-height: 17.01em;
      width: 100%;
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #697078;
        * {
          padding: 0 20px;
          margin: 10px 0;
        }
        h3 {
          font-family: 'slRegular';
          font-weight: normal;
        }
      }
      .bottom {
        margin: 0 20px;
        > p:first-child {
          margin-top: 0px;
          font-size: 2em;
          font-family: 'slBold';
          color: white;
        }
        .info-description {
          margin-top: 0px;
        }
        span {
          font-weight: 'bold';
          font-family: 'slBold';
          color: white;
        }
      }
      button {
        margin-top: 0px;
      }
    }
  }

  /* Mobile View Media queries - Start */
  @media only screen and (max-width: 600px) {
    height: 80vh;
    border: none;
    margin-bottom: -57px;
    #handle-tickets,
    #your-tickets,
    #buy-ticket-info,
    #buy-tickets,
    #bikeMap {
      margin-bottom: 57px;
    }
    #footer {
      position: fixed;
      bottom: 0px;
      left: 0;
      width: 100%;
      margin-bottom: 0px;
    }

    #bikeMap {
      margin-top: -30px;
      padding-bottom: 0px;
      margin-bottom: 0px;
      #map {
        margin-top: 0px;
        .top {
          height: 10px;
        }
      }
      margin-top: 0px;
      #bikeMapInfo {
        height: 26vh;
        margin: -140px 0;
      }
    }

    #bikeSiteInfo {
      margin-top: -30px;
      padding-bottom: 0px;
      margin-bottom: 0px;
      #bike-site-card {
        margin-top: 130px;
        .top {
          height: 180px;
        }
      }
      margin-top: -80px;
      #bike-site-info {
        height: 30.7vh;
      }
    }
  }
  /* Mobile View Media queries - End */

  /*modal*/

  .modal-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    .modal {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      padding: 10px;
      text-align: center;
      p {
        color: black;
      }
    }
    /* modal end */
  }
`
// Styling - End
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
          {isOpen && (
            <div
              className='modal-wrapper'
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen((prev) => !prev)
              }}
            >
              <div className='modal'>
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
              </div>
            </div>
          )}
          <Route exact path='/'>
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
