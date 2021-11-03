import React from 'react'
import styled from 'styled-components'
import './App.css'
import dotenv from 'dotenv'
import journey from './assets/img/Journey@2x.svg'
import ticket from './assets/img/Ticket@2x.svg'
import more from './assets/img/More-1.svg'
// import arrow from './assets/img/Arrow-left.svg'
import add from './assets/img/Add@2x.svg'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
dotenv.config()
// process.env.<Your_Key>                                                 // This is how you pass your env-Variables as Api-key etc..
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' // This is for the map.

// Styling - Start
const Wrapper = styled.section`
  color: white;
  position: relative;
  max-width: 375px;
  height: 747px;
  margin: 0 auto;
  border: 1px solid black;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  p {
    font-family: slRegular;
    color: #c1c4cb;
    font-size: 1.6rem;
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

  #your-tickets {
    min-height: 180px;
  }
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
    border-top: 2px solid #2a6fee;
    display: inline-block;
  }
  /* The empty black box when there is no tickets bought - Start */
  .ticket-placeholder-empty {
    display: flex;
    background: black;
    margin: 0 5px;
    margin-bottom: 15px;
    border-radius: 8px;
    height: 100px;
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
    height: 57px;
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
        font-size: 1.6rem;
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

  @media only screen and (max-width: 600px) {
    min-height: 98vh;
    border: none;
  }
`

const Footer = () => {
  return (
    <section id='footer'>
      <ul>
        <li>
          <img src={journey} alt='Resa' />
          <p>Resa</p>
        </li>
        <li>
          <img src={ticket} alt='Biljetter' />
          <p className='active'>Biljetter</p>
        </li>
        <li>
          <img src={more} alt='Mer' />
          <p>Mer</p>
        </li>
      </ul>
    </section>
  )
}
const YourTickets = () => {
  return (
    <section id='your-tickets'>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Dina biljetter</h2>
      </div>
      <div className='ticket-placeholder-empty'>
        <p>Du har inga biljetter på den här telefonen.</p>
      </div>
    </section>
  )
}

const BuyTicket = () => {
  return (
    <section id='buy-tickets'>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Köp ny biljett</h2>
      </div>
      <ul className='list'>
        <li className='item-first'>
          <h3>Enkelbiljett</h3>
          <p>Obegränsat antal resor inom 75 minuter</p>
        </li>
        <li className='item'>
          <h3>30-dagarsbiljett</h3>
          <p>För dig som reser regelbundet</p>
        </li>
        <li className='item'>
          <h3>Övriga biljetter</h3>
          <p>Se hela biljettutbudet</p>
        </li>
      </ul>
    </section>
  )
}

const HandleTickets = () => {
  return (
    <section id='handle-tickets'>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Hantera biljetter</h2>
      </div>
      <ul className='list'>
        <li className='item-first'>
          <h3>Köphistorik och kvitton</h3>
        </li>
        <li className='item item-double'>
          <h3>Lägg till nytt betalkort</h3>
          <img src={add} alt='white plus sign' />
        </li>
        <li className='item item-double'>
          <h3>Förlustgaranti</h3>
          <p>Logga in för att aktivera</p>
        </li>
        <li className='item'>
          <h3>Återskapa appbiljetter</h3>
        </li>
      </ul>
    </section>
  )
}
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Wrapper>
            <YourTickets />
            <BuyTicket />
            <HandleTickets />
            <Footer />
          </Wrapper>
        </Route>
        <Route exact path='/to'>
          <Wrapper>
            <YourTickets />
            <Footer />
          </Wrapper>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
