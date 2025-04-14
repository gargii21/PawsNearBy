import React, { useState } from "react";
import "../styles/community.css";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Aanya Patel",
      username: "@aanya_",
      content: "Just dropped Mochi off at the cutest daycare ever ✨ What’s your go-to daycare recommendation?",
      image: "/images/community/mochi.png",
    },
  
    {
      id: 2,
      name: "Kabir Arora",
      username: "@kabir.codes",
      content: "My dog literally uninstalled Zoom by stepping on my keyboard. Productivity queen 🐶💻",
      image: "/images/community/laptop.png",
    },
  
    {
      id: 3,
      name: "Simran Bhatia",
      username: "@simran_",
      content: "Tried to give my cat a bath. Now we’re both traumatised. Anyone have tips on how to bathe a cat without drama?",
      image: "/images/community/cat-bath.png",
    },
    {
      id: 5,
      name: "Neha Jain",
      username: "@neha.snaps",
      content: "POV: My dog just stole my paratha 😩 #breakfastwar. What’s the best way to train them to stop stealing food?",
      image: "/images/community/dog-paratha.png",
    },
  
    // Meme Intermittent
    {
      id: 6,
      name: "Ritu Sharma",
      username: "@ritusings",
      content: "Meet Oreo, the only guy who listens to me these days 🖤 #SupportSystem",
      image: "/images/community/oreo.png",
    },
  
    {
      id: 7,
      name: "Jay Mehta",
      username: "@jaywalker",
      content: "Here’s Simba. He thinks he’s a lion. He’s not. 🦁 Just got a new collar for Simba, how often do you upgrade your dog’s gear?",
      image: "/images/community/simba.png",
    },

  
    {
      id: 9,
      name: "Ansh Kapoor",
      username: "@ansh.snap",
      content: "The new daycare was amazing! Bubbles came back with more energy than when she left 😂 Anyone else have an energetic fur baby?",
      image: "/images/community/bubbles.png",
    },

  
    // More Advise-Seeking Posts
    {
      id: 16,
      name: "Kriti Verma",
      username: "@kriti.paws",
      content: "Dog walks are the best way to unwind after a hectic day 🐕💆‍♀️ Any tips on making dog walks even more fun?",

    },

  
    {
      id: 19,
      name: "Aditi Mehta",
      username: "@aditi",
      content: "Is it just me, or does everyone’s dog instantly turn into a race car when you open the treat box? 🏎️🐕💨 How do you get your pet to focus during training?",
    },
  
    {
      id: 20,
      name: "Neel Patel",
      username: "@neel_09",
      content: "Just got a new dog toy for Rocky, and he’s already figured out how to destroy it in 5 minutes. 😂💔 #FurEverTrouble. Anyone got indestructible toys?",
      image: "/images/community/destroy.png",
    },
  
    // Informational
    {
      id: 21,
      name: "Isha Reddy",
      username: "@isha.11",
      content: "Grooming day for Luna 🐾✨ She’s looking extra fabulous today! What grooming products do you swear by for your pets?",
      image: "/images/community/luna.png",
    },
  
    {
      id: 22,
      name: "Arjun Shah",
      username: "@arjun.03",
      content: "Tried to teach my dog some tricks... ended up learning how to roll over myself 😂🐕 #DogTrainingFail. Any easy tricks to teach a puppy?",
    },
  
    {
      id: 23,
      name: "Rina Kumar",
      username: "@rina",
      content: "Sometimes I feel like my dog is smarter than me 🤔. What are some tricks your dog can do?",
    },
  
    {
      id: 25,
      name: "Kavita Verma",
      username: "@kavita.adventures",
      content: "First time at the vet, and Zara was super chill. I was the one who needed a calming treat after 😂🐾. How do you calm your pets before a vet visit?",
    },
  ]);
  
  

  const [newPost, setNewPost] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: posts.length + 1,
        name: "You",
        username: "@you.paws",
        content: newPost,
        image: imagePreview,
      },
      ...posts,
    ]);
    setNewPost("");
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="community-fullscreen">
      <div className="community-container">
        <h1 className="community-title">pawsnearby Community</h1>
        <p className="community-subtitle">Chat. Share. Learn. Celebrate pets...Coming soon</p>

        <div className="create-post">
          <textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="image-preview" />
          )}
          <div className="post-options">
            <label className="upload-label">
              📸 Upload Image
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
            <button onClick={handlePost} className="post-btn">Post</button>
          </div>
        </div>

        <div className="posts-feed">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <h4>{post.name}</h4>
                <small>{post.username}</small>
              </div>
              <p className="post-content">{post.content}</p>
              {post.image && <img src={post.image} alt="Post visual" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
