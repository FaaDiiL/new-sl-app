import React, { useState, useEffect } from 'react'

const CountDownTimer = () => {
  // eslint-disable-next-line
  const [timeLeft, setTimeLeft] = useState(null)
  const [h, setH] = useState(null)
  const [m, setM] = useState(null)
  const [s, setS] = useState(null)

  function parseMillisecondsIntoReadableTime(milliseconds) {
    //Get hours from milliseconds
    let hours = milliseconds / (1000 * 60 * 60)
    let absoluteHours = Math.floor(hours)
    setH(absoluteHours > 9 ? absoluteHours : '0' + absoluteHours)

    //Get remainder from hours and convert to minutes
    let minutes = (hours - absoluteHours) * 60
    let absoluteMinutes = Math.floor(minutes)
    setM(absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes)

    //Get remainder from minutes and convert to seconds
    let seconds = (minutes - absoluteMinutes) * 60
    let absoluteSeconds = Math.floor(seconds)
    setS(absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds)
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

  return (
    <div>
      {h && (
        <>
          <h3 style={{ fontSize: '3.5em', display: 'inline' }}>{`${h}:`}</h3>
          <h3 style={{ fontSize: '3.5em', display: 'inline' }}>{`${m}:`}</h3>
          <h3 style={{ fontSize: '3.5em', display: 'inline' }}>{`${s}`}</h3>
        </>
      )}
    </div>
  )
}

export default CountDownTimer
