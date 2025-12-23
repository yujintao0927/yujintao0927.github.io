var posts=["2025/12/09/hello-world/","2025/12/10/Lebron-James/","2025/12/18/life/","2025/12/23/软件测试/","2025/12/23/人机交互/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };