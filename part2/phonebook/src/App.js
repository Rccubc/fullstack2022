import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");

  const shownPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
  );

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "nameInput":
        setNewName(event.target.value);
        break;
      case "numberInput":
        setNewNumber(event.target.value);
        break;
      case "filterWordInput":
        setFilterWord(event.target.value);
        break;
      default:
        break;
    }
  };

  const addPerson = (newPerson) => {
    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const updatePerson = (existedPerson, newPerson) => {
    personService.update(existedPerson.id, newPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) =>
          person.id !== returnedPerson.id ? person : returnedPerson
        )
      );
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (person) => {
    personService.del(person.id).then((responseData) => {
      // console.log(responseData);
      setPersons(persons.filter((p) => p.id !== person.id));
      setNewName("");
      setNewNumber("");
    });
  };

  const addClickHandler = (event) => {
    event.preventDefault();
    // console.log(event.target);
    if (newName === "" || newNumber === "") {
      return;
    }
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newPerson = { ...existingPerson, number: newNumber };
        updatePerson(existingPerson, newPerson);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1,
      };

      addPerson(newPerson);
    }
  };

  const deleteClickHandlerGenerator = (id) => () => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        name="filterWordInput"
        value={filterWord}
        onChange={handleInputChange}
      />

      <h3>add a new</h3>

      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        onChange={handleInputChange}
        onClick={addClickHandler}
      />

      <h3>Numbers</h3>

      <Persons
        persons={shownPersons}
        clickHandlerGenerator={deleteClickHandlerGenerator}
      />
    </div>
  );
};

export default App;
