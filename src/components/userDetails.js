import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CountryClock from "./countryClock";
import "./userDetails.css";
import axios from "axios";
import CustomModal from "./customModal";

const UserDetails = () => {
  const userId = useParams();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  //   const [time, setTime] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(userId, "loggerrrr");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId.userId}`
        );
        const userData = await response.json();
        console.log("userData", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
    debugger;
    // console.log("userId=====", userId);
    // console.log("userrrrsss", user);
  }, [userId]);
  useEffect(() => {
    const postDataDetails = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postData = await res.data.slice(0, 3);
        setPost(postData);
      } catch (error) {
        console.error("Post not found", error);
      }
    };
    postDataDetails();
  }, []);
  const chunkPosts = (arr, size) => {
    return arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  };

  const postChunks = chunkPosts(post, 3);
  //   console.log("postChunks---", postChunks);
  if (!user) {
    return <div>Loading...</div>;
  }

  const PostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="clockDropDown-box">
        <Link to="/">
          <button>Back</button>
        </Link>
        <CountryClock />
      </div>
      <div className="profile-name">
        <p>
          <b>{user.name}</b>'s Profile
        </p>
      </div>
      <div className="post-box">
        {postChunks.map((row, index) => (
          <div key={index} className="post-list-box">
            {row.map((post) => (
              <div
                key={post.id}
                className="post-list"
                onClick={() => PostClick(post)}
              >
                <h3>
                  <b>Title: </b>
                  {post.title}
                </h3>
                <p>
                  <b>Content:</b> {post.body}
                </p>
              </div>
            ))}

            <CustomModal isOpen={isModalOpen} onClose={CloseModal}>
              {selectedPost && (
                <>
                  <h3>{selectedPost.title}</h3>
                  <p>{selectedPost.body}</p>
                </>
              )}
            </CustomModal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
