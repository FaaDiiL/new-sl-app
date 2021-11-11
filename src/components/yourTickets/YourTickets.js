import React from 'react'

const YourTicket = () => {
  return (
    <section id='your-tickets' style={{ margin: '10px' }}>
      <div className='sub-title--container'>
        <h2 className='sub-title'>Dina biljetter</h2>
      </div>
      <div className='ticket-placeholder-empty'>
        <p>Du har inga biljetter på den här telefonen.</p>
      </div>
    </section>
  )
}

export default YourTicket
