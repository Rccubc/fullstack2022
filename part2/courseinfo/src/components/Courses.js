import React from "react";

const Header = ({ name }) => <h2>{name}</h2>;

const Total = ({ sum }) => (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  let sum = course.parts.reduce((sum, curPart) => {
    // console.log("Course::reduce=", sum);
    return sum + curPart.exercises;
  }, 0);
  // console.log("Course::sum=", sum);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
