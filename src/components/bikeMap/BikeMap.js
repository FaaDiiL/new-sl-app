import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MapContainer, TileLayer } from 'react-leaflet' // This is for the map.
import bike from '../../assets/img/bike-icon.svg'
import MarkerPopup from '../markerPopup/MarkerPopup'

const BikeMap = () => {
  let history = useHistory()
  const [selected, setSelected] = useState(
    localStorage.getItem('selected')
      ? JSON.parse(localStorage.getItem('selected'))
      : null
  )
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
                  id={id}
                  setSelected={setSelected}
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
                Du har reserverat en cykel på{' '}
                {selected.data.substring(0, selected.data.indexOf(','))}. Tryck
                på bekräfta knappen för att fortsätta.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                }}
              >
                <p>
                  <span className='bold'>Address: </span>
                  {selected.data.substring(0, selected.data.indexOf(','))}
                </p>
                <p>
                  <span className='bold'>Cykel-ID:</span> {selected.id}
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
            <div style={{ marginTop: '10px' }}>
              <p style={{ marginTop: '10px' }}>
                Var vänlig och välj en cykel med svart cirkel, då röda är
                upptagna för tillfället.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BikeMap
