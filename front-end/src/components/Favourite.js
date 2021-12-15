import React, { useEffect, useState } from 'react'
import { Header, Segment, Icon, Popup } from 'semantic-ui-react'
import { getTokenFromLocalStorage } from '../helpers/auth.js'
import axios from 'axios'

// requirements: ui - toggle making a park a 'favourite', display the park as a favourite if previously marked by the user as such
// requirements: functionality - check if the park is already a user favourite on db; send http requests to add or remove the park from user's favourites in db

const Favourite = ({ park, id }) => {
  const [toggle, setToggle] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [favourite, setFavourite] = useState(null)
  const [favData, setFavData] = useState(null)
  const [userData, setUserData] = useState(null)

  //event handlers to toggle between an outline and full heart favourite icon
  // also set state to be sent when the click event (handleclick) is triggered
  const handleMouseEnter = () => {
    const newFavData = { ...favData, targetPark: id }
    setFavData(newFavData)
    setToggle(true)
  }
  const handleMouseExit = () => {
    console.log(clicked)
    clicked ? setToggle(true) : setToggle(false)
  }

  //make the request to add or remove this park from the user's favourite parks key in the db
  const handleClick = async () => {
    try {
      setToggle(true)
      setClicked(!clicked)
      if (!clicked) {
        await axios.post('/api/favourite-parks', favData, {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      } else {
        await axios.delete('/api/favourite-parks', {
          data: { favData },
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      }
    } catch {
      console.log('error')
    }
  }

  //get the userData of the current user, will be used to check if this park is in their
  // favourite parks key in the useEffect directly below
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      setUserData(data)
    }
    getData()
  }, [])

  // function to check if this park is already in the users FavouriteParks key, check to see if the
  // userData request has returned before running main function.
  useEffect(() => {
    const checkFavourite = () => {
      if (userData === null) {
        return console.log('use effect running on initial render')
      } else {
        const checkPark = userData.favouriteParks.filter(
          x => x._id === park._id
        )
        checkPark.length ? setFavourite(true) : console.log('not a fav park')
      }
    }
    checkFavourite()
  }, [userData, park._id])

  //onclick handler to remove favourite set by useEffect directly above && send
  // a delete request to the db for the current user

  const removeFav = async () => {
    setFavourite(false)
    try {
      await axios.delete('/api/favourite-parks', {
        data: { targetPark: id },
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div color="olive">
      {favourite ? (
        <Segment raised class="parkPageColumns" color="olive">
          <Header as="h3" icon textAlign="center" inverted color="red">
            <Popup trigger={<Icon onClick={removeFav} name="heart" />}>
              <Popup.Content>
                <p>
                  Click to <strong>REMOVE</strong> this park from your
                  favourites
                </p>
              </Popup.Content>
            </Popup>
            <Header.Content>Favourite</Header.Content>
          </Header>
        </Segment>
      ) : (
        <Segment raised class="parkPageColumns" color="olive">
          <Header as="h3" icon textAlign="center" inverted color="red">
            <Popup
              trigger={
                !toggle ? (
                  <Icon
                    onMouseEnter={handleMouseEnter}
                    onClick={handleClick}
                    name="heart outline"
                  />
                ) : (
                  <Icon
                    onClick={handleClick}
                    onMouseLeave={handleMouseExit}
                    name="heart"
                  />
                )
              }>
              <Popup.Content>
                {clicked ? (
                  <p>
                    Click to <strong>REMOVE</strong> this park from your
                    favourites
                  </p>
                ) : (
                  <p>
                    Click to <strong>ADD</strong> this to your favourites
                  </p>
                )}
              </Popup.Content>
            </Popup>
            <Header.Content>Favourite</Header.Content>
          </Header>
        </Segment>
      )}
    </div>
  )
}

export default Favourite
