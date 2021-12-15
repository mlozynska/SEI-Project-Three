import React from 'react'
import {
  Segment,
  Grid,
  Header,
  Container,
  Divider,
  Image,
} from 'semantic-ui-react'

const ParkInfo = ({ park }) => {
  const cyclingFriendly = () => {
    if (park.cyclistFriendly === 'yes') {
      return (
        <Image
          src={
            'https://media.istockphoto.com/illustrations/green-bicycle-traffic-sign-vector-icon-illustration-id1162027328?k=20&m=1162027328&s=170667a&w=0&h=FRM8rA0O-oCFfVUND-eg1m8ICpUealQ8Rw0a8Sk98OU='
          }
          size="tiny"
          left
          id="greenBicycle"
        />
      )
    }
    if (park.cyclistFriendly === 'no') {
      return (
        <Image
          src={
            'https://previews.123rf.com/images/almightyalex/almightyalex1810/almightyalex181001450/111051484-stop-or-ban-sign-with-cyclist-icon-isolated-on-white-background-cycling-is-prohibited-vector-illustr.jpg'
          }
          size="tiny"
          left
          id="no-cycle"
        />
      )
    } else {
      return (
        <>
          <Segment.Inline>
            <Grid column={2}>
              <Image
                src={
                  'https://media.istockphoto.com/illustrations/green-bicycle-traffic-sign-vector-icon-illustration-id1162027328?k=20&m=1162027328&s=170667a&w=0&h=FRM8rA0O-oCFfVUND-eg1m8ICpUealQ8Rw0a8Sk98OU='
                }
                size="tiny"
                left
                id="greenBicycle"
              />
              <Header as="h6" textAlign="left" id="header-park-info">
                <a
                  href={
                    'https://www.royalparks.org.uk/managing-the-parks/cycling-in-the-royal-parks'
                  }>
                  with some restrictions
                </a>
              </Header>
            </Grid>
          </Segment.Inline>
        </>
      )
    }
  }

  const dogsFriendly = () => {
    if (park.dogFriendly === 'yes') {
      return (
        <Image
          src={'https://static.thenounproject.com/png/14830-200.png'}
          size="tiny"
          left
          id="dog-yes"
        />
      )
    }
    if (park.dogFriendly === 'no') {
      return (
        <Image
          src={
            'https://createsigns.co.nz/wp-content/uploads/2017/05/No-Pets-Service-Animals-Allowed-Sign-No-Dog-Icon-1.png'
          }
          size="small"
          left
          id="no-dog"
        />
      )
    } else {
      return (
        <>
          <Segment.Inline>
            <Grid column={2}>
              <Image
                src={
                  'https://etc.usf.edu/clipart/70300/70382/70382_262_rg-110_s_md.gif'
                }
                size="tiny"
                left
              />
              <Header as="h6" textAlign="left" id="header-park-info">
                <a
                  href={
                    'https://www.royalparks.org.uk/managing-the-parks/park-regulations-legislation-and-policies/dogs-in-the-royal-parks'
                  }>
                  with some restrictions
                </a>
              </Header>
            </Grid>
          </Segment.Inline>
        </>
      )
    }
  }

  return (
    <>
      <Segment raised color="olive">
        <Grid columns={3}>
          <Grid.Column>
            <Container id="postCodeContainer">
              <Header as="h4" textAlign="left" color="olive">
                <Segment.Inline>
                  <Container>
                    <p>Postcode</p>
                  </Container>
                  <Container>
                    <p>{park.postcode}</p>
                  </Container>
                </Segment.Inline>
              </Header>
            </Container>
          </Grid.Column>

          <Grid.Column>
            <Segment basic>{dogsFriendly()}</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment basic>{cyclingFriendly()}</Segment>
          </Grid.Column>
        </Grid>

        <Divider />

        <Segment.Inline>
          <Grid column={2}>
            <Image
              src={
                'https://thumbs.dreamstime.com/b/web-vector-icon-arrow-website-icon-cursor-move-web-vector-icon-arrow-website-icon-cursor-move-122726028.jpg'
              }
              size="tiny"
            />
            <p textAlign="left" as="h6">
              <a href={park.url}>{park.title}</a>
            </p>
          </Grid>
        </Segment.Inline>
      </Segment>
    </>
  )
}
export default ParkInfo
