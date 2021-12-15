import React from 'react'
import { Header, Segment, Image, List } from 'semantic-ui-react'

const Activities = ({ park }) => {
  return (
    <Segment raised color="olive" id="activities-segment" fluid>
      <div>
        <Header as="h4" textAlign="left" color="olive">
          <Image
            src={
              'https://img.freepik.com/free-vector/landscape-park-scene-icon_24877-56515.jpg?size=338&ext=jpg'
            }
            alt={park.title}
            size="massive"
            left
          />
          Activities
        </Header>
        <List bulleted animated verticalAlign="middle">
          {park.activites.map(activ => {
            return <List.Item>{activ}</List.Item>
          })}
        </List>
      </div>
    </Segment>
  )
}
export default Activities
