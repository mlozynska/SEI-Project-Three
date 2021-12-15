import React, { useState } from 'react'
import {
  Form,
  Grid,
  Segment,
  GridColumn,
  Button,
  Header,
} from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

const NewLogin = () => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(false)

  const handleChange = e => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
  }

  const setItemToLocalStorage = token =>
    window.localStorage.setItem('token', token)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      setItemToLocalStorage(data.token)
      history.push('/profile')
    } catch (err) {
      setError(true)
    }
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
                <label>Email</label>
                <input
                  required={true}
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                />
                {error && (
                  <Header sub color="red">
                    Login or password are inncorect!
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
                {error && (
                  <Header sub color="red">
                    Password or login are inncorect!
                  </Header>
                )}
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

export default NewLogin
