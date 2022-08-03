import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:5000';

const authAxios = axios.create({
	baseURL: apiUrl
});

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const Register = () => {
	const [ formData, setFormData ] = useState(initialState);

	const [ isLoading, setisLoading ] = useState(false);

	const [ error, setError ] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (
			formData.firstName.length === 0 ||
			formData.lastName.length === 0 ||
			formData.email.length === 0 ||
			formData.password.length === 0 ||
			formData.confirmPassword.length === 0
		) {
			setError(true);
		}

		if (formData.password !== formData.confirmPassword) {
			return alert('passwords must match');
		}

		if (
			formData.firstName &&
			formData.lastName &&
			formData.email &&
			formData.password &&
			formData.confirmPassword
		) {
			setisLoading(true);
			await authAxios
				.post('/user/signup', formData)
				.then(function(response) {
					if (response) {
						localStorage.setItem('profile', JSON.stringify(response.data));
						setisLoading(false);
						alert('signup succefully');
						navigate('/');
					}
				})
				.catch(function(error) {
					setisLoading(false);
					alert('Email already exist');
				});
		}
	};

	return (
		<div className='register-container'>
			<div className='post-input-content'>
				<h3 className='blog-header'>Register</h3>
				<label>
					First Name <br />
					<input
						type='text'
						name='firstName'
						value={formData.firstName}
						onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
					/>
				</label>{' '}
				<br />
				{error && formData.firstName.length <= 0 ? (
					<label style={{ color: 'red' }}>first name can't be empty</label>
				) : (
					''
				)}
				<br />
				<label>
					Last Name <br />
					<input
						type='text'
						name='lastName'
						value={formData.lastName}
						onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
					/>
				</label>{' '}
				<br />
				{error && formData.lastName.length <= 0 ? (
					<label style={{ color: 'red' }}>last name can't be empty</label>
				) : (
					''
				)}
				<br />
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
				<label>
					Confirm Password <br />
					<input
						type='password'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
					/>
				</label>{' '}
				<br />
				{error && formData.confirmPassword.length <= 0 ? (
					<label style={{ color: 'red' }}>confirm Password can't be empty</label>
				) : (
					''
				)}
				<br />
				<div>
					<div>
						<button className='btn-submit' type='submit' onClick={handleSubmit} disabled={isLoading}>
							{isLoading && <i className='fa fa-refresh fa-spin' />} Register
						</button>{' '}
						<br />
						<Link className='btn-links' to='/signin'>
							Already have an account? signin
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
