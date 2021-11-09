import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import './App.css'
import dotenv from 'dotenv'
import journey from './assets/img/Journey@2x.svg'
import ticket from './assets/img/Ticket@2x.svg'
import more from './assets/img/More-1.svg'
import arrow from './assets/img/Arrow-left.svg'
import add from './assets/img/Add@2x.svg'
import qr from './assets/img/Qr@2x.svg'
import bike from './assets/img/bike-icon.svg'
import unAvailableIcon from './assets/img/unAvailable.svg'
import currentIcon from './assets/img/Current.svg'
import availableIcon from './assets/img/Available.svg'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' // This is for the map.
import LeafLet from 'leaflet'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom'
import QRCode from 'react-qr-code'
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
    height: 58px;
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
      height: 47.2em;
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
        margin: 0 10%;
      }
    }
  }
  /* ChooseBike - End */

  /* Mobile View Media queries - Start */
  @media only screen and (max-width: 600px) {
    height: 100vh;
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
// Styling - Start

const Footer = () => {
  // import journey from './assets/img/Journey@2x.svg'
  // import ticket from './assets/img/Ticket@2x.svg'
  // import more from './assets/img/More-1.svg'
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

const BuyTicketList = () => {
  let history = useHistory()
  return (
    <section id='buy-tickets'>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Köp ny biljett</h2>
      </div>
      <ul className='list'>
        <li className='item-first' onClick={() => history.push('/buy-ticket')}>
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

const HandleTicketsList = () => {
  // import add from './assets/img/Add@2x.svg'
  return (
    <section id='handle-tickets'>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Hantera biljetter</h2>
      </div>
      <ul className='list'>
        <li className='item-first'>
          <h4>Köphistorik och kvitton</h4>
        </li>
        <li className='item item-double'>
          <h4>Lägg till nytt betalkort</h4>
          <img src={add} alt='white plus sign' />
        </li>
        <li className='item item-double'>
          <h4>Förlustgaranti</h4>
          <p>Logga in för att aktivera</p>
        </li>
        <li className='item'>
          <h4>Återskapa appbiljetter</h4>
        </li>
      </ul>
    </section>
  )
}
//
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
    console.log(e.target.id)
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
    setIsEmpty({ time: setTimeleft(0, 1, 15, 0), adult, discount })
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

// Marker Icon - Start

// Marker Icon - End

// Marker with popup
const MarkerPopup = ({ position, data, id, icon, setSelected }) => {
  const AvailableIcon = LeafLet.icon({
    iconUrl: availableIcon,
    iconRetinaUrl: availableIcon,
    iconAnchorUrl: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 33],
    className: 'leaflet-venue-icon',
  })
  const UnAvailableIcon = LeafLet.icon({
    iconUrl: unAvailableIcon,
    iconRetinaUrl: unAvailableIcon,
    iconAnchorUrl: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 33],
    className: 'leaflet-venue-icon',
  })

  const CurrentIcon = LeafLet.icon({
    iconUrl: currentIcon,
    iconRetinaUrl: currentIcon,
    iconAnchorUrl: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 33],
    className: 'leaflet-venue-icon',
  })

  return (
    <Marker
      position={position}
      icon={
        icon.toLowerCase() === 'un'
          ? UnAvailableIcon
          : id && icon.toLowerCase() === 'cu'
          ? CurrentIcon
          : AvailableIcon
      }
      eventHandlers={{
        click: (e) => {
          console.log('marker clicked', e)
          id < 2000 && setSelected({ id, data, position })
          id >= 2000 && setSelected({ id: null, data: null, position: null })
        },
      }}
    >
      <Popup>{data}</Popup>
    </Marker>
  )
}

const BikeMap = () => {
  let history = useHistory()
  const [selected, setSelected] = useState(null)
  // eslint-disable-next-line
  const [center, setCenter] = useState({ lat: 59.325, lng: 18.0723 })
  // eslint-disable-next-line
  const [zoom, setZoom] = useState(14.5)
  const unAvailableBikes = [
    {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 2001,
            address: 'Skeppsbron 48, 111 30 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.073854083670014, 59.3221009653255],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2002,
            address: 'Skeppsbron 30, 111 30 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.074830407760885, 59.32401680162444],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2003,
            address: 'Österlånggatan 51, 111 31 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.073768252980692, 59.323261427636176],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2004,
            address: 'Stora Nygatan, 111 27 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.0708500095442, 59.32352416831883],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2005,
            address: 'Götgatan 41, 116 21 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.072912310358202, 59.315781643723106],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2006,
            address: 'Repslagargatan 23, 118 26 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.071351856686768, 59.31612350577681],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2007,
            address: 'Götgatan 48, 118 26 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.072499842156272, 59.31555958280601],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 2008,
            address: 'Östgötagatan 2, 116 25 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.07502111865471, 59.317546959048826],
          },
        },
      ],
    },
  ]
  const availableBikes = [
    {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            id: 1001,
            address: 'Hornsgatan 15, 118 46 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.068729606507596, 59.31896639538102],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 1002,
            address: 'Peter Myndes backe 3, 116 46 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.07186600406549, 59.31946327066],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 1003,
            address: 'Hornsgatan 1, 118 46 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.07039032876245, 59.31977077060217],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 1004,
            address: 'Bellmansgatan 1, 118 20 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.06460998954469, 59.32071705089169],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 1005,
            address: 'Skeppsbron 46, 111 30 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.07390116159388, 59.32233737408552],
          },
        },
        {
          type: 'Feature',
          properties: {
            id: 1006,
            address: 'Kornhamnstorg 61, 111 27 Stockholm',
          },
          geometry: {
            type: 'Point',
            coordinates: [18.072521200867797, 59.32237709067251],
          },
        },
      ],
    },
  ]

  return (
    <section id='bikeMap'>
      <div id='map'>
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://sl-ext-app.surge.sh">Sl Map!</a>'
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFkaWxtYXAiLCJhIjoiY2t1dWU5OGp3MWtvbzJvcXZybzlpNXFhcSJ9.893BxZCnUJJSSZPa475ibA'
          />

          {unAvailableBikes.map((test) =>
            test.features.map(
              (
                {
                  properties: { address, id },
                  geometry: {
                    coordinates: [longitude, latitude],
                  },
                },
                i
              ) => (
                <MarkerPopup
                  key={id}
                  position={[latitude, longitude]}
                  data={address}
                  icon={'un'}
                />
              )
            )
          )}

          {availableBikes.map((test) =>
            test.features.map(
              (
                {
                  properties: { address, id },
                  geometry: {
                    coordinates: [longitude, latitude],
                  },
                },
                i
              ) => (
                <MarkerPopup
                  key={id}
                  position={[latitude, longitude]}
                  data={address}
                  id={id}
                  icon={selected && selected.id === id ? 'cu' : 'av'}
                  setSelected={setSelected}
                />
              )
            )
          )}
        </MapContainer>
      </div>
      <div id='bikeMapInfo'>
        <div className='top'>
          <img src={bike} alt='White bike icon' />
          <h3>cykel</h3>
        </div>
        <div className='bottom'>
          {selected ? (
            <>
              <p>Info:</p>
              <p>
                Du har reserverat en cykel på {selected.data}. Tryck på bekräfta
                knappen för att fortsätta.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>
                  <span style={{ fontWeight: 'bold', fontFamily: 'slBold' }}>
                    Address:{' '}
                  </span>
                  {selected.address}
                </p>
                <p>
                  <span style={{ fontWeight: 'bold', fontFamily: 'slBold' }}>
                    Cykel-ID:
                  </span>{' '}
                  {selected.id}
                </p>
              </div>
              <button
                className='button'
                onClick={() => history.push('/bike-screen')}
              >
                Bekräfta
              </button>
            </>
          ) : (
            <>
              <p>
                Var vänlig och välj en cykel med svart cirkel, då röda är
                upptagna för tillfället.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null)
  function parseMillisecondsIntoReadableTime(milliseconds) {
    //Get hours from milliseconds
    let hours = milliseconds / (1000 * 60 * 60)
    let absoluteHours = Math.floor(hours)
    let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours

    //Get remainder from hours and convert to minutes
    let minutes = (hours - absoluteHours) * 60
    let absoluteMinutes = Math.floor(minutes)
    let m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes

    //Get remainder from minutes and convert to seconds
    let seconds = (minutes - absoluteMinutes) * 60
    let absoluteSeconds = Math.floor(seconds)
    let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds

    return h + ':' + m + ':' + s
  }

  useEffect(() => {
    const timer = setInterval(() => {
      let diff =
        JSON.parse(localStorage.getItem('userTicket')).time -
        +new Date().getTime()
      diff > 0
        ? setTimeLeft(parseMillisecondsIntoReadableTime(diff))
        : setTimeLeft(null)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <h3 style={{ fontSize: '3.5em' }}>{timeLeft}</h3>
}

// When the ticket is bought!
const TicketBought = ({ setIsOpen }) => {
  // import qr from './assets/img/Qr@2x.svg'
  let history = useHistory()
  const { adult, discount } = JSON.parse(localStorage.getItem('userTicket'))
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
        <div className='tickets-bottom'>
          <p onClick={() => history.push('/pick-bike')}>Reservera cykel</p>
          <div
            className='tickets-bottom-right'
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

const BikeSite = ({ isEmpty }) => {
  let history = useHistory()

  return (
    <div style={{ height: '680px' }}>
      <div style={{ height: '46em' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#167E50',
            height: '20em',
            margin: '2em',
            borderRadius: '16px',
          }}
        >
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h3>Tid kvar</h3>
            <CountDownTimer />
          </div>
        </div>
      </div>
      <div id='bikeMapInfo'>
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-around',

            width: '20em',
          }}
        >
          <img src={bike} alt='White bike icon' />
          <h3>cykel</h3>
        </div>
        <div style={{ padding: '2em' }} className='bottom'>
          <p>Info:</p>
          <p>
            Du har reserverat en cykel på . Tryck på bekräfta knappen för att
            fortsätta.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p>
              <span style={{ fontWeight: 'bold', fontFamily: 'slBold' }}>
                Address: {isEmpty && isEmpty.address}
              </span>
            </p>
            <p>
              <span style={{ fontWeight: 'bold', fontFamily: 'slBold' }}>
                Cykel-ID: {isEmpty && isEmpty.id}
              </span>{' '}
            </p>
          </div>
          <button
            style={{ background: '#dc3545' }}
            className='button'
            onClick={() => history.push('/')}
          >
            Avsluta
          </button>
        </div>
      </div>
    </div>
  )
}
function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEmpty, setIsEmpty] = useState(
    JSON.parse(localStorage.getItem('userTicket'))
      ? JSON.parse(localStorage.getItem('userTicket'))
      : null
  )

  /// Expire Check And Resetter - Start
  function checkExpiration() {
    //check if past expiration date
    let values = JSON.parse(localStorage.getItem('userTicket'))
      ? JSON.parse(localStorage.getItem('userTicket'))
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

  /// Expire Check And Resetter - End

  /* 
  .toLocaleString('sv-SE', {
     timeZone: 'Europe/Stockholm',
   })
   */
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
            {!isEmpty ? (
              <YourTickets />
            ) : (
              <TicketBought setIsOpen={setIsOpen} />
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
            <BikeMap />
          </Route>

          <Route exact path='/bike-screen'>
            <Header />
            <BikeSite isEmpty={isEmpty} />
          </Route>
          <Footer />

          {/* <Route path='*'>
            <Redirect to='/' />
          </Route> */}
        </Wrapper>
      </Switch>
    </Router>
  )
}

export default App
