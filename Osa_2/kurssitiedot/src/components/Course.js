import React from "react";

const Course = (props) => {
  return (
    <div>
      {props.course.map((course, i) => (
        <div key={i}>
          <Header course={props.course[i].name} />
          <Content part={props.course[i].parts} />
        </div>
      ))}
    </div>
  );
};

const Header = ({ course }) => <h2>{course}</h2>;

const Part = (props) => {
  return (
    <>
      {props.part.map((part, i) => (
        <p key={i}>
          {props.part[i].name} {props.part[i].exercises}
        </p>
      ))}
    </>
  );
};

const Content = ({ part }) => {
  const total = part.reduce((total, { exercises }) => total + exercises, 0);
  return (
    <>
      <Part part={part} />
      <b>Total of exercises {total}</b>
    </>
  );
};
export default Course;
