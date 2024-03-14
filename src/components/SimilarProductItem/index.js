// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {similarProducts} = props
  const updatedProduct = {
    id: similarProducts.id,
    availability: similarProducts.availability,
    brand: similarProducts.brand,
    description: similarProducts.description,
    price: similarProducts.price,
    rating: similarProducts.rating,
    style: similarProducts.style,
    title: similarProducts.title,
    totalReviews: similarProducts.total_reviews,
    imageUrl: similarProducts.image_url,
  }

  const {title, rating, price, imageUrl, brand} = updatedProduct

  return (
    <li className="similar-product-item">
      <img className="similar-product-img" src={imageUrl} alt={title} />
      <p className="similar-product-title">{title}</p>
      <p className="similar-product-brand">{`by ${brand}`}</p>
      <div className="similar-product-rating-price-card">
        <p className="similar-product-price">{`Rs ${price}/-`}</p>
        <div className="similar-product-rating-card">
          <p className="similar-product-rating">{rating}</p>
          <img
            className="similar-product-star-img"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
