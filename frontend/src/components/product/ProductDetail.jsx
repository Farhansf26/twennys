import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast'
import StarRatings from 'react-star-ratings'
import twennys_logo from '../../assets/twennys_logo.png'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { useGetProductDetailQuery } from '../../redux/api/productApi';
import { setCartItem } from '../../redux/slices/cartSlice';
import NewReview from './NewReview';
import ListReview from './ListReview';
import { MdOutlineShoppingCart } from "react-icons/md";
import NotFound from '../layout/NotFound';

const ProductDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState('')

  const { data, isLoading, isError, error } = useGetProductDetailQuery(params.id)
  
  const product = data?.product
  const isAuth = useSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    setActiveImg(product?.images[0] ? product?.images[0].url : twennys_logo)
  }, [product])

  useEffect(() => {
    if(isError){
      toast.error(error.data.message)
    }
  }, [isError]);

  const increaseQty = () => {
    const count = document.querySelector('.count')
    if(count.valueAsNumber >= product?.stock) return
    const qty = count.valueAsNumber + 1
    setQuantity(qty)
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count')
    if(count.valueAsNumber <= 1) return
    const qty = count.valueAsNumber - 1
    setQuantity(qty)
  }

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity
    }
    dispatch(setCartItem(cartItem))
    toast.success('Berhasil Ditambahkan Ke Keranjang')
  }

  if(isLoading){
    return <Loader/>
  }

  if(error && error?.status == 404){
    return <NotFound/>
  }
  
  return (
    <>
      <MetaData title={product?.name}/>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <div className="p-3">
            <img
              className="d-block w-100"
              src={activeImg}
              alt={product?.name}
              width="280"
              height="340"
            />
          </div>
          <div className="row justify-content-start mt-5">
            {product?.images?.map((img, i) => (
              <div key={i} className="col-2 ms-4 mt-2">
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer 
                    ${img.url === activeImg ? "border-warning" : ""}`}
                    height="100"
                    width="100"
                    src={img.url}
                    alt={img.url}
                    onClick={() => setActiveImg(img.url)}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
            
        <div className="col-12 col-lg-5 mt-5">
          <h3>{product?.name}</h3>
          <p id="product_id">Product # ${product?._id}</p>
            
          <hr />
            
          <div className="d-flex">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name='rating'
              starDimension='24px'
              starSpacing='1px'
            />
            <span id="no-of-reviews" className="pt-1 ps-2"> ({ product?.numOfReviews }) Reviews</span>
          </div>
          <hr />
            
          <p id="product_price">Rp. {product?.price.toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />
            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ms-4"
            disabled={product?.stock <= 0}
            onClick={setItemToCart}
          >
            Tambahkan ke <MdOutlineShoppingCart size={22}/>
          </button>
            
          <hr />
            
          <p>
            Status: <span id="stock_status" className={product?.stock > 0 ? 'greenColor' : 'redColor'}>
            {product?.stock > 0 ? 'Tersedia' : 'Habis'}
            </span>
          </p>
            
          <hr />
            
          <h4 className="my-3"><b>Deskripsi Produk:</b></h4>
          <p>
            {product?.description}
          </p>
          <hr />
          <p id="product_seller mb-3">Penjual: <strong>{product?.seller}</strong></p>
            
          {isAuth ? <NewReview productReviews={product?.reviews} productId={product?._id}/> : (
          <div className="alert alert-danger my-5" type="alert">
            Login untuk memberikan penilaian.
          </div>
          )}
        </div>
      </div>
      {product?.reviews?.length > 0 && <ListReview reviews={product?.reviews}/>}
    </>
  );
}

export default ProductDetail;
