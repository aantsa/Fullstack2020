  
import Person from "./Person";
import React from "react";

const Persons = (props) => {
    const filtered = props.persons.filter(person => person.name.toUpperCase().includes(props.newFilter.trim().toUpperCase()))
    const rows = filtered.map(person =>
        <Person
            key={person.name}
            name={person.name}
            number={person.number}
            id={person.id}
            removePerson={()=> props.removePerson(person)}
        />)
    return (
        <div>{rows}</div>
    )
}
export default Persons