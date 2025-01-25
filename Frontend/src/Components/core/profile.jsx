import React from 'react';
import profileImage from "../../../public/images/profile.png";
import { TbPhotoEdit } from "react-icons/tb";
import "../../Styles/Components/core/profile.css";

function ProfilePage() {
  return (
    <div>
      <div className='profile-container'>
        <div className="profile-image">
            <img src={profileImage} alt="profile-image" />
            <TbPhotoEdit className='profileEditable' size={26}/>
        </div>

        <form className='profileForm'>
            <div className='profileFormDiv'>
                <input className='profileUserName' type="text" placeholder='Enter your name' />
            </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage;
