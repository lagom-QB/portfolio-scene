import { gql, useQuery } from "@apollo/client";

const GET_TECHSKILLS = gql`
  query {
    programmingLanguagez {
      language
      proficiency
    }
  }
`;

export function useTechSkillsQuery() {
  return useQuery(GET_TECHSKILLS);
}
