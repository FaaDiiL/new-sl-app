import React from 'react'
import unAvailableIcon from '../../assets/img/unAvailable.svg'
import currentIcon from '../../assets/img/Current.svg'
import availableIcon from '../../assets/img/Available.svg'
import LeafLet from 'leaflet'
import { Marker, Popup } from 'react-leaflet' // This is for the map.

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
          if (id < 2000) {
            setSelected({ id, data, position })
            localStorage.setItem(
              'selected',
              JSON.stringify({ id, data, position })
            )
          }
          if (id >= 2000) {
            console.log('FuckYou')
            setSelected(null)
            localStorage.removeItem('selected')
          }
        },
      }}
    >
      <Popup>{data}</Popup>
    </Marker>
  )
}

export default MarkerPopup
