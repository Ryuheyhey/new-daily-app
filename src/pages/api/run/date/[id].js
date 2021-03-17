import dbConnect from "../../../../utils/dbConnect";
import RunDaily from "../../../../models/RunDaily";
const moment = require("moment");

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const runDaily = await RunDaily.find({
          created: {
            $gte: moment(`${id}`).toDate(),
            $lt: moment(`${id}`).add(1, "days").toDate(),
          },
        })
          .sort({ created: "desc" })
          .sort({ created: "desc" });
        res.json({ message: "取得に成功しました。", data: runDaily });
        if (!runDaily) {
          return res
            .status(400)
            .json({ message: `${id}日の投稿はありません。` });
        }
      } catch (error) {
        res.status(400).json({ message: "取得に失敗しました。" });
      }
  }
};
