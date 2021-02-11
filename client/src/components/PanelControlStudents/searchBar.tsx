import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCohortes } from "../../Store/Actions/Cohortes"
import { getUsersbyCohorte, SearchByName, searchGithub } from "../../Store/Actions/Users"
import "./searchBar.css"

export default function SearchBar(props: any) {
    const [alumno, setAlumno] = useState('')
    const [github, setGithub] = useState('')
    const dispatch = useDispatch()
    const { cohortes } = useSelector((state: any) => state.Cohortes);

    const lupita = "https://media.istockphoto.com/vectors/magnifying-glass-icon-magnifier-symbol-concept-search-for-people-to-vector-id1173137813?k=6&m=1173137813&s=170667a&w=0&h=6Ar342lRTbRXSpIe5o8IWeGwtbDsjwzH9p7dTDagvak="

    /*     useEffect(() => {
            dispatch(getCohortes())
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []); */

    function handlerInput(e: any) {
        setAlumno(e.target.value)
    }
    function handlerInput2(e: any) {
        setGithub(e.target.value)
    }

    function handleSelect(e: any) {
        dispatch(getUsersbyCohorte(e.target.value))
    }

    function onSubmit(e: any) {
        e.preventDefault()
        let payload = alumno.split(" ")
        const paylud = github
        // Borra los inputs
        let inputs = document.querySelectorAll('input')
        inputs.forEach(c => {
            c.value = ""
        })
        //borra los estados locales para evitar problemas de búsqueda
        setAlumno("")
        setGithub("")

        if (github !== "") {
            dispatch(searchGithub(paylud))
        } else if (payload[0] === "") {
            payload = [props.id, "all", props.id]
            dispatch(SearchByName(payload))
        } else {
            payload.push(props.id)
            dispatch(SearchByName(payload))
        }

    }

    return (
        <div className="search-nav">
            <form id='pc-campos-busqueda' onSubmit={(e) => onSubmit(e)}>
                <input name="Buscador" type="search" id='inlineFormInputGroup' placeholder='Filtrar por nombre...'
                    onChange={(e) => handlerInput(e)} />
                <button className="button-search" type='submit'>
                    <img className="icon-S" src={lupita} alt="img-lupa"></img>
                </button>
                {(window.location.pathname === "/PanelControlStudent") ?
                    <>
                        <input name="Buscador2" type="search" id='inlineFormInputGroup' placeholder='por github...'
                            onChange={(e) => handlerInput2(e)} />
                        <button className="button-search" type='submit'>
                            <img className="icon-S" src={lupita} alt="img-lupa"></img>
                        </button>
                        <br />
                        <label htmlFor="cohorte" id="pc-label-filtro-cohorte">por Cohorte: </label>
                        <select id='pc-filtro-cohorte' name="cohorte" onChange={(e) => handleSelect(e)}>
                            <option value="todos">Todos</option>
                            <option value="none">Sin Cohorte</option>
                            {cohortes && cohortes.length > 0 && cohortes.map((c: any) => {
                                return (
                                    <option key={c._id} value={c._id} >{c.Nombre}</option>
                                )
                            })}
                        </select>
                    </>
                    : null}

            </form>
        </div>
    );

}