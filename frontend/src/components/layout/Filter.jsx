import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings'
import { getPriceQueryParams } from '../../assets/helper';

const Filter = () => {

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()

  useEffect(() => {
    searchParams.has('min') && setMin(searchParams.get('min'))
    searchParams.has('max') && setMax(searchParams.get('max'))
  }, [])

  const handleCheckBox = (checkBox) => {
    const checkBoxes = document.getElementsByName(checkBox.name)

    checkBoxes.forEach(item => {
      if(item !== checkBox) item.checked = false
    })  

    if(checkBox.checked === false){
      if(searchParams.has(checkBox.name)){
        searchParams.delete(checkBox.name)
        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path) 
      }
    } else {
      if(searchParams.has(checkBox.name)){
        searchParams.set(checkBox.name, checkBox.value)
      } else {
        searchParams.append(checkBox.name, checkBox.value)
      }
      const path = window.location.pathname + "?" + searchParams.toString()
      navigate(path)
    }
  }

  const handleButtonClick = e => {
    e.preventDefault()

    searchParams = getPriceQueryParams(searchParams, "min", min)
    searchParams = getPriceQueryParams(searchParams, "max", max)

    const path = window.location.pathname + "?" + searchParams.toString()
    navigate(path)
  }

  const defaultCheckHandler = (checkBoxType, checkBoxValue) => {
    const value = searchParams.get(checkBoxType)
    if(checkBoxValue === value){
      return true
    } else {
      return false
    }
  }

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        className="px-2"
        onSubmit={handleButtonClick}
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min (Rp)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max (Rp)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary ">GO</button>
          </div>
        </div>
      </form>
      <hr />

      <hr />
      <h5 className="mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating, i) => (
        <div key={i} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7" 
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating.toString())}
            onClick={(e) => handleCheckBox(e.target)}
          />
          <label className="form-check-label" htmlFor="check7">
          <StarRatings
            rating={rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name='rating'
            starDimension='19px'
            starSpacing='1px'
          />
          </label>
        </div>
      ))}
    </div>
  );
}

export default Filter;
