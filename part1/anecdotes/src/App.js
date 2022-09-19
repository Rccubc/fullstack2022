import { useState } from "react";

const Anecdote = ({ anecdote }) => {
  return (
    <p>
      {anecdote.content}
      <br />
      has {anecdote.vote} votes
    </p>
  );
};

const App = () => {
  const originAnecdotes = [
    { content: "If it hurts, do it more often", vote: 0 },
    {
      content: "Adding manpower to a late software project makes it later!",
      vote: 0,
    },
    {
      content:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      vote: 0,
    },
    {
      content:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      vote: 0,
    },
    { content: "Premature optimization is the root of all evil.", vote: 0 },
    {
      content:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      vote: 0,
    },
    {
      content:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
      vote: 0,
    },
  ];

  const [anecdotes, setAnecdotes] = useState(originAnecdotes);
  const [selected, setSelected] = useState(0);

  const handleVote = () => {
    let newAnecdotes = structuredClone(anecdotes);
    newAnecdotes[selected].vote += 1;
    setAnecdotes(newAnecdotes);
  };

  const handleNext = () => {
    let newIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(newIndex);
  };

  const getMostVoteAnecdote = () => {
    let max = anecdotes[0].vote;
    let maxIndex = 0;
    let length = anecdotes.length;
    for (let i = 1; i < length; ++i) {
      if (anecdotes[i].vote > max) {
        max = anecdotes[i].vote;
        maxIndex = i;
      }
    }
    return anecdotes[maxIndex];
  };

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} />
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => handleNext()}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={getMostVoteAnecdote()} />
    </>
  );
};

export default App;
