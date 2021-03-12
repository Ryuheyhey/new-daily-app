import MainLayout from "../../layout/layout"
import {DailyCard, TextLine, EditIconButton} from "../../components/index"
import fetch from "node-fetch"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { useCallback } from "react"
import Router, { useRouter } from "next/router"
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
  
  
  // ページが存在しない時の処理
  const router = useRouter()
  console.log(router.isFallback);
  console.log(router.query.date);
  
  if (router.isFallback) {
    // return (
      //   <MainLayout title={`進歩チェックリスト (${titleDate})`} link={"/"}>
      //     <div>
      //       {titleDate}の投稿は存在しません
      //     </div>
      //     <EditIconButton/>
      //   </MainLayout>
      // )
      return <div>Loading...</div>
    } else {
      
      const date: any = router.query.date
      const titleDate = `${date.substr(0,4)}/${date.substr(5, 2)}/${date.substr(8,2)}`
      console.log(titleDate)
      
      return (
        <MainLayout title={`進歩チェックリスト (${titleDate})`} link={"/"}>
            
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
    

}

export default index

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('http://127.0.0.1:3000/index/get')
//   const posts = await res.json()
//   const paths = posts.map(post => ({
//       params: {
//         date: post.created.slice(0, 10)
//       }
//     }))

//     return {
//       paths,
//       fallback: true,
//     }
// }

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const date = params.date
  const res = await fetch(`${process.env.BASE_URL}daily/get/${date}`)
  const posts = await res.json()
  return {
    props: {
      posts
    }
  }
}