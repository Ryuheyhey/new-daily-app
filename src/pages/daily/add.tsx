import MainLayout from "../../layout/layout"
import {TextLine, DailyText, PrimaryButton} from "../../components/index"
import styles from "../../styles/Home.module.css"
import Router from "next/router"
import { useCallback, useState } from "react"

const DailyAdd = () => {
  const [title, setTitle] = useState<string>("")
  const [content_1, setContent1] = useState<string>("")
  const [content_2, setContent2] = useState<string>("")
  const [content_3, setContent3] = useState<string>("")
  const [content_4, setContent4] = useState<string>("")

  const handleTitle = useCallback((e) => {
    setTitle(e.target.value)
  },[])

  const handleContent1 = useCallback((e) => {
    setContent1(e.target.value)
  },[])

  const handleContent2 = useCallback((e) => {
    setContent2(e.target.value)
  },[])

  const handleContent3 = useCallback((e) => {
    setContent3(e.target.value)
  },[])

  const handleContent4 = useCallback((e) => {
    setContent4(e.target.value)
  },[])
  
console.log(title);
console.log(content_1);
console.log(content_2);
console.log(content_4);


  const handleSubmit = (e) => {
    // httpsメソッドを叩く
    fetch(
      '/api/daily', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content_1: content_1,
        content_2: content_2,
        content_3: content_3,
        content_4: content_4,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': '*',
      }
    }
    );
    Router.push("/");
    e.preventDefault();
  }

  return (
    <MainLayout title={"進歩チェックリスト"} link={"/"}>
      <div className={styles.space_sm} />
      <TextLine text={"今日の出来事"}/>
      <form onSubmit={handleSubmit}>
      <div style={{padding: "1rem 1rem 0 1rem"}}>
      <DailyText 
        label={"今日進歩したことは？"}
        multiline={true}
        rows={4}
        fullWidth={true}
        onChange={handleTitle}
        value={title}
      />
      </div>
      <div style={{padding: "1rem 1rem 0 1rem"}}>
      <DailyText 
        label={"それをどう感じた？"}
        multiline={true}
        rows={4}
        fullWidth={true}
        onChange={handleContent1}
        value={content_1}
      />
      </div>
      <div style={{padding: "1rem 1rem 0 1rem"}}>
      <DailyText 
        label={"明日も進歩を維持するには？"}
        multiline={true}
        rows={4}
        fullWidth={true}
        onChange={handleContent2}
        value={content_2}
      />
      </div>
      <div style={{padding: "1rem 1rem 0 1rem"}}>
      <DailyText 
        label={"今日あった障害は？"}
        multiline={true}
        rows={4}
        fullWidth={true}
        onChange={handleContent3}
        value={content_3}
      />
      </div>
      <div style={{padding: "1rem 1rem 0 1rem"}}>
      <DailyText 
        label={"明日その障害を避けるには？"}
        multiline={true}
        rows={4}
        fullWidth={true}
        onChange={handleContent4}
        value={content_4}
      />
      </div>
      <div className={styles.space_md} />
      <div className={styles.center}>
      <PrimaryButton 
        label={"追加する"}
        // onClick={handleClick}
      />
      </div>
      <div className={styles.space_sm} />
      </form>
      </MainLayout>
  )
} 

export default DailyAdd