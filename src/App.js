import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './product/Products';
import Cart from './cart/Cart';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './redux/store';
import './App.css';
import   "./cart/Cart.css"

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className='App'>
            <Routes>
              <Route path="/" element={<Products />} />
            </Routes>
            <Cart />
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//     const [users, setUsers] = useState([]);
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState([]);
//     const [error, setError] = useState(null);

//     const fetchData = async () => {
//         const usersAPI = "https://jsonplaceholder.typicode.com/users";
//         const postsAPI = "https://jsonplaceholder.typicode.com/posts";
//         const commentsAPI = "https://jsonplaceholder.typicode.com/comments";

//         try {

//             const [usersResponse, postsResponse, commentsResponse] = await axios.all([
//                 axios.get(usersAPI),
//                 axios.get(postsAPI),
//                 axios.get(commentsAPI)
//             ]);


//             setUsers(usersResponse.data);
//             setPosts(postsResponse.data);
//             setComments(commentsResponse.data);
//         } catch (err) {
//             setError(err.message);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     if (error) return <div className="App">Error: {error}</div>;

//     return (
//         <div className="App">
//             <h1>Users</h1>
//             <div className="users">
//                 {users.map((user) => (
//                     <div key={user.id} className="user-card">
//                         <h2>{user.name}</h2>
//                         <p>{user.email}</p>
//                         <p>{user.phone}</p>
//                     </div>
//                 ))}
//             </div>

//             <h1>Posts</h1>
//             <div className="posts">
//                 {posts.slice(0, 10).map((post) => (
//                     <div key={post.id} className="post-card">
//                         <h2>{post.title}</h2>
//                         <p>{post.body}</p>
//                     </div>
//                 ))}
//             </div>

//             <h1>Comments</h1>
//             <div className="comments">
//                 {comments.slice(0, 10).map((comment) => (
//                     <div key={comment.id} className="comment-card">
//                         <h2>{comment.name}</h2>
//                         <p>{comment.email}</p>
//                         <p>{comment.body}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default App;
