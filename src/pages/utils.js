// utils.js

export function prepareSetUserDetailsData(payload, image) {
    const formData = new FormData();
  
    // Add payload properties to formData
    if (payload.username) {
      formData.append('fullName', payload.username);
    }
  
    if (payload.gender) {
      formData.append('gender', payload.gender);
    }
  
    if (payload.sexualOrientation) {
      formData.append('sexualOrientation', payload.sexualOrientation);
    }
  
    if (payload.email) {
      formData.append('email', payload.email);
    }
  
    if (payload.aboutYou) {
      formData.append('aboutYou', payload.aboutYou);
    }
  
    if (payload.password) {
      formData.append('password', payload.password);
    }
    if (image) {
        formData.append('image', image);
      }
    // Add more payload properties as needed...
  
    return formData;
  }
  