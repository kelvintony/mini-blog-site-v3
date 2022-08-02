import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';


const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

	// const user = null;
	useEffect(()=>{

		//Log the user out when the token expires
		const token=user?.token  
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp*1000<new Date().getTime()) {
				logout()
			}
		}  
		//
		//
		setUser(JSON.parse(localStorage.getItem('profile')))
	},[location])

	const logout = () => {
		localStorage.clear();
		setUser(null);
		window.location='/'
	};

	return (  
		<nav className='navbar'> 
			<div className='navbar-box1'> 
				<img
					className='navbar-logo'
					src='https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-nodes-cryptocurrency-vitaliy-gorbachev-blue-vitaly-gorbachev.png'
					alt='pix-1'
				/>
				<Link className='btn-links' to='/'>
					<h1 className='navbar-heading'>Project-X</h1>
				</Link>
			</div>
			<div className='navbar-box2'>
				{user ? (
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<h5>{user?.result?.name}</h5>
						{/* <h5>Ivy</h5> */}
						<Link onClick={logout} to='/' className='btn-login  btn-links'>
							Logout
						</Link>
					</div>
				) : (
					<div>
						<Link to='/signin' className='btn-login  btn-links'>
							Login
						</Link>
					</div>
				)}

				<Link to='posts/createpost' className=' btn-links btn-login'>
					Create Post
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
