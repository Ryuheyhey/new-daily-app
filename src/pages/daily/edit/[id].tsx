import MainLayout from "../../../layout/layout"
import {TextLine, DailyText, PrimaryButton, GreyButton} from "../../../components/index"
import styles from "../../../styles/Home.module.css"
import Router from "next/router"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import fetch from "node-fetch"
import {useState, useCallback} from "react"

type Post = {
  post:{
    content_1: string
    content_2: string
    content_3: string
    content_4: string
    created: string
    title: string
    _id: string
  }
}

const DailyEdit = ({post}: Post) => {
  const [title, setTitle] = useState<string>(post.title)
  const [content_1, setContent1] = useState<string>(post.content_1)
  const [content_2, setContent2] = useState<string>(post.content_2)
  const [content_3, setContent3] = useState<string>(post.content_3)
  const [content_4, setContent4] = useState<string>(post.content_4)

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
  console.log(content_3);
  console.log(content_4);

  const handleDelete = useCallback((id) => {
    fetch(`/api/daily/${id}`, {
      method: 'DELETE'
    }).then(() => {
      Router.push({
        pathname: '/',
      });
    })
  },[])
  

  const handleSubmit = (e) => {
    fetch(
      `/api/daily/${post._id}/`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        content_1: content_1,
        content_2: content_2,
        content_3: content_3,
        content_4: content_4,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }
    ).then(() => {
      Router.push("/");
    })
    e.preventDefault();
  }

  return (
    <MainLayout title={"進歩チェックリスト"} link={"/"}>
      <div className={styles.space_sm} />
      <form onSubmit={handleSubmit}>
      <TextLine text={"今日の出来事"}/>
      <div style={{padding: "1rem 1rem 0 1rem"}}>
      <DailyText 
        label={"今日進歩したことは？"}
        multiline={true}
        rows={4}
        fullWidth={true}
        defaultValue={post.title}
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
        defaultValue={post.content_1}
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
        defaultValue={post.content_2}
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
        defaultValue={post.content_3}
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
        defaultValue={post.content_4}
        onChange={handleContent4}
        value={content_4}
      />
      </div>
      <div className={styles.space_md} />
      <div className={styles.center}>
      <PrimaryButton 
        label={"更新する"}
      />
      </div>
      <div className={styles.center}>
      <GreyButton
        label={"投稿を消去する"}
        onClick={() => handleDelete(post._id)}
      />
      </div>
      </form>
      <div className={styles.space_sm} />
      </MainLayout>
  )
} 

export default DailyEdit

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('http://127.0.0.1:3000/index/get')
//   const posts = await res.json()

//   const paths = posts.map(post => ({
//     params: {
//       id: post._id
//     }
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({params}) => {
//   const id = params.id
//   const res = await fetch(`http://127.0.0.1:3000/detail/get/${id}`)
//   const post = await res.json()

//   return {
//     props: {
//       post
//     }
//   }
// }

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const id = query.id
  const res = await fetch(`${process.env.BASE_URL}api/daily/${id}`)
  const {data} = await res.json()

  return {
    props:{
      post: data
    }
  }
  
}