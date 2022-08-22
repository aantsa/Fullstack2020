import React from "react";
import notes from "../services/notes";

const Person = ({ person, personToDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => personToDelete(person.id, person.name)}>delete</button>
    </div>
  );
};

export default Person;
