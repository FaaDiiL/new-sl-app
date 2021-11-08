import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react'
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
  Route,
  Link,
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
  /* Header - Start */
  #header {
    display: flex;
    justify-content: space-between;
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
      font-size: 4rem;
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
  #buy-btn {
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
      font-size: 1.8rem;
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

      /*
    This doesn't work
    margin-left: -25%;
    margin-top: -25%;
    */
    }
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

const HandleTicketsList = () => {
  // import add from './assets/img/Add@2x.svg'
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
const MarkerPopup = ({ position, data, icon }) => {
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
          : icon.toLowerCase() === 'cu'
          ? CurrentIcon
          : AvailableIcon
      }
    >
      <Popup>{data}</Popup>
    </Marker>
  )
}

const BikeMap = () => {
  const [center, setCenter] = useState({ lat: 59.325, lng: 18.0723 })
  const [zoom, setZoom] = useState(14.5)
  const position = [59.325, 18.0723]
  return (
    <section id='bikeMap'>
      <div id='map'>
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://sl-ext-app.surge.sh">Sl Map!</a>'
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFkaWxtYXAiLCJhIjoiY2t1dWU5OGp3MWtvbzJvcXZybzlpNXFhcSJ9.893BxZCnUJJSSZPa475ibA'
          />
          <MarkerPopup
            position={[59.325, 18.0723]}
            data={'Bike not available to pick.'}
            icon={'un'}
          />
          <MarkerPopup
            position={[59.323, 18.0738]}
            data={'Tullgränd 53, Stockholm, Sweden'}
            icon={'av'}
          />
          <MarkerPopup
            position={[59.324, 18.0708]}
            data={'Espresso House, Västralånggatan 40, Stockholm Sweden '}
            icon={'cu'}
          />
        </MapContainer>
      </div>
      <div id='bikeMapInfo'>
        <div className='top'>
          <img src={bike} alt='White bike icon' />
          <h3>cykel</h3>
        </div>
        <div className='bottom'>
          <p>Info:</p>
          <p>
            Välj en av de svart markerade cyklarna på kartan som du vill
            reservera.
          </p>
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

  return <h3>{timeLeft}</h3>
}

// When the ticket is bought!
const TicketBought = ({ setIsOpen }) => {
  // import qr from './assets/img/Qr@2x.svg'
  let history = useHistory()
  const { time, adult, discount } = JSON.parse(
    localStorage.getItem('userTicket')
  )
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
            {adult !== 0 && `${adult} rabatterad`}
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
const ErrorPage = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <p>Page not found!</p>
    </div>
  )
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEmpty, setIsEmpty] = useState(
    JSON.parse(localStorage.getItem('userTicket'))
      ? JSON.parse(localStorage.getItem('userTicket')).time
      : null
  )
  const [getStorage, setGetStorage] = useState(
    JSON.parse(localStorage.getItem('userTicket'))
  )

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
                  value={`${new Date()} enkelbiljett. ${
                    !isEmpty
                      ? `${isEmpty.adult} vuxen`
                      : `${isEmpty.discount} rabatterad`
                  }`}
                  title='da'
                  style={{ margin: 'auto' }}
                />
                <p>1 vuxen SL</p>
              </div>
            </div>
          )}
          <Route exact path='/'>
            {isEmpty ? <TicketBought setIsOpen={setIsOpen} /> : <YourTickets />}
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
          <Route exact path='/bike-screen'></Route>
          <Footer />
        </Wrapper>
      </Switch>
    </Router>
  )
}

export default App
