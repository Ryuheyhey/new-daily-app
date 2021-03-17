import MainLayout from "../../layout/layout";
import { DailyCard, TextLine, EditIconButton } from "../../components/index";
import fetch from "node-fetch";
import { GetServerSideProps, GetStaticProps } from "next";
import { useCallback } from "react";
import Router from "next/router";
import Link from "next/link";

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
    <MainLayout title={"陸上競技日誌"} link={"/run"}>
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
        })}
      <EditIconButton onClick={goToAdd} />
    </MainLayout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}api/run`, {
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
