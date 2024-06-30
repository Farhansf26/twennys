import React, { useEffect, useState } from 'react';
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Checkout from './Checkout';

const Shipping = () => {

  const countriesList = Object.values(countries)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [country, setCountry] = useState('')

  const { shippingInfo } = useSelector(state => state.cart)

  useEffect(() => {
    if(shippingInfo){
      setAddress(shippingInfo?.address)
      setCity(shippingInfo?.city)
      setZipCode(shippingInfo?.zipCode)
      setPhoneNumber(shippingInfo?.phoneNumber)
      setCountry(shippingInfo?.country)
    }
  }, [shippingInfo]);

  const submitHandler = e => {
    e.preventDefault()

    dispatch(saveShippingInfo({ address, city, zipCode, phoneNumber, country }))
    navigate('/confirm_order')
  }

  return (
    <>
      <MetaData title={'Shipping Info'}/>
      <Checkout shipping/>
      <div className="row wrapper mb-5 info-shipping">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4"><b>INFORMASI PENGIRIMAN</b></h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">Alamat</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">Kota</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">Nomor Telepon</label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label"
                >Kode Pos</label
              >
              <input
                type="number"
                id="zip_code_field"
                className="form-control"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">Negara</label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList?.map((country) => (
                  <option key={country.name} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              Lanjut
            </button>
          </form>
        </div>
      </div> 
    </>
  );
}

export default Shipping;
