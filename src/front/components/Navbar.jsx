import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Navbar = () => {

	const {store, dispatch} = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Volver al Inicio</span>
				</Link>
				<div className="ml-auto">
					{
						store.token?
						<>
							<button 
								onClick = { () => {
									dispatch({type: "logout"})
									localStorage.removeItem("token")
								}} 
								className="btn btn-primary" 
								to="/demo">
								Cerrar Sesión
							</button>
						</>:
						<>
							{/* <Link to="/demo">
								<button className="btn btn-primary">Ingresar</button>
							</Link>
							<Link to="/demo">
								<button className="btn btn-primary">Registrarme</button>
							</Link> */}
						</>
					}
				</div>
			</div>
		</nav>
	);
};