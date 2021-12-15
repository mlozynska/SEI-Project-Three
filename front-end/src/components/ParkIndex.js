import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ParkCard from './ParkCard'
import { Segment, Header } from 'semantic-ui-react'

const ParkIndex = () => {
  const [parks, setParks] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/london-parks-api')
      setParks(data)
    }
    getData()
  }, [])
  console.log(parks)
  return (
    <>
      <Segment raised className="regionTitle">
        <Header as={'h1'} textAlign={'center'} id="parkHeader" color="green">
          All Parks 🍂
        </Header>
      </Segment>
      {parks.map(park => {
        return (
          <ParkCard
            _id={park._id}
            title={park.title}
            images={park.images}
            description={park.description}
            postcode={park.postcode}
            activities={park.activites}
            url={park.url}
            latitude={parseFloat(park.latitude)}
            longitude={parseFloat(park.longitude)}
          />
        )
      })}
    </>
  )
}
export default ParkIndex
