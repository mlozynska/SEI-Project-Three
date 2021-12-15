import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  getTokenFromLocalStorage,
  userIsAuthenticated,
  getPayload,
} from '../helpers/auth'
import {
  Segment,
  Rating,
  Comment,
  Header,
  Form,
  Button,
  Modal,
  Icon,
  Divider,
} from 'semantic-ui-react'
import { toast, ToastContainer, Flip } from 'react-toastify'

export const UserComment = ({ id }) => {
  const [newComment, setNewComment] = useState(false)
  const [open, setOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [allComments, setAllComments] = useState(true)
  const [comment, setComment] = useState({
    text: '',
    rating: 0,
    owner: '',
  })

  // get the payload for the current user, use this to conditionally render a delete button next to comments
  // depending on whether the payload matches that of the owner of the comment
  const getSub = () => {
    const payload = getPayload()
    if (!payload) return
    return payload.sub
  }

  // getTokenFromLocalStorage()

  // get the value of the radio button representing the stars and pass it to the 'comment' state
  const handleStars = e => {
    const rating = e.target.attributes.getNamedItem('aria-posinset').value
    const newComment = { ...comment, rating }
    setComment(newComment)
  }

  const deleteComment = async e => {
    console.log(e.target.value)
    await axios.delete(
      `/api/london-parks-api/${id}/comments/${e.target.value}`,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }
    )
    deletingToast()
    setOpen(false)
    setNewComment(!newComment)
    // setToggle(!toggle)
  }

  const handleChange = event => {
    const newComment = {
      ...comment,
      [event.target.name]: event.target.value,
      owner: getSub(),
    }
    setComment(newComment)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!comment.rating) {
      setToggle(!toggle)
      return
    } else {
      try {
        await axios.post(`/api/london-parks-api/${id}/comments`, comment, {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }, // need to send the token on the headers object
        })
        setNewComment(!newComment)
        addingToast()
        setToggle(false)
        console.log(getSub())
        console.log(allComments[0].owner._id)
      } catch (err) {
        console.log(err)
      }
    }

    document.querySelector('textarea').value = ''
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/london-parks-api/${id}/comments`)
      setAllComments(data)
    }
    getData()
  }, [id, newComment, setAllComments])

  const deletingToast = () => {
    toast.info('Comment is deleted!', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  const addingToast = () => {
    toast.success('Comment is added!', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  return (
    <>
      <Comment.Group>
        <Header as="h3" color="green" dividing>
          Comments
        </Header>
        <Comment>
          <Comment.Content>
            {allComments.length ? (
              allComments.map(comment => {
                return (
                  <>
                    <Comment.Avatar
                      as="a"
                      src={comment.owner.profilePicture}
                      floated="right"
                    />
                    <Comment.Author as="a">
                      {comment.owner.username}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.createdAt.slice(0, 10)}</div>
                    </Comment.Metadata>
                    {comment.owner._id === getSub() && (
                      <Modal
                        closeIcon
                        open={open}
                        trigger={
                          <Button color="red" floated="right">
                            Delete comment
                          </Button>
                        }
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}>
                        <Header icon="archive" content="Deleting comment" />
                        <Modal.Content>
                          <p>Are you sure you want to delete your comment?</p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color="red" onClick={() => setOpen(false)}>
                            <Icon name="remove" /> No
                          </Button>
                          <Button
                            color="green"
                            value={comment._id}
                            onClick={deleteComment}>
                            <Icon name="checkmark" /> Yes
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    )}

                    <Comment.Text>{comment.text}</Comment.Text>
                    <Rating
                      defaultRating={comment.rating}
                      icon="star"
                      maxRating={5}
                      disabled
                    />
                    <Divider />
                  </>
                )
              })
            ) : (
              <Header textAlign="center" as="h2">
                Be first to comment and rate this park!
              </Header>
            )}
            {userIsAuthenticated() ? (
              <Form reply>
                <Form.TextArea
                  onChange={handleChange}
                  name="text"
                  placeholder="Your comment..."
                />
                <Rating
                  onClick={handleStars}
                  icon="star"
                  maxRating={5}
                  name="rating"
                />
                {toggle ? (
                  <>
                    <p style={{ color: 'red' }}>
                      Please add a rating to submit your comment
                    </p>
                    <Button
                      autoFocus
                      onClick={handleSubmit}
                      content="Add Comment"
                      labelPosition="left"
                    />
                  </>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    content="Add Comment"
                    labelPosition="left"
                  />
                )}
              </Form>
            ) : (
              <Segment raised>
                <Header textAlign="center" as="h3">
                  To add comment and rating you have to <a href="/login">Log</a>{' '}
                  in or <a href="/register">Register</a>!
                </Header>
              </Segment>
            )}
          </Comment.Content>
        </Comment>
      </Comment.Group>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Flip}
      />
    </>
  )
}
