import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

export const CloudinaryAPI = () => {
  const cloud_name = process.env.CLOUDINARY_NAME;
  console.log(cloud_name);
  const cld = new Cloudinary({ cloud: { cloudName: cloud_name } });
  
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
        .image('zepda/images/u8dowi9vqbb2hwrmqajl')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
  
  console.log(img);
  

  return (<AdvancedImage cldImg={img}/>);
};
