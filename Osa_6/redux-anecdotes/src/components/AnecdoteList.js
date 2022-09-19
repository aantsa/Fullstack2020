import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const vote = (id) => {
    dispatch(addVote(id));
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(showNotification(`you voted '${votedAnecdote.content}'`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  return [...anecdotes]
    .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
