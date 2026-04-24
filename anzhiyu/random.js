var posts=["2025/12/10/Lebron-James/","2025/12/18/life/","2026/04/25/love/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };