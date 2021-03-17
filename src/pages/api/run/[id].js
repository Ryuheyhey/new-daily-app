import dbConnect from "../../../utils/dbConnect";
import RunDaily from "../../../models/RunDaily";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const runDaily = await RunDaily.findById(id).sort({ created: "desc" });
        if (!runDaily) {
          return res.status(400).json({ message: "投稿が存在しません。" });
        }
        res.json({ success: true, data: runDaily });
      } catch (error) {
        return res.status(400).json({ message: "取得に失敗しました。" });
      }
      break;
    case "PUT":
      try {
        const runDaily = await RunDaily.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!runDaily) {
          return res
            .status(400)
            .json({ message: "更新する投稿が見つかりません。" });
        }
        res.status(200).json({ message: "更新しました。", data: runDaily });
      } catch (error) {
        res.status(400).json({ message: "更新に失敗しました。" });
      }
      break;
    case "DELETE":
      try {
        const deleteDaily = await RunDaily.deleteOne({ _id: id });
        if (!deleteDaily) {
          return res
            .status(400)
            .json({ message: "消去する投稿が見つかりませんでした。" });
        }
        res.status(200).json({ message: "消去しました。" });
      } catch (error) {
        res.status(400).json({ message: "消去に失敗しました。" });
      }
      break;
    default:
      return res.status(400).json({ message: "エラーが発生しました。" });
  }
};
