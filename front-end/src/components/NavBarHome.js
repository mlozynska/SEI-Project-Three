import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu, Segment, Image, Icon, MenuItem, Header } from 'semantic-ui-react'
import RegionLinks from './RegionLinks'
import { userIsAuthenticated } from '../helpers/auth'
import { ToastContainer, toast, Flip } from 'react-toastify'

const NavBarHome = ({ userData }) => {
  const history = useHistory()
  const [toggle, setToogle] = useState(false)
  const location = useLocation()

  const showMeToast = name => {
    toast.error(`See you soon ${name}!`, {
      position: 'top-left',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  useEffect(() => {}, [location.pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token') // remove token from local storage
    showMeToast(userData.username)
    history.push('/')
  }

  return (
    <>
      <Segment style={{ postion: 'relative' }} color="green" inverted vertical>
        <Menu icon secondary color="green" inverted>
          <MenuItem position="left">
            <Menu.Item onClick={() => history.push('/')}>
              <Icon name="home" size="big" />
            </Menu.Item>
            <Menu.Item
              name="Parks by Region"
              onClick={() => setToogle(!toggle)}
            />
          </MenuItem>
          <Menu.Item>
            <Header as="h1" inverted className="navbarTitle">
              Best London Parks 🌳
            </Header>
          </Menu.Item>
          {userIsAuthenticated() ? (
            <MenuItem position="right">
              <Menu.Item onClick={() => history.push('/profile')}>
                <Image
                  src={userData.profilePicture}
                  size="mini"
                  avatar
                  spaced="right"
                />
                <p>{userData.username}</p>
              </Menu.Item>
              <Menu.Item name="Logout" onClick={handleLogout} />
            </MenuItem>
          ) : (
            <MenuItem position="right">
              <Menu.Item onClick={() => history.push('/login')}>
                Login
              </Menu.Item>
              <Menu.Item onClick={() => history.push('/register')}>
                Register
              </Menu.Item>
            </MenuItem>
          )}
        </Menu>
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
        <>{toggle && <RegionLinks />}</>
      </Segment>
    </>
  )
}

export default NavBarHome
