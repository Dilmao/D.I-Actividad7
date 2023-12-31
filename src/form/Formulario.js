import './Formulario.css'
import { useCallback, useEffect, useState } from "react"
import React from 'react'

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

    const [botonClickable, setBotonClickable] = useState(false)

    const url = "http://localhost:5000/users"

    function handleValidateNombre(event) {
        let enteredNombre = event.target.value
        setNombre(enteredNombre)
        if(enteredNombre !== "" && enteredNombre.length <= 10) {
            setMensajeNombre("")
        } else if(enteredNombre.length > 10) {
            setMensajeNombre("El nombre no debe ser superior a 10 caracteres")
        } else {
            setMensajeNombre("El nombre no puede estar vacio")
        }
    }

    function handleValidateApellido(event) {
        let enteredApellido = event.target.value
        setApellido(enteredApellido)
        if(enteredApellido !== "" && enteredApellido.length <= 20) {
            setMensajeApellido("")
        } else if(enteredApellido.length > 20) {
            setMensajeApellido("El apellido no debe ser superior a 20 caracteres")
        } else {
            setMensajeApellido("El apellido no puede estar vacio")
        }
    }

    function handleValidateEmail(event) {
        let enteredEmail = event.target.value
        setEmail(enteredEmail)
        if(enteredEmail !== "" && enteredEmail.length <= 20 && enteredEmail.includes("@")) {
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
        let enteredSexo = event.target.value
        setSexo(enteredSexo)
        if(enteredSexo !== "") {
            setMensajeSexo("")
        } else {
            setMensajeSexo("El sexo no puede estar vacio")
        }
    }

    function handleValidateMensaje(event) {
        setMensaje(event.target.value)
        if(mensaje.length <= 500) {
            setMensajeMensaje("")
        } else {
            setMensajeMensaje("El mensaje no debe ser superior a 500 caracteres")
        }
    }

    function handleValidateTerminos(event) {
        setTerminos(event.target.checked)
        if (terminos) {
            setMensajeTerminos("Se tienen que aceptar los terminos y condiciones")
        } else {
            setMensajeTerminos("")
        }
    }

    const handleValidateAll = useCallback(() => {
        if 
        (
            (nombre.length !== 0 && nombre.length <= 10) &&
            (apellido.length !== 0 && apellido.length <= 20) &&
            (email.length <= 20 && email.includes("@")) &&
            (sexo !== "") &&
            (mensaje.length <= 500) &&
            (terminos)
        ) {
            setBotonClickable(true)
        } else {
            setBotonClickable(false)
        }
    }, [nombre, apellido, email, sexo, mensaje, terminos, botonClickable])

    useEffect(() => {
        handleValidateAll();
      }, [handleValidateAll]);

    async function fetchPost(url,data) {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(data), //Convierte JS en JSON
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            sexo: sexo,
            mensaje: mensaje,
            terminos: terminos
        };
        fetchPost(url, data).then(() => {
            alert("Usuario guardado con exito");
        })
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
                <label className='Texto'> Acepto los terminos y condiciones</label>
                <p className='Texto'>{mensajeTerminos}</p>

                <br/>
                <button type="submit" disabled={!botonClickable} className={`${botonClickable ? 'BotonClickable' : 'Boton'}`}>Click to submit</button>
            </div>
        </form>
    )
}

export default Fomrulario