import './Formulario.css'
import { useCallback, useEffect, useState } from "react"

function Fomrulario() {

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [sexo, setSexo] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [terminos, setTerminos] = useState("")

    const [mensajeNombre, setMensajeNombre] = useState("")
    const [mensajeApellido, setMensajeApellido] = useState("")
    const [mensajeEmail, setMensajeEmail] = useState("")
    const [mensajeSexo, setMensajeSexo] = useState("")
    const [mensajeMensaje, setMensajeMensaje] = useState("")
    const [mensajeTerminos, setMensajeTerminos] = useState("")
    const [mensajeButton, setMensajeButton] = useState("")

    function handleValidateNombre(event) {
        const enteredNombre = event.target.value
        if(enteredNombre !== "" && enteredNombre.length <= 10) {
            setNombre(enteredNombre)
            setMensajeNombre("")
        } else if(enteredNombre.length > 10) {
            setMensajeNombre("El nombre no debe ser superior a 10 caracteres")
        } else {
            setMensajeNombre("El nombre no puede estar vacio")
        }
    }

    function handleValidateApellido(event) {
        const enteredApellido = event.target.value
        if(enteredApellido !== "" && enteredApellido.length <= 20) {
            setApellido(enteredApellido)
            setMensajeApellido("")
        } else if(enteredApellido.length > 20) {
            setMensajeApellido("El apellido no debe ser superior a 20 caracteres")
        } else {
            setMensajeApellido("El apellido no puede estar vacio")
        }
    }

    function handleValidateEmail(event) {
        const enteredEmail = event.target.value
        if(enteredEmail !== "" && enteredEmail.length <= 20 && enteredEmail.includes("@")) {
            setEmail(enteredEmail)
            setMensajeEmail("")
        } else if(enteredEmail.length > 20) {
            setMensajeEmail("El email no debe ser superior a 20 caracteres")
        } else if(!enteredEmail.includes("@")) {
            setMensajeEmail("El email debe contener un @")
        } else {
            setMensajeEmail("El email no puede estar vacio")
        }
    }

    function handleValidateSexo(event) {
        const enteredSexo = event.target.value
        if(enteredSexo !== "") {
            setSexo(enteredSexo)
            setMensajeSexo("")
        } else {
            setMensajeSexo("El sexo no puede estar vacio")
        }
    }

    function handleValidateMensaje(event) {
        const enteredMensaje = event.target.value
        if(enteredMensaje.length <= 500) {
            setMensaje(enteredMensaje)
            setMensajeMensaje("")
        } else {
            setMensajeMensaje("El mensaje no debe ser superior a 500 caracteres")
        }
    }

    function handleValidateTerminos(event) {
        const enteredTerminos = event.target.checked
        if (enteredTerminos) {
            setTerminos(true)
            setMensajeTerminos("")
        } else {
            setTerminos(false)
            setMensajeTerminos("Se tienen que aceptar los terminos y condiciones")
        }
    }

    const handleValidateAll = useCallback(() => {
        if 
        (
            (nombre !== "" || nombre <= 10) &&
            (apellido !== "" || apellido <= 20) &&
            (email !== "" || email <= 20 || email.includes("@")) &&
            (sexo !== "") &&
            (mensaje.length <= 500) &&
            (terminos)
        ) {
            setMensajeButton("Se puede enviar el formulario")
        } else {
            setMensajeButton("Falta uno o mas campos por rellenar")
        }
    }, [nombre, apellido, email, sexo, mensaje, terminos])

    useEffect(
        function(){
            handleValidateAll();
        },
        [handleValidateAll]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className='Form' onSubmit = {handleSubmit}>
            <div>
                <h1 className='Texto'>Formulario</h1>
        
                <p className='Texto'>Introduzca su nombre: </p>
                <input type="text" className='Campo' onChange={handleValidateNombre}/>
                <p className='Texto'>{mensajeNombre}</p>

                <p className='Texto'>Introduzca sus apellidos: </p>
                <input type="text" className='Campo' onChange={handleValidateApellido}/>
                <p className='Texto'>{mensajeApellido}</p>

                <p className='Texto'>Introduzca su email: </p>
                <input type="email" className='Campo' onChange={handleValidateEmail}/>
                <p className='Texto'>{mensajeEmail}</p>

                <p className='Texto'>Introduzca su sexo: </p>
                <select className='Select' onChange={handleValidateSexo}>
                    <option value=""></option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                </select>
                <p className='Texto'>{mensajeSexo}</p>

                <p className='Texto'>Introduzca su mensaje: </p>
                <textarea className='Area' onChange={handleValidateMensaje}/>
                
                <p className='Texto'> Caracteres: {500 - mensaje.length}</p>
                <p className='Texto'>{mensajeMensaje}</p>

                <input type="checkbox" onChange={handleValidateTerminos}/>
                <laebl className='Texto'> Acepto los terminos y condiciones</laebl>
                <p className='Texto'>{mensajeTerminos}</p>

                <br/>
                <button type="submit" className='Boton'>Click to submit</button>
                <p className='Texto'>{mensajeButton}</p>
            </div>
        </form>
    )
}

export default Fomrulario