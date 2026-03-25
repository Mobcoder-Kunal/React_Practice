import React from "react";
import Post from "./Post";

function Container() {
  return (
    <div style={{ padding: "20px" }}>
      <Post title="First Blog Post" content="This is my first blog post!" />
      <Post title="Second Blog Post" content="Learning React is fun!" />
      <Post title="Third Blog Post" content="This is another example post." />
    </div>
  );
}

export default Container;