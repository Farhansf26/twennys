import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'
import MetaData from '../layout/MetaData';
import { useLoginMutation } from '../../redux/api/authApi';
import { useSelector } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { data, isLoading, error, isSuccess }] = useLoginMutation()
  const { isAuthenticated } = useSelector(state => state.auth)

  console.log(data);

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }
    if(isSuccess){
      toast.success('Login Successfully')
    }
  }, [error, isSuccess])

  useEffect(() => {
    if(isAuthenticated){
      navigate('/')
    }
  }, [isAuthenticated])

  const submitHandler = async (e) => {
    e.preventDefault()

    const loginData = {
      email, password
    }

    login(loginData)
  }

  return (
    <>
      <MetaData title={'Login'}/>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
              {isLoading ? 'Loging in...' : "LOGIN"}
            </button>

            <div className="my-3">
              <Link to={'/signup'} className="float-end">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
