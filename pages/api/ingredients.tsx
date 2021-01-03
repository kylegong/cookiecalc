// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { INGREDIENTS } from "../../lib/ingredients";

export default (req, res) => {
  res.statusCode = 200;
  res.json(INGREDIENTS);
};
