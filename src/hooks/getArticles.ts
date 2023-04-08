import { gql } from "@apollo/client"
import client from "../../apollo-client"

export const getUsers = async () => {
  console.log('getArticles');

  const { data } = await client.query({
    query: gql`
      query {
        users {
          id
          name
          city
        }
      }
    `,
  })
  return data
}
export const getUser = async (id: number) => {
  console.log('getUser with id', id);

  const { data } = await client.query({
    query: gql`
      query user($id:ID) {
        user(id:$id) {
          name
          city
        }
      }
    `,
    variables: {
      id: id
    }
  })

  return data
}