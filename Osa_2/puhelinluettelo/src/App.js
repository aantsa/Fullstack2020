import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchFilter, setSearchFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [personsToShow, setPersonsToShow] = useState([]);

  useEffect(() => {
    personService.getAll().then((pe) => {
      setPersons(pe.data);
      setPersonsToShow(pe.data);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  const addPerson = (event) => {
    event.preventDefault();

    const match = persons.filter(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (match.length === 0) {
      personService
        .create(newPerson)
        .then((res) => {
          setPersons([...persons, newPerson]);
          setPersonsToShow([...persons, newPerson]);
          setNotification({ message: `Added ${newPerson.name} to phonebook` });
        })
        .catch((error) =>
          setNotification({
            message: error?.response.data.error,
            error: true,
          })
        );
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        ) == true
      ) {
        personService.update(match[0].id, newPerson).then((res) => {
          const newList = persons.map((person) =>
            person.id !== res.id ? person : res
          );
          setPersons(newList);
          setPersonsToShow(newList);
          setNotification({ message: `Updated ${newPerson.name}'s number` });
        });
      }
    }
    setNewPerson({ name: "", number: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFilterChange = (event) => {
    const search = event.target.value;
    setSearchFilter(search);
    setPersonsToShow(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    );
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`) == true) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setPersonsToShow(persons.filter((person) => person.id !== id));
          setNotification({ message: `Removed ${name} from phonebook` });
        })
        .catch((error) =>
          setNotification({
            message: `Information of ${name} has already been removed from server`,
            error: true,
          })
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <div>
        <Filter filter={searchFilter} handleFilterChange={handleFilterChange} />
      </div>
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <div>
        <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} personToDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
