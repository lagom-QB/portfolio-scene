import { gql, useQuery } from "@apollo/client";

const GET_TOOLS = gql`
  query {
    toolz {
      tools
      level
    }
  }
`;

export function useToolsQuery() {
  return useQuery(GET_TOOLS);
}
