import {Header} from "../components/index"

// type LayoutProps = {
//   children: React.ReactNode
// }



const MainLayout = (props):JSX.Element => {

  return (
    <div>
      <Header title={props.title} link={props.link}/>
      <main>{props.children}</main>
    </div>
  )
}

export default MainLayout