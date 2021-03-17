import MainLayout from "../../layout/layout";
import { TextLine, DailyText, PrimaryButton } from "../../components/index";
import styles from "../../styles/Home.module.css";
import Router from "next/router";
import { useCallback, useState } from "react";

const RunDailyAdd = () => {
  const [mileage, setMileage] = useState<string>("");
  const [content_1, setContent1] = useState<string>("");
  const [content_2, setContent2] = useState<string>("");
  const [content_3, setContent3] = useState<string>("");
  const [content_4, setContent4] = useState<string>("");

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

  const handleContent4 = useCallback((e) => {
    setContent4(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    // httpsメソッドを叩く
    fetch("/api/run", {
      method: "POST",
      body: JSON.stringify({
        mileage: mileage,
        content_1: content_1,
        content_2: content_2,
        content_3: content_3,
        content_4: content_4,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "*",
      },
    });
    Router.push("/run");
    e.preventDefault();
  };

  return (
    <MainLayout title={"陸上競技日誌"} link={"/run"}>
      <div className={styles.space_sm} />
      <TextLine text={"今日の出来事"} />
      <form onSubmit={handleSubmit}>
        <div style={{ padding: "1rem 1rem 0 1rem" }}>
          <DailyText
            label={"今日の走行距離(km)"}
            multiline={true}
            rows={2}
            fullWidth={false}
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
            onChange={handleContent3}
            value={content_3}
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
  );
};

export default RunDailyAdd;
