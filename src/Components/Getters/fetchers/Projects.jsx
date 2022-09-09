import { gql, useQuery } from "@apollo/client";

const GET_PROJECTS = gql`
  query {
    projects {
      link
      name
      tags
    }
  }
`;

export function useProjectsQuery() {
  return useQuery(GET_PROJECTS);
}
