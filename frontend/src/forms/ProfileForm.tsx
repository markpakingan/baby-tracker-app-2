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
  };

  const [formData, setFormData] = useState(initialState)
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

    try {
      // const response = await axios.put(
      //   `${BASE_URL}/user/${userName}`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }

      // );

      // console.log("response.data", response.data);
      // if (response.data) {
      //   // Update each field individually
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     username: response.data.username,
      //     password: response.data.password,
      //     firstname: response.data.firstname,
      //     lastname: response.data.lastname,
      //     email: response.data.email
      //   }));


      //   console.log("Profile updated successfully!", response.data);
      //   alert("Profile has been updated!")
      // }

      console.log('You clicked submit');
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };


  //Gets the user info from the backend and return to forms
  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        // Make a GET request to fetch user information
        const response = await axios.get(`${BASE_URL}/user/getone?id=${userId}`,
        );

        // Set the user information in the component's state
        setFormData({
          username: response.data.username,
          password: "testing",
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
        });

        console.log("response", response);
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
      <h1>Profile</h1>


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

              <label htmlFor="password"> Password</label>
              <input
                id="password"
                type="text"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />


                <label htmlFor="firstname"> Firstname</label>
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

                  <button onSubmit={handleSubmit}> Save Changes</button>
            </div>
          </form>
    </div>
  )
};

export default ProfileForm;