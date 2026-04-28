import {
  StateSchema,
  MessagesValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

type jugmental = {
  winner: "solution_1" | "solution2";
  solution_1_score: 0;
  solution_2_score: 0;
};
type AIBATTLEGROUND = {
  message: typeof MessagesValue;
  solution_1: string;
  solution_2: string;
  jugemental: jugmental;
};

const AIState: AIBATTLEGROUND = {
  message: MessagesValue,
  solution_1: "",
  solution_2: "",
  jugemental: {
    winner: "solution_1",
    solution_1_score: 0,
    solution_2_score: 0,
  },
};

export default AIState;