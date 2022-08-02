//in the component create a post2.jsx and put this code there
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts2 = () => {
	const [ posts, setPost ] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			await axios
				.get(`http://localhost:5000/posts`)
				.then((res) => {
					setPost(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getPosts();
	}, []);

	console.log(posts);

	return (
		<div className='container-post'>
			{posts.map((post) => {
				return (
					<div className='box'>
						<h5>{post.title}</h5>
						<h5>{post.message}</h5>
						<p>{post.creator}</p>
						<p>{post.likeCount}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Posts2;
//
//
/////////
//then put this in the app js
import './App.css';
import React from 'react';
import Posts2 from './components/Posts2';

const App = () => {
	return (
		<div>
			<Posts2 />
		</div>
	);
};

export default App;
