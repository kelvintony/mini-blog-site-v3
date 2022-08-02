import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

const EditPost = () => {
	const [ post, setPost ] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
	const [ isLoading, setisLoading ] = useState(false);
	const user =JSON.parse(localStorage.getItem('profile'))

	// icon load
	const [ isIconLoading, setIsIconLoading ] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();


	useEffect(() => { 
		const getPosts = async () => {
			setisLoading(true);
			await authAxios
				.get(`/posts/${id}`)
				.then((res) => {
					setPost({ 
						...post,
						creator: res.data.creator,
						name: user?.result?.name,
						title: res.data.title,
						message: res.data.message,
						tags: res.data.tags,
						selectedFile: res.data.selectedFile
					});
					console.log(res.data);
					setisLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getPosts();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsIconLoading(true);

		await authAxios
			.put(`/posts/${id}`, post)
			.then(function(response) {
				if (response) {
					// localStorage.setItem('task', JSON.stringify(response.data.results));
					setIsIconLoading(false);
					alert('updated succefully');
					navigate('/');
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	const handleClear = () => {};

	return (
		<section className='post-input'>
			{isLoading && <h3>loading...</h3>}
			{!isLoading && (
				<div className='post-input-content'>
					<h3 className='blog-header'>Update This Blog</h3>
					<br />
					<label>
						Tile <br />
						<input
							type='text'
							name='title'
							value={post.title}
							onChange={(e) => setPost({ ...post, title: e.target.value })}
						/>
					</label>{' '}
					<br />
					<label>
						Message <br />
						<textarea
							name='message'
							cols='30'
							rows='10'
							value={post.message}
							onChange={(e) => setPost({ ...post, message: e.target.value })}
						/>
					</label>{' '}
					<br />
					<label>
						Tag <br />
						<input
							type='text'
							name='tag'
							value={post.tags}
							onChange={(e) => setPost({ ...post, tags: e.target.value })}
						/>
					</label>{' '}
					<br />
					<div>
						<FileBase
							type='file'
							multiple={false}
							onDone={({ base64 }) => setPost({ ...post, selectedFile: base64 })}
						/>
					</div>
					<span>no file chosen</span> <br />
					<div>
						<button className='btn-submit' onClick={handleSubmit} disabled={isIconLoading}>
							{isIconLoading && <i className='fa fa-refresh fa-spin' />} Update
						</button>{' '}
						<br />
						<button className='btn-clear' onClick={handleClear}>
							Clear
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default EditPost;
