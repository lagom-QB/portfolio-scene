import { gql, useQuery } from "@apollo/client";

const GET_AUTHOR = gql`
  query {
    authors {
      aboutMe
    }
  }
`;

export function useAuthorsQuery() {
  return useQuery(GET_AUTHOR);
}
