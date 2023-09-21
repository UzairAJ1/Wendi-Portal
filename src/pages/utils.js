// utils.js

export function prepareSetUserDetailsData(payload, image) {
    const formData = new FormData();
  
    // Add payload properties to formData
    if (payload.fullName) {
      formData.append('fullName', payload.fullName);
    }
  
    if (payload.gender) {
      formData.append('gender', payload.gender);
    }
  
    if (payload.sexualOrientation) {
      formData.append('sexualOrientation', payload.sexualOrientation);
    }

  
    if (payload.aboutYou) {
      formData.append('aboutYou', payload.aboutYou);
    }

    if(image){
      formData.append('orderIds', JSON.stringify([1]));
      
    }

if (image) {
  const Images = [image]
  Images.forEach(image => {
    console.log("SENT IMAGE ======",image)
      formData.append('profileImages', image);
  });
}
    // Add more payload properties as needed...
  
    return formData;
  }
  