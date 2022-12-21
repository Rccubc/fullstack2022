const Person = ({ person, clickHandler }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={clickHandler}>delete</button>
    </p>
  );
};

const Persons = ({ persons, clickHandlerGenerator }) => {
  return persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      clickHandler={clickHandlerGenerator(person.id)}
    />
  ));
};

export default Persons;
