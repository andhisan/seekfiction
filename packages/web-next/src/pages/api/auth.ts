import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

export default async function auth(req: Req, res: Res) {
  if (!req.headers.authorization || req.headers.authorization !== process.env.CLIENT_AUTH) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const body = JSON.parse(req.body);
  const path = body.path;

  return await fetch(path, {
    method: body.method ?? 'GET',
    headers: {
      Authorization: process.env.FUNCTIONS_AUTH ?? '',
    },
  })
    .then(async (response) => {
      const json = await response.json();
      // Pass dataZZ as is
      return res.status(response.status).send(json);
    })
    .catch((e) => {
      return res.status(500).json({ message: 'Error occured while calling internal API: ' + JSON.stringify(e) });
    });
}
