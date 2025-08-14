import {useState} from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import {Link, useNavigate} from "react-router-dom"

const initialStateUser = {
    email: "",
    password: ""
}

export const Login = () => {

    const [user, setUser] = useState(initialStateUser)

    const {dispatch, store} = useGlobalReducer()

    const navigate = useNavigate()

    const handleChange = ({target}) => {
        setUser({
            ... user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const urlBackend = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${urlBackend}/api/login`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const data = await response.json()

        if (response.ok){
            localStorage.setItem("token", data.token)
            dispatch({
                type: "login", 
                payload: data.token
            })
            setTimeout(() => {
                navigate("/demo")
            }, 2000)
        } else if (response.status === 400) {
            alert("Credenciales incorrectas")
        } else{
            alert("Error al iniciar sesión, comunicate con soporte al cliente")
        }
    }

    return (
        <div className= "container">
            <div className="row justify-content-center">
                <h2 className="text-center my-3 text-primary">Acceso al Portal</h2>
                <div className="col-12 col-md-6 border py-2 bg-light rounded">
                    <form
                        className="m-2 p-3"
                        onSubmit={handleSubmit}>
                        <div className="form-group mb-3 ">
                            <label className="pb-2" htmlFor="btnEmail">Correo electrónico:</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="nombre_correo@gmail.com"
                                id="btnEmail"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="pb-2" htmlFor="btnPass">Contraseña:</label>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="password"
                                id="btnPass"
                                name="password"
                                onChange={handleChange}
                                value={user.password}                                           
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary w-100">
                            Iniciar sesión
                        </button>
                    </form>
                </div>
                <div className="w-100"></div>
                <div className="col-12 col-md-6 d-flex justify-content-between mt-1 p-2">
                    <Link to="/signup"> Registrarse </Link>
                    <Link to="/recovery-password"> Recuperar contraseña </Link>
                </div>
            </div>
        </div>
    )
}