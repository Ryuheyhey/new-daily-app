import {
  DetailCard,
  TextLine,
  PrimaryButton,
  GreyButton,
} from "../../../components/index";
import MainLayout from "../../../layout/layout";
import styles from "../../../styles/Home.module.css";
import Router from "next/router";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import fetch from "node-fetch";
import { useCallback } from "react";

type Post = {
  post: {
    content_1: string;
    content_2: string;
    content_3: string;
    created: string;
    mileage: string;
    _id: string;
  };
};

const RunDetail = ({ post }: Post) => {
  console.log({ post });

  const goToEdit = () => {
    Router.push("/run/edit/[id]", `/run/edit/${post._id}`);
  };

  const goToHome = useCallback(() => {
    Router.push({
      pathname: "/run",
    });
  }, []);

  return (
    <MainLayout title={"陸上競技日誌"} link={"/run"}>
      <div className={styles.space_sm} />
      <TextLine text={"今日の走行距離(km)"} />
      <DetailCard content={post.mileage} />
      <div className={styles.space_sm} />
      <TextLine text={"今日の反省・感覚など"} />
      <DetailCard content={post.content_1} />
      <div className={styles.space_sm} />
      <TextLine text={"その原因(なるべく深掘り)"} />
      <DetailCard content={post.content_2} />
      <div className={styles.space_sm} />
      <TextLine text={"それを踏まえて今後どうする？"} />
      <DetailCard content={post.content_3} />
      <div className={styles.space_sm} />
      <div className={styles.space_md} />
      <div className={styles.center}>
        <PrimaryButton label={"編集する"} onClick={goToEdit} />
      </div>
      <div className={styles.center}>
        <GreyButton label={"ホームに戻る"} onClick={goToHome} />
      </div>
      <div className={styles.space_sm} />
    </MainLayout>
  );
};

export default RunDetail;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  const res = await fetch(`${process.env.BASE_URL}api/run/${id}`, {
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
      post: data,
    },
  };
};
