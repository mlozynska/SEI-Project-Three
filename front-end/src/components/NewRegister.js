import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Form,
  Button,
  Grid,
  GridColumn,
  Segment,
  Header,
} from 'semantic-ui-react'
import { ImageUploadField } from './ImageUploadField'
import { motion } from 'framer-motion'

const NewRegister = () => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: '',
    passwordConfirmation: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    profilePicture: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = e => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('api/register', formData)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profilePicture: url })
  }

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}>
      <Grid centered>
        <GridColumn style={{ maxWidth: 550, marginTop: 100 }}>
          <Segment>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Username</label>
                <input
                  required={true}
                  placeholder="Username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                />
                {errors.username && (
                  <Header sub color="red">
                    User name has to be unique
                  </Header>
                )}
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  required={true}
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <Header sub color="red">
                    Email address has to be unique
                  </Header>
                )}
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
                {errors.passwordConfirmation && (
                  <Header sub color="red">
                    Passwords does not match!
                  </Header>
                )}
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="passwordConfirmation"
                  onChange={handleChange}
                />
                {errors.password && (
                  <Header sub color="red">
                    Passwords does not match!
                  </Header>
                )}
              </Form.Field>
              <Form.Field>
                <ImageUploadField
                  value={formData.profilePicture}
                  name="profilePicture"
                  handleImageUrl={handleImageUrl}
                />
              </Form.Field>
              <Button positive fluid type="submit">
                Submit
              </Button>
            </Form>
          </Segment>
        </GridColumn>
      </Grid>
    </motion.div>
  )
}

export default NewRegister
