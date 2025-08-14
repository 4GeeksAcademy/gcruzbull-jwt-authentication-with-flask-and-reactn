import {useState} from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import {Link, useNavigate} from "react-router-dom"

const initialStateUser = {
    full_name: "",
    email: "",
    avatar: "",
    password: ""
}

export const Register = () => {

    const [user, setUser] = useState(initialStateUser)

    const handleChange = ({target}) => {
        setUser({
            ... user,
            [target.name]: target.value
        })
    }

    const {dispatch, store} = useGlobalReducer()
    
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const urlBackend = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${urlBackend}/api/signup`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if (response.status === 201) {
            setUser(initialStateUser)
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } else if (response.status === 400) {
            alert("El usuario ya existe")
        } else {
            alert("Error al registrar el usuario, intente nuevamente")
        }
    }

    return (
        <div className= "container">
            <div className="row justify-content-center">
                <h2 className="text-center my-3 text-primary">Formulario de Registro</h2>
                <div className="col-12 col-md-6 border py-2 bg-light rounded">
                    <form className="m-2 p-3" onSubmit={handleSubmit}>
                        <div className="form-group mb-3 ">
                            <label className="pb-2" htmlFor="btnName">Nombre Completo:</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="nombre apellido"
                                id="btnNombre"
                                name="full_name"
                                onChange={handleChange}
                                value={user.full_name}
                            />
                        </div>
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
                        <div className="form-group mb-3 ">
                            <label className="pb-2" htmlFor="btnAvatar">Imágen de Perfil:</label>
                            <input
                                className="form-control"
                                type="file"
                                placeholder="Cargar Imágen"
                                id="btnAvatar"
                                name="avatar"
                                // onChange={}
                                // value={user.email}
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
                            Registrarme
                        </button>
                    </form>
                </div>
                <div className="w-100"></div>
                <div className="col-12 col-md-6 d-flex justify-content-start mt-1 p-2">
                    <Link to="/login">
                        Ya tengo una cuenta
                    </Link>
                </div>
            </div>
        </div>
    )
}