const Header = (props) => {
  let courseName = props.course.name;

  return <h1>{courseName}</h1>;
};

const Part = (props) => {
  let part = props.part;
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = (props) => {
  let part1 = props.course.parts[0];
  let part2 = props.course.parts[1];
  let part3 = props.course.parts[2];

  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  );
};

const Total = (props) => {
  let exercises1 = props.course.parts[0].exercises;
  let exercises2 = props.course.parts[1].exercises;
  let exercises3 = props.course.parts[2].exercises;
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
