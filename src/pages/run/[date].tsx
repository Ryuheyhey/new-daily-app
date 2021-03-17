import MainLayout from "../../layout/layout";
import { DailyCard, TextLine, EditIconButton } from "../../components/index";
import fetch from "node-fetch";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useCallback } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";
import styles from "../../styles/Home.module.css";

type Props = {
  posts: {
    content_1: string;
    content_2: string;
    content_3: string;
    created: string;
    mileage: string;
    _id: string;
  }[];
};

const index = (props: Props) => {
  // ページが存在しない時の処理
  const router = useRouter();
  console.log(router.isFallback);
  console.log("routerDate: " + router.query.date);
  console.log(props);
  const momentDate = moment(router.query.date).add(1, "days").toDate();
  console.log("momentDate: " + momentDate);

  if (router.isFallback) {
    // return (
    //   <MainLayout title={`進歩チェックリスト (${titleDate})`} link={"/"}>
    //     <div>
    //       {titleDate}の投稿は存在しません
    //     </div>
    //     <EditIconButton/>
    //   </MainLayout>
    // )
    return <div>Loading...</div>;
  } else {
    const date: any = router.query.date;
    const titleDate = `${date.substr(0, 4)}/${date.substr(5, 2)}/${date.substr(
      8,
      2
    )}`;
    console.log(titleDate);

    const goToAdd = useCallback(() => {
      Router.push("/run/add");
    }, []);

    const goToDetail = useCallback((id) => {
      Router.push("/run/detail/[id]", `/run/detail/${id}`);
    }, []);

    const goToEdit = useCallback((id) => {
      Router.push("/run/edit/[id]", `/run/edit/${id}`);
    }, []);

    return (
      <MainLayout title={`陸上日誌 (${titleDate})`} link={"/run"}>
        {props.posts.length > 0 ? (
          props.posts.map((post, i) => {
            const id = post._id;

            const allDate = post.created.split("-");
            const year = allDate[0];
            const month = allDate[1];
            const day = allDate[2].slice(0, 2);
            const weeekdayStr = [
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ];
            const date = new Date(`${year}/${month}/${day}`);
            const weekday = weeekdayStr[date.getDay()];

            return (
              <div key={i}>
                <TextLine text={`${year}/${month}`} />
                <DailyCard
                  id={post._id}
                  cardTitle={"走行距離"}
                  day={day}
                  weekday={weekday}
                  title={post.mileage}
                  goToDetail={() => goToDetail(id)}
                  goToEdit={() => goToEdit(id)}
                />
              </div>
            );
          })
        ) : (
          <>
            <div className={styles.space_md} />
            <div className={styles.space_md} />
            <div className={styles.space_md} />
            <div className={styles.center}>{titleDate} の投稿はありません</div>
          </>
        )}
        <EditIconButton onClick={goToAdd} />
      </MainLayout>
    );
  }
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const date = params.date;
  const res = await fetch(`${process.env.BASE_URL}api/run/date/${date}`, {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent": "*",
      Accept: "application/json; charset=UTF-8",
    },
  });
  console.log(`${process.env.BASE_URL}api/run/date/${date}`);

  const { data } = await res.json();
  return {
    props: {
      posts: data,
    },
  };
};
