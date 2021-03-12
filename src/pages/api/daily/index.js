import dbConnect from '../../../utils/dbConnect'
import Daily from '../../../models/Daily'

dbConnect()

export default async (req, res) => {
  const {method} = req

  switch(method) {
    case 'GET':
      try {
        const daily = await Daily.find({}).sort({created: 'desc'})
        res.json({success: true, data: daily})
      } catch(error) {
      res.status(400).json({message: "取得に失敗しました。"})
      }
      break;
    case 'POST':
      try {
        const daily = new Daily({
          title: req.body.title,
          content_1: req.body.content_1, 
          content_2: req.body.content_2, 
          content_3: req.body.content_3, 
          content_4: req.body.content_4, 
          created: Date.now()
        })
        const saveDaily = await daily.save()
        res.status(200).json(saveDaily)
        // res.send(saveChecklist)
      } catch(error) {
      res.status(400).json({message: "登録に失敗しました。"})
      }
      break;
    default:
      res.status(400).json({message: "失敗しました。"})
      break;
  }
}