import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Link } from 'react-router-dom';



const apiUrl = 'http://localhost:5000';

const authAxios = axios.create({
	baseURL: apiUrl
});

authAxios.interceptors.request.use((req)=>{
	if(localStorage.getItem('profile')){
		req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
	}

	return req
})



const Posts = () => {
	const [ posts, setPosts ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const user =JSON.parse(localStorage.getItem('profile'))
 

	
	useEffect(() => {
            const getPosts = async () => {
                setLoading(true);
                await authAxios 
                    .get(`/posts`)
                    .then((res) => {
                        setPosts(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
        }
		getPosts(); 

		
	}, []);

   
    const deletePost=async(id)=>{
      await authAxios
        .delete(
            `/posts/${id}`
        )  
        .then((res) => {
            alert('Deleted successfully');
        });

		setPosts(posts=>posts.filter(post=>post._id!==id)) 
		//this simply means return all the post filtering out the one that the id is not equal to the payload id


    }

	// const Likes = () => {
	// 	if (posts.likes.length > 0) {
	// 	  return posts.likes.find((like) => like === user?.result?._id))
	// 		? (
	// 		  <div><img src="https://img.icons8.com/material-outlined/24/000000/facebook-like--v1.png"/> &nbsp;{posts.likes.length > 2 ? `You and ${posts.likes.length - 1} others` : `${posts.likes.length} like${posts.likes.length > 1 ? 's' : ''}` }</div>
	// 		) : (
	// 		  <div><img src="https://img.icons8.com/material-rounded/24/000000/facebook-like--v1.png"/>&nbsp;{posts.likes.length} {posts.likes.length === 1 ? 'Like' : 'Likes'}</div>
	// 		);
	// 	}
	
	// 	return <><img src="https://img.icons8.com/material-outlined/24/000000/facebook-like--v1.png"/> &nbsp;Like</>;
	//   };

	const likePost=async(id)=>{
		await authAxios
			.put(`/posts/${id}/likepost`)
			.then(function(response) {
				if (response) {
					// navigate('/');

					setPosts(posts.map((post)=>post._id===id?response.data:post))

				}
			})
			.catch(function(error) {
				console.log(error);
			});

	}

	return (
		<div className='post-card'>
			{loading && <h3>loading...</h3>}
			{!loading &&
				posts.map((post, key) => {
					return (
						<div key={post?._id} className='post-card-box'>
							<img className='post-card-img' src={post.selectedFile} alt='pix-1' />
							<h4>{post?.name}</h4>
							<p>{moment(post.createdAt).fromNow()}</p>
							<p>{post?.tags.map((tag) => `#${tag} `)}</p>
							<h4>{post?.title}</h4>
							<p>{post?.message} </p>
							<div className='like-post'>
								<button className='like-post-box-1 btn-clear-post' onClick={()=>{likePost(post._id)}} disabled={!user?.result}>
									<img
										src='https://img.icons8.com/material-rounded/24/000000/facebook-like--v1.png'
										alt='pix-2'
									/>
									<p>{post?.likeCount} likes</p>
								</button>
									{(user?.result?._id===post?.creator)&& (
										<div className='btn-post'>
											<button className='btn-delete-post' onClick={() => {
												if (window.confirm('Are you sure you wish to delete this item?'))
													deletePost(post._id);
											}}>delete</button>
											<Link to={`posts/editpost/${post._id}`}  className='btn-clear-post btn-links'>edit</Link>
										</div>

									)}
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Posts;
