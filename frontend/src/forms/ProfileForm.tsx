import axios from "axios";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {

  const BASE_URL = "http://localhost:3000";
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem('token')

  const initialState = {
    username:"",
    password:"",
    firstname:"",
    lastname:"",
    email:"", 
    newPassword: "",
    confirmPassword: ""
  };

  const [formData, setFormData] = useState(initialState)
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e:any) => {
    const {name, value} = e.target;
    setFormData(formData => ({
        ...formData,
        [name]:value
    }));
}

  const handleSubmit = async (e:any) => {
    e.preventDefault();


    if(passwordUpdate && formData.newPassword !== formData.confirmPassword){
      alert("Passwords do not match!");
      return;
    }


    try {


      const payload = {
        username: formData.username, 
        firstname: formData.firstname, 
        lastname: formData.lastname, 
        email: formData.email, 
        ...(passwordUpdate && {password: formData.newPassword})
      }


      const response = await axios.patch(
        `${BASE_URL}/user/update?id=${userId}`,
        payload
      );

      console.log("response.data", response.data);

      if (response.data) {
        // Update each field individually
        setFormData((prevData) => ({
          ...prevData,
          username: response.data.data.username,
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          email: response.data.data.email, 
          newPassword: "", 
          confirmPassword: ""
        }));


        console.log("Profile updated successfully!", response.data);
        alert("Profile has been updated!")
      }

    } catch (error) {
      console.error("Error updating profile", error);
    }
  };


  //Gets the user info from the backend and return to forms
  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/retreive?id=${userId}`,
        );

        setFormData({
          username: response.data.data.username,
          password: response.data.data.password,
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          email: response.data.data.email,
          newPassword: "", 
          confirmPassword: ""
        });

      } catch (error) {
        console.error("Error fetching user information", error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId, token]);


  return (
    <div>
      <h2>Profile</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"> Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="firstname"> First Name</label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            placeholder="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          <label htmlFor="lastname"> Last Name</label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          <label htmlFor="email"> Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          {/* Toggle password update section */}
          <button type="button" onClick={() => setPasswordUpdate(!passwordUpdate)}>
            {passwordUpdate ? "Cancel Password Change" : "Change Password"}
          </button>

          {passwordUpdate && (
            <>
              <label htmlFor="newPassword"> New Password</label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="New password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit">Save Changes</button>
        </div>
      </form>

    </div>
  )
};

export default ProfileForm;


