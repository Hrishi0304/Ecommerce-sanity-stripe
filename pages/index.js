import product from '@/sanity-ecomm/schemas/product';
import React from 'react';
import { client } from '../lib/client';
import { Product,HeroBanner,FooterBanner} from "../components";
const Home = (props) => {
  return (
    <>
      <HeroBanner heroBanner={props.bannerData.length && props.bannerData[0]}/>
      {/* below statement is invalid */}
      {/* {console.log(bannerData)} */}
      {/* {console.log(props.bannerData)} */}
      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {props.products.map((product)=> <Product key={product._id} product={product}/>)}
        {/* {Array.isArray(props.products) ? props.products.map((product) => product.name) : null} */}

      </div>
      <FooterBanner footerBanner={props.bannerData && props.bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query); 

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return{
    props:{products,bannerData}
  }
}

export default Home;