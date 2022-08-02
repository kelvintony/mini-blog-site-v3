import React from 'react';

const PostCard = () => {
	return (
		<div className='post-card-box'>
			<img
				className='post-card-img'
				src='https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
				alt='pix-1'
			/>
			<p>Jenny Ivy</p>
			<p>6 hours ago</p>
			<p># productivity</p>
			<h4>Forbidden City</h4>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
			<div className='like-post'>
				<div className='like-post-box-1'>
					<img src='https://img.icons8.com/material-rounded/24/000000/facebook-like--v1.png' />
					<p>1 like</p>
				</div>
				<button className='btn-delete-post'>delete</button>
			</div>
		</div>
	);
};

export default PostCard;
