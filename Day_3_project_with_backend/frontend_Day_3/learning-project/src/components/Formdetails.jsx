import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Formdetails = () => {
const navigate =useNavigate();
const handlesumbit = async (e)=>{
  e.preventDefault();

  const formdata =  new FormData(e.target);
  axios.post('http://localhost:3000/creat_post',formdata)
  .then((res)=>{
    console.log(res);
     navigate('feed')
  })
  .catch((err)=>{
    console.log(err);
  })
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-5" onSubmit={handlesumbit}>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Upload Post
        </h2>

        {/* File Input */}
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Select Image
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-amber-600 file:text-white
                       hover:file:bg-amber-700
                       cursor-pointer"
          />
        </label>

        {/* Caption Input */}
        <input
          type="text"
          name="caption"
          placeholder="Enter your caption"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-amber-600"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded-lg
                     font-semibold hover:bg-amber-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Formdetails;
