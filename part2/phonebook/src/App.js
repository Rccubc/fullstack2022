import { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Person";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");

  const shownPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1
  );

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
      default:
        break;
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    // console.log(event.target);
    if (newName === "" || newNumber === "") {
      return;
    }
    const result = persons.find((person) => person.name === newName);
    if (result !== undefined) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
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
        onClick={handleClick}
      />

      <h3>Numbers</h3>

      <Persons persons={shownPersons} />
    </div>
  );
};

export default App;
