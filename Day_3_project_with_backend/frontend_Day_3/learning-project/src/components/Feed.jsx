import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [post, setpost] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3000/create_post").then((res) => {
      console.log(res.data);
      setpost(res.data.post);
    });
  }, []);

  function clickhandler(){
    navigate('/')
  }
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <button onClick={clickhandler} className="bg-emerald-500 px-6 rounded text-white py-1 absolute right-2 top-4 cursor-pointer"> Back </button>
      
      {/* Page Title */}
      <h1 className="font-bold text-4xl text-center mb-8 text-gray-800">
        Feed Page
      </h1>


      {/* Feed Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {post.map((e, i) => {
          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Image */}
              <img
                src={e.image}
                alt=""
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">
                  Caption:
                  <span className="font-normal text-gray-600 ml-1">
                    {e.caption}
                  </span>
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
