import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare} from 'react-icons/bs'
import {BsDashSquare} from 'react-icons/bs'

import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    similarProducts: [],
    isLoading: true,
    productQuantity: 1,
  }

  componentDidMount() {
    this.getProductDetials()
  }

  getProductDetials = async () => {
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
    if (response.ok) {
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

      this.setState({
        productDetails: updatedData,
        similarProducts: updatedData.similarProducts,
        isLoading: false,
      })
    } else {
      this.setState({
        productDetails: undefined,
        similarProducts: [],
        isLoading: false,
      })
    }
  }

  renderSimilarProductItem = () => {
    const {similarProducts} = this.state
    return (
      <div className="similar-products-container">
        <h1 className="similar-product-heading">Similar Products</h1>
        <ul className="similar-product-list">
          {similarProducts.length > 0 &&
            similarProducts.map(eachProduct => (
              <SimilarProductItem
                similarProducts={eachProduct}
                key={eachProduct.id}
              />
            ))}
        </ul>
      </div>
    )
  }

  onClickFailure = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="failure-view-card">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Product Not Found</h1>
      <button
        onClick={this.onClickFailure}
        className="failure-view-button"
        type="button"
      >
        Continue Shopping
      </button>
    </div>
  )

  onClickIncrement = () => {
    this.setState(prevState => ({
      productQuantity: prevState.productQuantity + 1,
    }))
  }

  onClickDecrement = () => {
    const {productQuantity} = this.state
    if (productQuantity > 1) {
      this.setState(prevState => ({
        productQuantity: prevState.productQuantity - 1,
      }))
    }
  }

  renderProductsItemDetails = () => {
    const {productDetails, productQuantity} = this.state
    if (productDetails === undefined) {
      return this.renderFailureView()
    }
    const {
      title,
      rating,
      price,
      description,
      availability,
      imageUrl,
      totalReviews,
      brand,
    } = productDetails

    return (
      <div className="item-details-card">
        <div className="item-details-img-card">
          <img className="item-details-img" src={imageUrl} alt="product" />
        </div>
        <div className="item-details-content-card">
          <h1 className="item-details-heading">{title}</h1>
          <p className="item-details-price">{`Rs ${price}/-`}</p>
          <div className="item-details-rating-reviews-card">
            <div className="item-details-rating-card">
              <p className="item-details-rating">{rating}</p>
              <img
                className="item-details-star-img"
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
              />
            </div>
            <p className="item-details-review">{`${totalReviews} Reviews`}</p>
          </div>
          <p className="item-details-description">{description}</p>
          <p className="item-details-available">
            <span className="item-details-span">Available:</span> {availability}
          </p>
          <p className="item-details-available">
            <span className="item-details-span">Brand: </span>
            {brand}
          </p>
          <hr className="item-details-line" />
          <div className="item-details-increase-decrease-card">
            <button
              testid="minus"
              className="item-details-increase-decrease-btn"
              type="button"
              onClick={this.onClickDecrement}
            >
              <BsDashSquare />
            </button>
            <p>{productQuantity}</p>
            <button
              testid="plus"
              className="item-details-increase-decrease-btn"
              type="button"
              onClick={this.onClickIncrement}
            >
              <BsPlusSquare />
            </button>
          </div>
          <button className="item-detail-add-to-cart-btn" type="button">
            ADD TO CART
          </button>
        </div>
        {this.renderSimilarProductItem()}
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="similar-product-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="product-item-details-container">
        <Header />
        {isLoading
          ? this.renderLoadingView()
          : this.renderProductsItemDetails()}
      </div>
    )
  }
}

export default ProductItemDetails
