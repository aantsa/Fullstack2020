import React from "react";

const Person = ({ person, personToDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => personToDelete(person.id, person.name)}>delete</button>
    </div>
  );
};

export default Person;
