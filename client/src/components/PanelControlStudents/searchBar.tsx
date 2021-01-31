import React,{ useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getCohortes} from "../../Store/Actions/Cohortes"
import {getUsersbyCohorte, SearchByName} from "../../Store/Actions/Users"
import "./searchBar.css"

export default function SearchBar(props: any) {
    const [alumno, setAlumno] = useState('')
    const dispatch = useDispatch()
    const { cohortes } = useSelector((state: any) => state.Cohortes);
    const {users} = useSelector((state: any) => state.Users)

    const lupita = "https://media.istockphoto.com/vectors/magnifying-glass-icon-magnifier-symbol-concept-search-for-people-to-vector-id1173137813?k=6&m=1173137813&s=170667a&w=0&h=6Ar342lRTbRXSpIe5o8IWeGwtbDsjwzH9p7dTDagvak="

    useEffect(() => {
        dispatch(getCohortes())
      }, []);

    function handlerInput(e: any) {
        setAlumno(e.target.value)
    }

    function handleSelect(e: any) {
        dispatch(getUsersbyCohorte(e.target.value))
    }

    function onSubmit(e: any) {
        e.preventDefault()
        let payload = alumno.split(" ")
        dispatch(SearchByName(payload))
        //dispatch del filtro
}

    return (
		<div className="search-nav">
			<form onSubmit={(e) => onSubmit(e)}>
				<input name="Buscador" type="search" id='inlineFormInputGroup' placeholder='Filtrar por nombre...' onChange={(e) => handlerInput(e)} />
				<button className="button-search" type='submit'>
					<img className="icon-S" src={lupita} alt="img-lupa"></img>
				</button>
                <label htmlFor="cohorte" id="SearchBarLabel">Filtrar por Cohorte:</label>
                <select name="cohorte" onChange={(e) => handleSelect(e)}>
                <option value="todos">Todos</option>
                {cohortes.length > 0 && cohortes.map((c: any) => {
                    return (
                                                   
                        <option key={c._id} value={c._id} >{c.Nombre}</option>
                       
                    )
                })}
                </select>
                
			</form>
		</div>
	);

}