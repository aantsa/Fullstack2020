import React from "react";
import Person from "./Person";

const Persons = ({ personsToShow, personToDelete }) => {
  return (
    <div>
      {personsToShow.map((person, i) => (
        <div key={person.id}>
          <Person person={person} personToDelete={personToDelete} />
        </div>
      ))}
    </div>
  );
};

export default Persons;
