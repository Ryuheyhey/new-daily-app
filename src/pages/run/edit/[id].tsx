import MainLayout from "../../../layout/layout";
import {
  TextLine,
  DailyText,
  PrimaryButton,
  GreyButton,
} from "../../../components/index";
import styles from "../../../styles/Home.module.css";
import Router from "next/router";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import fetch from "node-fetch";
import { useState, useCallback } from "react";

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

const DailyEdit = ({ post }: Post) => {
  const [mileage, setMileage] = useState<string>(post.mileage);
  const [content_1, setContent1] = useState<string>(post.content_1);
  const [content_2, setContent2] = useState<string>(post.content_2);
  const [content_3, setContent3] = useState<string>(post.content_3);

  const handleMileage = useCallback((e) => {
    setMileage(e.target.value);
  }, []);

  const handleContent1 = useCallback((e) => {
    setContent1(e.target.value);
  }, []);

  const handleContent2 = useCallback((e) => {
    setContent2(e.target.value);
  }, []);

  const handleContent3 = useCallback((e) => {
    setContent3(e.target.value);
  }, []);

  const handleDelete = useCallback((id) => {
    fetch(`/api/run/${id}`, {
      method: "DELETE",
    }).then(() => {
      Router.push({
        pathname: "/run",
      });
    });
  }, []);

  const handleSubmit = (e) => {
    fetch(`/api/run/${post._id}/`, {
      method: "PUT",
      body: JSON.stringify({
        mileage: mileage,
        content_1: content_1,
        content_2: content_2,
        content_3: content_3,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }).then(() => {
      Router.push("/run");
    });
    e.preventDefault();
  };

  return (
    <MainLayout title={"陸上競技日誌"} link={"/run"}>
      <div className={styles.space_sm} />
      <form onSubmit={handleSubmit}>
        <TextLine text={"今日の出来事"} />
        <div style={{ padding: "1rem 1rem 0 1rem" }}>
          <DailyText
            label={"今日の走行距離(km)"}
            multiline={true}
            rows={4}
            fullWidth={true}
            defaultValue={post.mileage}
            onChange={handleMileage}
            value={mileage}
          />
        </div>
        <div style={{ padding: "1rem 1rem 0 1rem" }}>
          <DailyText
            label={"今日の反省・感覚など"}
            multiline={true}
            rows={4}
            fullWidth={true}
            defaultValue={post.content_1}
            onChange={handleContent1}
            value={content_1}
          />
        </div>
        <div style={{ padding: "1rem 1rem 0 1rem" }}>
          <DailyText
            label={"その原因(なるべく深掘り)"}
            multiline={true}
            rows={4}
            fullWidth={true}
            defaultValue={post.content_2}
            onChange={handleContent2}
            value={content_2}
          />
        </div>
        <div style={{ padding: "1rem 1rem 0 1rem" }}>
          <DailyText
            label={"それを踏まえて今後どうする？"}
            multiline={true}
            rows={4}
            fullWidth={true}
            defaultValue={post.content_3}
            onChange={handleContent3}
            value={content_3}
          />
        </div>
        <div className={styles.space_md} />
        <div className={styles.center}>
          <PrimaryButton label={"更新する"} />
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
  );
};

export default DailyEdit;

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
