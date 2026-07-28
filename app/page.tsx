"use client";

import { useEffect, useMemo, useState } from "react";

type Exercise = {
  name: string;
  sets: string;
  weight: string;
  cues: string[];
};

type Workout = {
  id: string;
  day: string;
  focus: string;
  note: string;
  exercises: Exercise[];
};

const workouts: Workout[] = [
  {
    id: "a",
    day: "DAY 01 · PUSH + CORE",
    focus: "胸 / 肩 / 背 / 核心",
    note: "先做推，再做划船；肩部始终无痛。",
    exercises: [
      { name: "哑铃地板卧推", sets: "3 × 8–12", weight: "4kg 起；能稳做 12 次再加 0.5–1kg", cues: ["躺稳，脚踩地", "手肘约 45°", "下放慢 2 秒"] },
      { name: "单臂哑铃划船", sets: "3 × 10–12 / 侧", weight: "4kg 起；动作稳后逐步加重", cues: ["一手扶稳椅面", "背保持平", "肘向髋部拉"] },
      { name: "坐姿中立握肩推", sets: "3 × 8–10", weight: "4kg；手臂钢板周围不适则跳过", cues: ["坐稳不借腰", "掌心相对", "不锁死手肘"] },
      { name: "侧平举", sets: "3 × 12–20", weight: "3.5kg；不要急着加重", cues: ["手肘微弯", "抬到肩高", "不耸肩、不甩动"] },
      { name: "死虫式", sets: "3 × 8–10 / 侧", weight: "徒手", cues: ["腰背贴地", "慢慢伸腿", "呼气收紧腹部"] },
    ],
  },
  {
    id: "b",
    day: "DAY 02 · LOWER A",
    focus: "臀 / 腿后侧 / 髋稳定",
    note: "髋部只走舒适范围；不追求深度。",
    exercises: [
      { name: "哑铃罗马尼亚硬拉", sets: "3 × 8–12", weight: "从 6–8kg 起；4kg 轻松则加重", cues: ["臀向后推", "背中立", "哑铃贴近腿"] },
      { name: "箱式高脚杯深蹲", sets: "3 × 8–10", weight: "4–8kg，从舒适深度开始", cues: ["坐向稳定椅面", "膝盖跟脚尖同向", "碰椅即起，不塌腰"] },
      { name: "哑铃臀桥", sets: "3 × 10–15", weight: "4–8kg，放在髋前", cues: ["脚踩稳", "顶端夹臀 1 秒", "不靠腰顶"] },
      { name: "扶椅分腿蹲", sets: "3 × 8 / 侧", weight: "徒手或 3.5–4kg", cues: ["扶稳椅背", "小步距开始", "髋前侧夹痛就停止"] },
      { name: "侧卧髋外展", sets: "3 × 12–15 / 侧", weight: "徒手", cues: ["脚尖朝前", "幅度不必大", "感受臀部外侧"] },
    ],
  },
  {
    id: "c",
    day: "DAY 03 · PULL + ARMS",
    focus: "背 / 后肩 / 手臂 / 核心",
    note: "避免借腰和耸肩；任何麻木都停止。",
    exercises: [
      { name: "胸部支撑哑铃划船", sets: "3 × 8–12", weight: "4kg 起；可逐步加重", cues: ["胸靠椅背", "肩胛向后下", "不甩身体"] },
      { name: "中立握地板卧推", sets: "3 × 8–12", weight: "4kg 起；稳定后加重", cues: ["掌心相对", "手腕保持直", "下放可控"] },
      { name: "俯身反向飞鸟", sets: "3 × 12–15", weight: "3.5kg 如吃力可减重", cues: ["轻微屈髋", "手臂像展开翅膀", "不耸肩"] },
      { name: "锤式弯举", sets: "3 × 10–12", weight: "4kg；关节不适则减重", cues: ["手心相对", "肘固定身体旁", "不摆动"] },
      { name: "侧桥", sets: "3 × 20–30 秒 / 侧", weight: "徒手", cues: ["身体成直线", "从短时间开始", "髋不下沉"] },
    ],
  },
  {
    id: "d",
    day: "DAY 04 · LOWER B",
    focus: "腿 / 臀 / 全身控制",
    note: "强度够即可，动作始终可控。",
    exercises: [
      { name: "哑铃相扑硬拉", sets: "3 × 8–12", weight: "从 6–8kg 起；按动作逐步加", cues: ["站距略宽", "脚尖微外", "站起时夹臀"] },
      { name: "低台阶登阶", sets: "3 × 8–10 / 侧", weight: "徒手或 3.5–4kg", cues: ["选低且稳的台阶", "整只脚踩实", "慢慢下台"] },
      { name: "单腿臀桥", sets: "3 × 8–10 / 侧", weight: "徒手；难度已足够", cues: ["先双腿热身", "骨盆不歪", "有髋痛改双腿"] },
      { name: "高脚杯箱式深蹲", sets: "3 × 10–12", weight: "4–8kg", cues: ["控制下坐", "臀腿发力起身", "不追求更深"] },
      { name: "单臂哑铃划船", sets: "3 × 10–12 / 侧", weight: "4kg 起，稳后加重", cues: ["扶稳", "背平", "拉向髋部"] },
    ],
  },
];

const key = "lift-log-v1";

