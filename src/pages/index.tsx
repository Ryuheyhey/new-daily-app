import MainLayout from "../layout/layout"
import {DailyCard, TextLine, EditIconButton} from "../components/index"
import fetch from "node-fetch"
import { GetServerSideProps, GetStaticProps } from "next"
import { useCallback } from "react"
import Router from "next/router"
import Link from "next/link"

type Props = {
  posts: {
    content_1: string
    content_2: string
    content_3: string
    content_4: string
    created: string
    title: string
    _id: string
  }[]
}

const index = (props: Props) => {

  console.log(props.posts);
  

  return (
    <MainLayout title={"進歩チェックリスト"} link={"/"}>
        
        {props.posts.length > 0 && (
          props.posts.map((post, i) => {
            const id = post._id.toString()

            const allDate = post.created.split('-')
            const year = allDate[0]
            const month = allDate[1]
            const day = allDate[2].slice(0,2)
            const weeekdayStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            const date = new Date (`${year}/${month}/${day}`)
            const weekday = weeekdayStr[date.getDay()]

            return (
            <div key={i} >
            <TextLine text={`${year}/${month}`}/>
            <DailyCard 
              id={post._id}
              day={day}
              weekday={weekday}
              title={post.title}
            />
            
            </div>
            )
          })
        )}
        <EditIconButton/>
    </MainLayout>
  )
}

export default index


// export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch('http://127.0.0.1:3000/index/get')
  // const posts = await res.json()
  // return {
  //   props: {
  //     posts
  //   }
  // }
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://127.0.0.1:3000/api/daily')
  const {data} = await res.json()
  return {
    props: {
      posts: data
    }
  }
}
