import journey from '../../assets/img/Journey@2x.svg'
import ticket from '../../assets/img/Ticket@2x.svg'
import more from '../../assets/img/More-1.svg'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom'
const Footer = () => {
  return (
    <section id='footer'>
      <ul>
        <li>
          <img src={journey} alt='Resa' />
          <p>Resa</p>
        </li>
        <li className='hover'>
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
export default Footer
