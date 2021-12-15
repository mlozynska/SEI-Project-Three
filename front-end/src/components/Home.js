import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index'

const Home = () => {
  return (
    <Carousel
      infiniteLoop={true}
      autoFocus={true}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      className="homeCarousel">
      <div>
        <img
          alt="imag"
          src="https://www.parkgrandlancastergate.co.uk/blog/wp-content/uploads/2018/01/hyde-poark-2.jpg"
        />
        <Link to={{ pathname: '/parks' }}>
          <Segment fluid inverted color="olive">
            <Header className="homePageFooter" as="h1">
              All Parks
            </Header>
          </Segment>
        </Link>
      </div>

      <div>
        <img
          alt="imag"
          src="https://cdn.shopify.com/s/files/1/0014/0633/7135/articles/primrose_hill_1200x.jpg?v=1532604924"
        />
        <Link to={{ pathname: '/parks/region', state: 'North%20London' }}>
          <Segment fluid inverted color="olive">
            <Header className="homePageFooter" as="h1">
              North London
            </Header>
          </Segment>
        </Link>
      </div>

      <div>
        <img src="https://i0.wp.com/www.montcalmroyallondoncity.co.uk/blog/wp-content/uploads/2017/12/shutterstock_156450068.jpg?fit=1000%2C667&ssl=1" />
        <Link to={{ pathname: '/parks/region', state: 'East%20London' }}>
          <Segment fluid inverted color="olive">
            <Header className="homePageFooter" as="h1">
              East London
            </Header>
          </Segment>
        </Link>
      </div>

      <div>
        <img src="https://www.london-forever.com/wp-content/uploads/2020/09/hyde-park.jpg" />
        <Link to={{ pathname: '/parks/region', state: 'Central%20London' }}>
          <Segment fluid inverted color="olive">
            <Header className="homePageFooter" as="h1">
              Central London
            </Header>
          </Segment>
        </Link>
      </div>

      <div>
        <img src="https://img.locationscout.net/images/2019-05/richmond-park-london-uk-united-kingdom_l.jpeg" />
        <Link to={{ pathname: '/parks/region', state: 'South%20London' }}>
          <Segment fluid inverted color="olive">
            <Header className="homePageFooter" as="h1">
              South London
            </Header>
          </Segment>
        </Link>
      </div>

      <div>
        <img src="https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2018/02/18150424/22637281_1082893518480502_4132483769749733376_n-2.jpg" />
        <Link to={{ pathname: '/parks/region', state: 'West%20London' }}>
          <Segment fluid inverted color="olive">
            <Header className="homePageFooter" as="h1">
              West London
            </Header>
          </Segment>
        </Link>
      </div>
    </Carousel>
  )
}
export default Home
