import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home.js'
import NavBarHome from './components/NavBarHome'
import ParkIndex from './components/ParkIndex.js'
import UserProfile from './components/UserProfile.js'
import Region from './components/Region.js'
import ParkPage from './components/ParkPage.js'
import NewRegister from './components/NewRegister.js'
import NewLogin from './components/NewLogin.js'
import { useState } from 'react'
const App = () => {
  const [userData, setUserData] = useState([])

  return (
    <BrowserRouter>
      <NavBarHome userData={userData} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/parks" component={ParkIndex} />
        <Route exact path="/login" component={NewLogin} />
        <Route exact path="/register" component={NewRegister} />
        <Route excat path="/profile">
          {' '}
          <UserProfile setUserData={setUserData} />
        </Route>
        <Route exact path="/parks/region" component={Region} />
        <Route exact path="/parks/:id" component={ParkPage} />
      </Switch>
    </BrowserRouter>
  )
}
export default App
