import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Giovanne'},
    { id: 2, name: 'Beatriz'},
  ]

  return response.json(users);
}