export default function Home() {
  const [view, setView] = useState<"home" | "training">("home");
  const [active, setActive] = useState("a");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [week, setWeek] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved) as { done: Record<string, boolean>; week: Record<string, boolean> };
      setDone(parsed.done ?? {});
      setWeek(parsed.week ?? {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ done, week }));
  }, [done, week]);

  const workout = useMemo(() => workouts.find((item) => item.id === active)!, [active]);
  const completed = workout.exercises.filter((_, index) => done[`${active}-${index}`]).length;
  const percentage = Math.round((completed / workout.exercises.length) * 100);

  const finishWorkout = () => setWeek((previous) => ({ ...previous, [active]: true }));
  const resetToday = () => {
    setDone((previous) => Object.fromEntries(Object.entries(previous).filter(([item]) => !item.startsWith(`${active}-`))));
    setWeek((previous) => ({ ...previous, [active]: false }));
  };

  if (view === "home") {
    return (
      <main className="home-shell">
        <div className="scanlines" aria-hidden="true" />
        <header className="home-nav">
          <a className="brand" href="/" aria-label="17design.fun 首页">17<span>DESIGN</span>.FUN</a>
          <button className="nav-action" onClick={() => setView("training")}>打开工具 →</button>
        </header>

        <section className="home-hero">
          <p className="eyebrow">// JAY'S PERSONAL TOOLBOX</p>
          <h1>把生活<br /><em>做成系统。</em></h1>
          <p>一个为阿Jay持续生长的个人工具站。把真正会用到的小功能，整理成简单、稳定的入口。</p>
        </section>

        <section className="tool-grid" aria-label="功能入口">
          <button className="tool-card active-tool" onClick={() => setView("training")}>
            <span className="tool-index">01 / ACTIVE</span>
            <strong>LIFT.LOG</strong>
            <b>力量训练打卡</b>
            <p>四日哑铃计划、动作提示与每周进度，一次打开直接训练。</p>
            <i>进入训练 →</i>
          </button>
          <article className="tool-card coming-tool">
            <span className="tool-index">02 / NEXT</span>
            <strong>MORE TOOLS</strong>
            <b>新的功能放这里</b>
            <p>以后每个小功能独立成模块，不影响已有工具的速度和结构。</p>
            <i>COMING SOON</i>
          </article>
        </section>

        <footer className="home-footer">17DESIGN.FUN / PERSONAL SYSTEMS</footer>
      </main>
    );
  }

  return (
    <main className="terminal-shell">
      <div className="scanlines" aria-hidden="true" />
      <header className="topbar">
        <button className="back-home" onClick={() => setView("home")}>← 主页</button>
        <p className="prompt">JAY@TRAINING:~$ <span>OPEN LIFT.LOG</span><b>█</b></p>
        <p className="status">SYSTEM: READY · 4-DAY STRENGTH</p>
      </header>

      <section className="hero">
        <p className="eyebrow">// 83KG · DUMBBELL PROTOCOL · V1.0</p>
        <h1>稳定变强<br /><em>不是硬扛。</em></h1>
        <p className="intro">每组留 2–3 次余力。锐痛、卡住、麻木立即停止；第二天疼痛没回到平时水平，下次减重或减一组。</p>
      </section>

      <section className="week-panel" aria-label="每周训练进度">
        <div className="panel-title"><span>+ WEEKLY STATUS</span><span>{Object.values(week).filter(Boolean).length}/4 DONE</span></div>
        <div className="week-grid">
          {workouts.map((item, index) => (
            <button className={`day-button ${active === item.id ? "selected" : ""} ${week[item.id] ? "finished" : ""}`} key={item.id} onClick={() => setActive(item.id)}>
              <small>0{index + 1}</small><strong>{item.focus}</strong><i>{week[item.id] ? "[ OK ]" : "[ -- ]"}</i>
            </button>
          ))}
        </div>
      </section>

      <section className="workout-panel">
        <div className="workout-heading">
          <div><p className="eyebrow">{workout.day}</p><h2>{workout.focus}</h2></div>
          <div className="progress"><strong>{percentage}%</strong><span>[{'|'.repeat(Math.round(percentage / 10))}{'.'.repeat(10 - Math.round(percentage / 10))}]</span></div>
        </div>
        <p className="workout-note">! {workout.note}</p>

        <div className="exercise-list">
          {workout.exercises.map((exercise, index) => {
            const id = `${active}-${index}`;
            return <label className={`exercise ${done[id] ? "checked" : ""}`} key={id}>
              <input type="checkbox" checked={Boolean(done[id])} onChange={() => setDone((previous) => ({ ...previous, [id]: !previous[id] }))} />
              <span className="checkmark">{done[id] ? "×" : " "}</span>
              <span className="exercise-content">
                <span className="exercise-top"><b>{String(index + 1).padStart(2, "0")}. {exercise.name}</b><strong>{exercise.sets}</strong></span>
                <span className="weight">WEIGHT → {exercise.weight}</span>
                <span className="cues">{exercise.cues.map((cue) => <i key={cue}>/ {cue}</i>)}</span>
              </span>
            </label>;
          })}
        </div>

        <div className="actions">
          <button className="primary-action" onClick={finishWorkout}>[ 完成今日训练 ]</button>
          <button className="secondary-action" onClick={resetToday}>RESET</button>
        </div>
      </section>

      <section className="rules-panel">
        <p>LOAD RULE: 每组达到最高次数、姿势稳定、仍有 2 次余力 → 下次加 0.5–1kg。</p>
        <p>REST: 大动作 2–3 分钟；小动作 60–90 秒。前两周若刚开始训练，每个动作可先做 2 组。</p>
      </section>
    </main>
  );
}
