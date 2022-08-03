import React, { useState } from 'react';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:5000';

const authAxios = axios.create({
	baseURL: apiUrl
});

const initialState = {
	email: '',
	password: ''
};

const Signin = () => {
	const [ formData, setFormData ] = useState(initialState);

	const [ isLoading, setisLoading ] = useState(false);

	const [ error, setError ] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (formData.email.length === 0 || formData.password.length === 0) {
			setError(true);
		}

		if (formData.email && formData.password) {
			setisLoading(true);
			await authAxios
				.post('/user/signin', formData)
				.then(function(response) {
					if (response) {
						localStorage.setItem('profile', JSON.stringify(response.data));
						setisLoading(false);
						alert('signin succefully');
						navigate('/');
						// console.log(response.message);
					}
				})
				.catch(function(error) {
					setisLoading(false);
					alert('incorrect username or password');
				});
			// console.log(formData);
		}
	};

	return (
		<div className='signin-container'>
			<div className='post-input-content'>
				<h3 className='blog-header'>Signin</h3>
				<label>
					Email <br />
					<input
						type='text'
						name='email'
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					/>
				</label>{' '}
				<br />
				{error && formData.email.length <= 0 ? (
					<label style={{ color: 'red' }}>email can't be empty</label>
				) : (
					''
				)}
				<br />
				<label>
					Password <br />
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					/>
				</label>{' '}
				<br />
				{error && formData.password.length <= 0 ? (
					<label style={{ color: 'red' }}>password can't be empty</label>
				) : (
					''
				)}
				<br />
				<div>
					<button className='btn-submit' type='submit' onClick={handleSubmit}>
						{isLoading && <i className='fa fa-refresh fa-spin' />} Signin
					</button>{' '}
					<br />
					<Link className='btn-links' to='/register'>
						Don't have an account? register
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signin;
