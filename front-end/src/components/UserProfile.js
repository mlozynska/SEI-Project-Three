import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import {
  Grid,
  Card,
  GridColumn,
  Image,
  Button,
  Modal,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const UserProfile = ({ setUserData }) => {
  const [userInfo, setUserInfo] = useState([])
  const [favParks, setFavParks] = useState([])
  const [joinData, setJoinDate] = useState([])
  const [open, setOpen] = useState(false)
  const history = useHistory()

  const showMeToast = name => {
    toast.info(`Welcome ${name}!`, {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      setUserInfo(data)
      setFavParks(data.favouriteParks)
      setJoinDate(data.createdAt)
      showMeToast(data.username)
    }
    getData()
  }, [])

  setUserData(userInfo)

  const handleDelete = async event => {
    event.preventDefault()
    try {
      await axios.delete(`/api/profile/${userInfo._id}`, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }, // need to send the token on the headers object
      })
      window.localStorage.removeItem('token')
      history.push('/parks')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 160,
          damping: 20,
        }}>
        <Grid centered>
          <GridColumn>
            <Card fluid>
              <Image src={userInfo.profilePicture} centered size="big" fluid />
              <Card.Content>
                <Card.Header as="h1">{userInfo.username}</Card.Header>
                <Card.Meta>
                  <span className="date">Joined: {joinData.slice(0, 10)}</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Modal
                  closeIcon
                  open={open}
                  trigger={
                    <Button color="red" floated="right">
                      Delete my profile
                    </Button>
                  }
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}>
                  <Header icon="archive" content="Deleting your profile" />
                  <Modal.Content>
                    <p>
                      Are you sure you want to delete your profile?
                      <br />
                      All data will be lost
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={() => setOpen(false)}>
                      <Icon name="remove" /> No
                    </Button>
                    <Button color="green" onClick={handleDelete}>
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Card.Content>
            </Card>
          </GridColumn>
        </Grid>
      </motion.div>

      <Segment>
        <Header as="h1" textAlign="center">
          Your favourite parks in London!
        </Header>
      </Segment>
      <Grid centered celled="internally">
        {favParks.map(park => {
          return (
            <motion.div
              whileHover={{
                position: 'relative',
                zIndex: 1,
                scale: [1, 1.4, 1.2],
                rotate: [0, 10, -10, 0],
                filter: [
                  'hue-rotate(0) contrast(100%)',
                  'hue-rotate(360deg) contrast(200%)',
                  'hue-rotate(45deg) contrast(300%)',
                  'hue-rotate(0) contrast(100%)',
                ],
                transition: {
                  duration: 0.2,
                },
              }}>
              <Segment vertical textAlign="left">
                <Card
                  onClick={() => history.push(`/parks/${park._id}`)}
                  key={park._id}>
                  <Image src={park.images[0]} />
                  <Card.Content>
                    <Card.Header>{park.title}</Card.Header>
                    <Card.Meta>
                      <span className="date">{park.postcode}</span>
                    </Card.Meta>
                    <Card.Description>{park.region}</Card.Description>
                  </Card.Content>
                </Card>
              </Segment>
            </motion.div>
          )
        })}
      </Grid>
    </>
  )
}

export default UserProfile
