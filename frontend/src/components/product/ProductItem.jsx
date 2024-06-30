import React from 'react';
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import twennys_logo from '../../assets/twennys_logo.png'

const ProductItem = ({ product, columnSize }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product?.images[0]?.url ? product?.images[0].url : twennys_logo}
          alt={product?.name}
        />
        <div
          className="card-body ps-3 d-flex justify-content-center flex-column"
        >
          <p className="card-title">
            <Link to={`/products/${product?._id}`}>{product?.name}</Link>
          </p>
          <div className="ratings mt-auto d-flex">
            <StarRatings
            rating={product?.ratings}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name='rating'
            starDimension='22px'
            starSpacing='1px'
            />
            <span id="no_of_reviews" className="pt-2 ps-2">({product?.numOfReviews})</span>
          </div>
          <p className="card-text mt-2">Rp. {product?.price.toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}</p>
          <Link to={`/products/${product?._id}`} id="view_btn" className="btn btn-block">
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
