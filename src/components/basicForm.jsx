import React, { useState } from 'react';

import axios from 'axios';


// ----ID counter in the database---
let idCounter = 0;

function generateUniqueId() {
    return ++idCounter;
}

function adjustIdCounter(data) {
    if (!Array.isArray(data)) return;
    
    const maxId = data.reduce((max, item) => {
        return item.id > max ? item.id : max;
    }, 0);
    
    idCounter = maxId;
}
// -------------------------------
const Form = () => {
    const [formData, setFormData] = useState({
        
        fname: "",
        lname: "",
        username: "",
        position: "",
        employeeId: "",
        department: "",
        email: "",
        password: "",
        cpassword: "",
      });
      const [errors, setErrors ] = useState({})
      const [valid, setValid] = useState(true)
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Corrected to lowercase 'f' for formData
        let isvalid = true;
        let validationErrors = {}
        if(formData.fname === "" || formData.fname === null){
            isvalid = false;
            validationErrors.fname = "First name is required"
        }
        if(formData.lname === "" || formData.lname === null){
            isvalid = false;
            validationErrors.lname = "Last name is required"
        }
        if(formData.username === "" || formData.username === null){
            isvalid = false;
            validationErrors.username = "User Name is required"
        }
        if(formData.position === "" || formData.position === null){
          isvalid = false;
          validationErrors.position = "Please provide your position"
        }
        if(formData.employeeId === "" || formData.employeeId === null){
          isvalid = false;
          validationErrors.employeeId = "Please provide your Employee ID"
        }
        if(formData.department === "" || formData.department === null){
          isvalid = false;
          validationErrors.department = "Please provide your Department"
        }
        if(formData.email === "" || formData.email === null){
            isvalid = false;
            validationErrors.email = "Email is required"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            isvalid = false;
            validationErrors.email = "Email is not valid"
        }
        if (formData.password === "" || formData.password === null) {
            isvalid = false;
            validationErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            isvalid = false;
            validationErrors.password = "Password must be at least 6 characters long";
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(formData.password)) {
            isvalid = false;
            validationErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one digit";
        }
        if(formData.cpassword !== formData.password){
            isvalid = false;
            validationErrors.cpassword = "Password not matched"
        }
    setErrors(validationErrors)
    setValid(isvalid)
    // if(Object.keys(validationErrors).length === 0){
    //     alert("Registered Successfully")
    // }
    if (validationErrors && typeof validationErrors === 'object' && Object.keys(validationErrors).length === 0) {
        // Generate a unique ID for the new data entry
        const newId = generateUniqueId();
    
        // Assign the generated ID to the formData
        const dataToSend = { ...formData, id: newId };
    
        // Send the data with the assigned ID to the server
        axios.post('http://localhost:3000/users', dataToSend)
            .then(result => {
                alert("Registered Successfully!");
            })
            .catch(err => {
                alert(err);
            });
    }
    
    
};
  return (

<div style={{ maxWidth: '500px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>Create Your Account</h2>
      <form
      onSubmit={handleSubmit}
      autoComplete="off"
      >
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <label htmlFor="firstName">First Name:</label>
            <input
            type="text" 
            id="fname" 
            name="fname"
            placeholder="Enter your First name"
            onChange={(event) => setFormData({ ...formData, fname: event.target.value })}
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                 }} 
                //  required
                />
                {
                    !valid && errors.fname && (
                        <span style={{ color: "red" }}>*{errors.fname}*</span>
                        )
                }
             
        </div>
          <div style={{ flex: '1', marginLeft: '10px' }}>
            <label htmlFor="lastName">Last Name:</label>
            <input 
            type="text" 
            id="lname" 
            name="lastName"
            placeholder="Enter your Last name" 
            onChange={(event) => setFormData({ ...formData, lname: event.target.value })}
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                //  required 
                />
                {
                    !valid && errors.lname && (
                        <span style={{ color: "red" }}>*{errors.lname}*</span>
                        )
                }
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <label htmlFor="username">Username:</label>
            <input 
            type="text" 
            id="username" 
            name="username"
            placeholder="Enter your user name" 
            onChange={(event) => setFormData({ ...formData, username: event.target.value })} 
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                //  required 
                />
                {
                    !valid && errors.username && (
                        <span style={{ color: "red" }}>*{errors.username}*</span>
                        )
                }
          </div>
          <div style={{ flex: '1', marginLeft: '10px' }}>
            <label htmlFor="position">Position:</label>
            <input 
            type="text" 
            id="position" 
            name="position" 
            placeholder="Enter your Position" 
            onChange={(event) => setFormData({ ...formData, position: event.target.value })} 
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                // required 
                />
                {
                    !valid && errors.position && (
                        <span style={{ color: "red" }}>*{errors.position}*</span>
                        )
                }
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <label htmlFor="employeeId">Employee ID:</label>
            <input 
            type="text" 
            id="employeeId" 
            name="employeeId" 
            placeholder="Enter your EID" 
            onChange={(event) => setFormData({ ...formData, employeeId: event.target.value })} 
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                // required 
                />
                {
                    !valid && errors.employeeId && (
                        <span style={{ color: "red" }}>*{errors.employeeId}*</span>
                        )
                }
          </div>
          <div style={{ flex: '1', marginLeft: '10px' }}>
            <label htmlFor="department">Department:</label>
            <input 
            type="text" 
            id="department" 
            name="department"
            placeholder="Enter your Department" 
            onChange={(event) => setFormData({ ...formData, department: event.target.value })}  
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                // required 
                />
                {
                    !valid && errors.department && (
                        <span style={{ color: "red" }}>*{errors.department}*</span>
                        )
                }
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <label htmlFor="email">Email:</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your Email" 
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}  
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                // required 
                />
                {
                    !valid && errors.email && (
                        <span style={{ color: "red" }}>*{errors.email}*</span>
                        )
                }
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <label htmlFor="password">Password:</label>
            <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Enter your Password" 
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}  
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                // required 
                />
                {
                    !valid && errors.password && (
                        <span style={{ color: "red" }}>*{errors.password}*</span>
                        )
                }
          </div>
          <div style={{ flex: '1', marginLeft: '10px' }}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
            type="password" 
            id="cpassword" 
            name="confirmPassword" 
            placeholder="Please Confirm your Password"
            onChange={(event) => setFormData({ ...formData, cpassword: event.target.value })}
            style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '5px', 
                border: '1px solid #ccc' 
                }} 
                // required 
                />
                {
                    !valid && errors.cpassword && (
                        <span style={{ color: "red" }}>*{errors.cpassword}*</span>
                        )
                }
          </div>
        </div>
        <button 
            type="submit" 
            style={{ 
                width: '50%', /* Adjust the width as desired */
                padding: '8px', /* Reduce the padding to make it smaller */
                backgroundColor: '#007bff', 
                color: '#fff', 
                borderRadius: '5px', 
                border: 'none', 
                cursor: 'pointer',
                display: 'block', /* Set display to block to center the button */
                margin: '0 auto' /* Use margin auto to center horizontally */
            }}
        >
            Add User
        </button>

        
      </form>
    </div>


  );
};
export default Form
