import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreState } from './store/store';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import Cart from './pages/Cart';

function App() {
	const isLoggedIn = useSelector((state: IStoreState) => state.app.isLoggedIn);
	const isAdmin = useSelector((state: IStoreState) => state.app.isAdmin);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/'} element={<Books />} />
				<Route path={'/:bookId'} element={<BookDetails />} />
				<Route path={'/login'} element={isLoggedIn ? <Navigate to={'/'} /> : <Login />} />
				<Route path={'/signup'} element={isLoggedIn ? <Navigate to={'/'} /> : <Signup />} />
				<Route
					path={'/admin'}
					element={isLoggedIn ? isAdmin ? <Admin /> : <Navigate to={'/'} /> : <Navigate to={'/login'} />}
				/>
				<Route
					path={'/admin/create'}
					element={isLoggedIn ? isAdmin ? <CreateBook /> : <Navigate to={'/'} /> : <Navigate to={'/login'} />}
				/>
				<Route
					path={'/admin/edit/:bookId'}
					element={isLoggedIn ? isAdmin ? <EditBook /> : <Navigate to={'/'} /> : <Navigate to={'/login'} />}
				/>
				<Route path={'/cart'} element={isLoggedIn ? <Cart /> : <Navigate to={'/login'} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
