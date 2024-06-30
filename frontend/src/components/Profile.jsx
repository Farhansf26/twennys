import React from 'react';
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'

const Profile = () => {

  const { user } = useSelector(state => state.auth)

  return (
    <div>
      <div className='mt-2 py-4'>
        <h2 className='text-center fw-bolder'>User Information</h2>
      </div>

      <div className='container'>
        <div className='row justify-content-around'>
          <div className='col-12 col-lg-8 user-dashboard'>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-4">
                <figure className="avatar avatar-profile">
                  <img
                    className="rounded-circle img-fluid"
                    src={user?.avatar ? user?.avatar : avatar}
                    alt={user?.name}
                  />
                </figure>
              </div>

              <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user?.name}</p>

                <h4>Email Address</h4>
                <p>{user?.email}</p>

                <h4>Joined On</h4>
                <p>{user?.createdAt?.substring(0, 10)}</p>
              </div>
            </div>

          </div>
        </div>  
      </div>
    </div>
  );
}

export default Profile;
