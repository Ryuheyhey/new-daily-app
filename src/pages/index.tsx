import MainLayout from "../layout/layout";
import { DailyCard, TextLine, EditIconButton } from "../components/index";
import fetch from "node-fetch";
import { GetServerSideProps, GetStaticProps } from "next";
import { useCallback } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core";

type Props = {
  posts: {
    content_1: string;
    content_2: string;
    content_3: string;
    content_4: string;
    created: string;
    title: string;
    _id: string;
  }[];
};

const useStyles = makeStyles({
  card: {
    borderRadius: "20px",
    margin: "1rem auto",
    width: "90%",
    maxWidth: 750
  }
})

const index = (props: Props) => {

  const classes = useStyles()

  console.log(process.env.BASE_URL);
  const goToAdd = useCallback(() => {
    Router.push("/daily/add");
  }, []);

  const goToDetail = useCallback((id) => {
    Router.push("/daily/detail/[id]", `/daily/detail/${id}`);
  }, []);

  const goToEdit = useCallback((id) => {
    Router.push("/daily/edit/[id]", `/daily/edit/${id}`);
  }, []);

  return (
    <MainLayout title={"進歩チェックリスト"} link={"/"}>
      {props.posts.length > 0 &&
        props.posts.map((post, i) => {
          const id = post._id.toString();

          const allDate = post.created.split("-");
          const year = allDate[0];
          const month = allDate[1];
          const day = allDate[2].slice(0, 2);
          const weeekdayStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const date = new Date(`${year}/${month}/${day}`);
          const weekday = weeekdayStr[date.getDay()];

          return (
            <div key={i} className={classes.card}>
              <TextLine text={`${year}/${month}`} />
              <DailyCard
                id={post._id}
                cardTitle={"進歩したこと"}
                day={day}
                weekday={weekday}
                title={post.title}
                goToDetail={() => goToDetail(id)}
                goToEdit={() => goToEdit(id)}
              />
            </div>
          );
        })}
      <EditIconButton onClick={goToAdd} />
    </MainLayout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}api/daily`, {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent": "*",
      Accept: "application/json; charset=UTF-8",
    },
  });
  const { data } = await res.json();
  return {
    props: {
      posts: data,
    },
  };
};
