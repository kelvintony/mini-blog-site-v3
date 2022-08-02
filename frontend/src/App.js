import './App.css';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditPost from './components/EditPost/EditPost';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Posts />} />
					<Route exact path='posts/createpost' element={<Form />} />
					<Route exact path='posts/editpost/:id' element={<EditPost />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/signin' element={<Signin />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
