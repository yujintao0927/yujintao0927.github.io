var posts=["2025/12/09/hello-world/","2025/12/10/Lebron-James/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };