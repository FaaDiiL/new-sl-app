import React from 'react'
import add from '../../assets/img/Add@2x.svg'

const HandleTicketsList = () => {
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

export default HandleTicketsList
