import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaStar} from 'react-icons/fa'

import Header from '../Header'

import './index.css'

class ProductItemDetails extends Component {
  renderProductsItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      id: data.id,
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      price: data.price,
      rating: data.rating,
      style: data.style,
      title: data.title,
      totalReviews: data.total_reviews,
      similarProducts: data.similar_products,
      imageUrl: data.image_url,
    }

    const similarProducts = updatedData.similarProducts.map(eachData => ({
      id: eachData.id,
      availability: eachData.availability,
      brand: eachData.brand,
      description: eachData.description,
      price: eachData.price,
      rating: eachData.rating,
      style: eachData.style,
      title: eachData.title,
      totalReviews: eachData.total_reviews,
      imageUrl: eachData.image_url,
    }))

    const {style, title, rating, price, description, availability, imageUrl} =
      updatedData

    return (
      <div>
        <div>
          <img src={imageUrl} alt={title} />
        </div>
        <div>
          <p>{title}</p>
          <p>{`Rs ${price}/-`}</p>
          <div>
            <div>
              <p>{rating}</p>
              <FaStar />
            </div>
            <p>{`${totalReviews} Reviews`}</p>
          </div>
          <p>{description}</p>
          <p>{`Available: ${availability}`}</p>
          <p>{`Brand: ${availability}`}</p>
          <div>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <button>ADD TO CART</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderProductsItemDetails()}
      </div>
    )
  }
}

export default ProductItemDetails
