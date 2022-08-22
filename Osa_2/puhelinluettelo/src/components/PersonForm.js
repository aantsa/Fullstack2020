import React, { useState } from "react";
const PersonForm = ({ addPerson, newPerson, handleChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <p>name: </p>
          <input name="name" value={newPerson.name} onChange={handleChange} />
        </div>
        <div>
          <p>number: </p>
          <input
            name="number"
            value={newPerson.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
