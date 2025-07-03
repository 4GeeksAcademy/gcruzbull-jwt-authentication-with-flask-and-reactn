import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export const UpdatePassword = () => {

    const [newPass, setNewPass] = useState()

    const navigate = useNavigate()

    const [searchParams, _ ] = useSearchParams()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!email){
            alert("Por favor ingrese un correo valido")
            return
        }

        const urlbackend = import.meta.env.VITE_BACKEND_URL;
        
        const response = await fetch(`${urlbackend}/update-password`, {
            method: "PUT",
            headers:{
                "Authorization": `Bearer ${searchParams.get("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPass)
        })

        if (response.ok) {
            navigate("/login")
        }
    }

    return  (
        <div className= "container">
            <div className="row justify-content-center">
                <h2 className="text-center my-3 text-primary">Actualizar Contraseña</h2>
                <div className="col-12 col-md-6 border py-4 bg-light rounded">
                    <form
                        onSubmit={handleSubmit}>
                        <div className="form-group mb-3 ">
                            <label className="pb-2" htmlFor="btnPassword">Correo electrónico:</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="contraseña"
                                id="btnPassword"
                                name="password"
                                onChange={(event) => setNewPass(event.target.value)}
                                value={newPass}
                            />
                        </div>
                        <button className="btn btn-outline-primary w-100">
                            Enviar link de actualización
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ) 
}