import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Container,
  Divider,
  Grid,
  GridColumn,
  Icon,
  Header,
  Image,
  Reveal,
  RevealContent,
  Segment,
  Rating,
  Modal,
  Button,
  Comment,
} from 'semantic-ui-react'
import { motion } from 'framer-motion'
import axios from 'axios'
import ReactMapGl from 'react-map-gl'

const ParkCard = ({ _id, title, images, postcode, longitude, latitude }) => {
  const [open, setOpen] = useState(false)
  const [openComment, setOpenComment] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const [park, setPark] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/london-parks-api/${_id}`)
      setPark(data)
    }
    getData()
  }, [_id])

  const getAverage = () => {
    const ratings = park.comments.map(c => c.rating)
    const aveRating = ratings.reduce((a, b) => a + b, 0)
    return aveRating / ratings.length
  }

  console.log()

  useEffect(() => {}, [location.pathname, _id])

  return (
    <>
      {park && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}>
          <Container className="parkCardContainer" textAlign="center" key={_id}>
            <Segment piled raised>
              <Grid columns={2} divided>
                <GridColumn onClick={() => history.push(`/parks/${_id}`)}>
                  <Reveal animated="fade" instant>
                    <RevealContent visible>
                      <Image
                        src={images[0]}
                        alt={title}
                        rounded
                        fluid
                        size="big"></Image>
                    </RevealContent>
                    <RevealContent hidden>
                      <Image
                        src={images[1]}
                        alt={title}
                        rounded
                        fluid
                        size="big"></Image>
                    </RevealContent>
                  </Reveal>
                </GridColumn>

                <GridColumn>
                  <motion.div whileHover={{ scale: 1.5 }}>
                    <Header
                      as="h3"
                      icon
                      textAlign="center"
                      inverted
                      color="red">
                      <Icon name="hand point down outline" />
                      <Header.Content>{title}</Header.Content>
                    </Header>
                  </motion.div>

                  <Divider hidden />

                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}>
                    <Modal
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={
                        <Header
                          as="h3"
                          icon
                          textAlign="center"
                          inverted
                          color="blue">
                          <Icon name="home" />
                          <Header.Content>{postcode}</Header.Content>
                        </Header>
                      }>
                      <Header as="h1" textAlign="center">
                        Here is {title}!
                      </Header>
                      <Modal.Content>
                        <Segment raised>
                          <ReactMapGl
                            mapboxApiAccessToken={
                              process.env.REACT_APP_MAPBOX_TOKEN
                            }
                            height="30em"
                            width="100%"
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            zoom={13}
                            latitude={latitude}
                            longitude={longitude}
                          />
                        </Segment>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={() => setOpen(false)} positive>
                          Okay!
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </motion.div>
                  <Divider hidden />
                  {isNaN(getAverage()) ? (
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}>
                      <Header as="h3" icon textAlign="center" color="yellow">
                        <Icon name="star outline" />
                        <Header.Content>
                          Be the first to rate this park!
                        </Header.Content>
                      </Header>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}>
                      <Modal
                        onClose={() => setOpenComment(false)}
                        onOpen={() => setOpenComment(true)}
                        open={openComment}
                        trigger={
                          <Header
                            as="h3"
                            icon
                            textAlign="center"
                            color="yellow">
                            <Icon name="star outline" />
                            <Header.Content>Average Rating</Header.Content>
                            <Rating
                              defaultRating={park.averageRating}
                              icon="star"
                              maxRating={5}
                              disabled
                            />
                          </Header>
                        }>
                        <Header as="h1" textAlign="center">
                          Latest comments!
                        </Header>
                        <Modal.Content scrolling>
                          <Segment raised>
                            {park.comments.length &&
                              park.comments.map(comment => {
                                return (
                                  <>
                                    <Container>
                                      <Comment.Group>
                                        <Comment>
                                          <Comment.Content>
                                            <Comment.Avatar
                                              as="a"
                                              src={comment.owner.profilePicture}
                                              floated="right"
                                            />
                                            <Comment.Author as="a">
                                              {comment.owner.username}
                                            </Comment.Author>
                                            <Comment.Metadata>
                                              <div>
                                                {comment.createdAt.slice(0, 10)}
                                              </div>
                                            </Comment.Metadata>
                                            <Comment.Text>
                                              {comment.text}
                                            </Comment.Text>
                                            <Rating
                                              defaultRating={comment.rating}
                                              icon="star"
                                              maxRating={5}
                                              disabled
                                            />
                                            <Divider />
                                          </Comment.Content>
                                        </Comment>
                                      </Comment.Group>
                                    </Container>
                                  </>
                                )
                              })}
                          </Segment>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            onClick={() => setOpenComment(false)}
                            positive>
                            Okay!
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </motion.div>
                  )}
                </GridColumn>
              </Grid>
            </Segment>
            <Divider hidden />
          </Container>
        </motion.div>
      )}
    </>
  )
}
export default ParkCard
