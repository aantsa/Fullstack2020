import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdoteSlice",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const { id } = action.payload;
      const voteToUpdate = state.find((a) => a.id === id);
      const updatedVote = {
        ...voteToUpdate,
        votes: voteToUpdate.votes + 1,
      };
      return state.map((note) => (note.id !== id ? note : updatedVote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const voted = await anecdoteService.update(anecdote);
    dispatch(addVote(voted));
  };
};

export default anecdoteSlice.reducer;
