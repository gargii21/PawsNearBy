import React, { useState } from "react";
import "../styles/community.css"; // Make sure the path is correct

const dummyPosts = [
  {
    id: 1,
    user: "LunaTheDogMom",
    content: "Just found the cutest daycare near me thanks to PawsNearby",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: "CatDad23",
    content: "Any tips on introducing a kitten to a senior dog?",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    user: "PetWalker101",
    content: "Offering weekend walks in the downtown area!",
    timestamp: "1 day ago",
  },
];

const Community = () => {
  const [posts, setPosts] = useState(dummyPosts);

  return (
    <div className="community">
      <div className="community-content">
        <h1>PawsNearby Community</h1>
        <p>Hang out, share stories, and spread the pet love!</p>

        <button className="add-post-btn">+ Add a Post</button>

        <div className="community-posts">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <strong>@{post.user}</strong>
                <span className="timestamp">{post.timestamp}</span>
              </div>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
