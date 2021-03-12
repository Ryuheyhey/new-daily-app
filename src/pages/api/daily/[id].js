import dbConnect from '../../../utils/dbConnect'
import Daily from '../../../models/Daily'

dbConnect()

export default async (req, res) => {
  const {
    query: {id},
    method
  } = req

  switch(method) {
    case 'GET':
      try {
        const daily = await Daily.findById(id).sort({created: 'desc'})
        res.json({success: true, data: daily})
        if (!daily) {
         return res.status(400).json({message: "投稿が存在しません。"})
        }
      } catch (error) {
        return res.status(400).json({message: "取得に失敗しました。"})
      }
      break;
    case 'PUT':
      try {
      //  const upDateDaily = Daily.findById(id, async (doc) => {
      //       doc.title = req.body.title
      //       doc.content_1 = req.body.content_1
      //       doc.content_2 = req.body.content_2
      //       doc.content_3 = req.body.content_3
      //       doc.content_4 = req.body.content_4
  
      //     })
      //     const newDaily = await upDateDaily.save()
      //     res.json(newDaily)
      const daily = await Daily.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      })
      if (!daily) {
        return res.status(400).json({message: "更新する投稿が見つかりません。"})
      }
      res.status(200).json({message: "更新しました。", data: daily})
      } catch (error) {
         res.status(400).json({message: "更新に失敗しました。"})
      }
      break;
      case 'DELETE':
        try {
          const deleteDaily = await Daily.deleteOne({_id: id})
        if (!deleteDaily) {
          return res.status(400).json({message: "消去する投稿が見つかりませんでした。"})
        }
          res.status(200).json({message: "消去しました。"})
        } catch (error) {
          res.status(400).json({message: "消去に失敗しました。"})
        }
      break;
      default:
        return res.status(400).json({message: "エラーが発生しました。"})

  }
}