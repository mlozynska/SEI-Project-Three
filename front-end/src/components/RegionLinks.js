import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

const RegionLinks = () => {
  const [toggle, setToggle] = useState(true)

  const history = useHistory()
  const redirect = e => {
    setToggle(!toggle)
    e.target.dataset.id === 'All'
      ? history.push('/parks')
      : history.push({ pathname: '/parks/region', state: e.target.dataset.id })
  }

  const displayToggle = () => (toggle ? 'visable' : 'none')

  return (
    <motion.div
      initial={{ opacity: 0, translateY: '0' }}
      animate={{ opacity: 0.7, translateY: '10px' }}
      transition={{ delay: 0.2 }}
      style={{
        position: 'absolute',
        left: '5.5em',
        top: '4em',
        background: 'green',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        display: displayToggle(),
        borderRadius: '5px',
        padding: '20px',
        zIndex: 1,
      }}>
      <motion.p
        whileHover={{ scale: 1.2 }}
        data-id="North%20London"
        onClick={redirect}>
        North London
      </motion.p>
      <motion.p
        whileHover={{ scale: 1.2 }}
        data-id="Central%20London"
        onClick={redirect}>
        Central London
      </motion.p>
      <motion.p
        whileHover={{ scale: 1.2 }}
        data-id="South%20London"
        onClick={redirect}>
        South London
      </motion.p>
      <motion.p
        whileHover={{ scale: 1.2 }}
        data-id="East%20London"
        onClick={redirect}>
        East London
      </motion.p>
      <motion.p
        whileHover={{ scale: 1.2 }}
        data-id="West%20London"
        onClick={redirect}>
        West London
      </motion.p>
      <motion.p whileHover={{ scale: 1.2 }} data-id="All" onClick={redirect}>
        All Parks
      </motion.p>
    </motion.div>
  )
}

export default RegionLinks
