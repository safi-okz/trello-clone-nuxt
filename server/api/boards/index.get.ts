import { Board } from "~/server/models/Board.model"

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const board = Board.find({
    owner: user.id
  });

  return board;
})
