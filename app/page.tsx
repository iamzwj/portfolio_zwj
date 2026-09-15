import { BackgroundVideo } from "./background-video";
import { WorkShowcase } from "./work-showcase";

const profileTags = [
  "AI 智能体搭建",
  "Codex 编程",
  "Vibe Coding",
  "AI 视频",
  "7 年视觉设计经验",
] as const;

const currentExperience = [
  {
    title: "AI 视觉内容创作",
    description:
      "熟练使用 Midjourney、即梦、ChatGPT 等生成式 AI 工具，完成品牌海报、产品宣传图、详情页、商业插画及 3D 风格素材的创意设计与生成。",
  },
  {
    title: "AI 内容生产流程搭建",
    description:
      "熟练使用 Codex、Coze 等 AI 开发与自动化工具，搭建 AI 图像、视频内容生成及批量生产流程，结合品牌知识库沉淀提示策略、标准流程及可复用的智能化模板流程。",
  },
  {
    title: "AI 创意与技术落地",
    description:
      "根据品牌调性与业务需求制定 AI 视觉创意方向，持续测试新模型和工具，将适用能力转化为具体内容方案，并通过内部分享推动团队应用与能力提升。",
  },
  {
    title: "设计需求与团队协同",
    description:
      "负责设计组日常需求的接收、评估与任务分配，根据项目优先级、交付周期及成员能力协调设计资源，跟进项目进度与交付质量；对接产品、市场及渠道团队，明确需求目标和交付标准，保障多项目并行推进。",
  },
] as const;

const earlierExperiences = [
  {
    period: "2023.06 — 2025.07",
    company: "独立设计师",
    role: "视觉设计 / AI 学习研究",
    responsibilities: [
      "持续学习和测试生成式 AI 工具，探索其在视觉创作与设计工作流中的实际应用。",
    ],
  },
  {
    period: "2021.12 — 2023.05",
    company: "泰康",
    role: "泰生活高级用户体验设计师",
    responsibilities: [
      "为泰生活健康及齿科业务提供运营设计支持，负责线上与线下视觉设计工作。",
      "主导推广 Figma，搭建团队共享项目与素材库，提升协作效率与设计资产复用率。",
      "协助团队管理，安排实习生及外包同事工作，提供设计指导并把控交付质量。",
      "带头学习研究 AIGC 相关技能，在部门内分享 Midjourney 等生成式 AI 工具的使用方法。",
    ],
  },
  {
    period: "2020.10 — 2021.12",
    company: "新东方",
    role: "大学事业部运营视觉设计",
    responsibilities: [
      "负责课程推广素材模板设计，规划整体视觉风格与创意，并根据数据反馈持续更新迭代。",
      "支持品牌运营及市场活动设计，覆盖 KV、海报、专题、H5、报纸、教材、周边等线上线下物料。",
      "组织全国分中心设计组交流，分享设计经验与方法，优化整体视觉输出质量。",
    ],
  },
  {
    period: "2017.03 — 2020.10",
    company: "联想",
    role: "新媒体运营视觉设计",
    responsibilities: [
      "负责新媒体运营相关视觉设计，为日常内容传播及运营活动提供创意与设计支持。",
      "围绕运营需求完成专题与线上内容的视觉编排，保持品牌表达与传播节奏的一致性。",
    ],
  },
  {
    period: "2014.09 — 2016.09",
    company: "济南军区某海防团宣传股",
    role: "多媒体设计",
    responsibilities: [
      "负责宣传股多媒体设计工作，为宣传教育与文化活动提供图文、平面及多媒体制作支持。",
      "配合宣传任务完成内容整理与视觉呈现，保障日常宣传物料的及时交付。",
    ],
  },
] as const;

export default function Home() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#content">
        跳到主要内容
      </a>
      <BackgroundVideo />
      <div className="scanlines" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="site-nav">
        <a className="brand" href="#top" aria-label="17design.fun 首页">
          <span className="brand-mark">17</span>
          <span>DESIGN.FUN</span>
        </a>
      </header>

      <div id="content">
        <section className="portfolio-hero" id="top">
          <div className="hero-copy">
            <p className="kicker">
              <span>SYS.17 / ONLINE</span>
              <span>SHENZHEN · CN</span>
            </p>
            <h1
              className="glitch-title"
              data-text="MY PORTFOLIO"
              aria-label="My Portfolio"
            >
              MY
              <br />
              <span>PORTFOLIO</span>
            </h1>
            <p className="hero-role">
              <strong>张文杰</strong> / AIGC 设计师 <i aria-hidden="true">×</i>{" "}
              视觉设计师
            </p>
            <p className="hero-intro">
              <span className="hero-intro-greeting">
                你好，这是我的个人作品集网站。
              </span>
              <br />
              我有 7 年视觉设计与 2 年 AIGC 设计经验，擅长 AI
              视觉、智能体搭建和 Vibe Coding，
              <br />
              拥有成熟的 AI 项目落地经验，同时也乐于尝试新的技术与创作方式。
            </p>
            <div className="hero-actions">
              <a className="cyber-button primary" href="#experience">
                查看工作经历
                <span aria-hidden="true">↓</span>
              </a>
              <a
                className="cyber-button secondary"
                href="https://github.com/iamzwj"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <p className="hero-side-note" aria-hidden="true">
            DESIGN / AUTOMATION / DEVELOPMENT
          </p>
        </section>

        <section
          className="portfolio-section experience-section"
          id="experience"
        >
          <div className="section-heading experience-heading">
            <div>
              <p className="section-code">/ 01 — EXPERIENCE</p>
              <h2>
                工作经历
                <span>.</span>
              </h2>
            </div>
            <p>
              以视觉设计为基础，持续拓展 AI 内容创作、智能化工作流与团队协同能力。
            </p>
          </div>

          <div className="profile-tags" aria-label="核心能力标签">
            {profileTags.map((tag, index) => (
              <span key={tag}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {tag}
              </span>
            ))}
          </div>

          <article className="current-experience">
            <header className="experience-header">
              <div>
                <p className="experience-status">
                  <span aria-hidden="true" />
                  当前职位 / CURRENT POSITION
                </p>
                <h3>万物云空间科技服务股份有限公司</h3>
                <p className="experience-role">AIGC 设计师</p>
              </div>
              <time dateTime="2025-07">2025.07 — 至今</time>
            </header>

            <ol className="experience-responsibilities">
              {currentExperience.map((item, index) => (
                <li key={item.title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <details className="earlier-experience">
            <summary>
              <span>
                <b>ARCHIVE / 05</b>
                早期工作经历
              </span>
              <i aria-hidden="true">+</i>
            </summary>
            <div className="experience-timeline">
              {earlierExperiences.map((experience) => (
                <article key={`${experience.period}-${experience.company}`}>
                  <time>{experience.period}</time>
                  <div>
                    <h3>{experience.company}</h3>
                    <p className="timeline-role">{experience.role}</p>
                    <ul className="experience-summary">
                      {experience.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </details>
        </section>

        <WorkShowcase />

        <section className="portfolio-section about-section" id="about">
          <div className="about-index" aria-hidden="true">
            03
          </div>
          <div className="about-copy">
            <p className="section-code">/ 03 — ABOUT</p>
            <h2>
              不是只做一张好看的图，
              <br />
              而是建立一套
              <em>能工作的系统。</em>
            </h2>
          </div>
          <div className="about-detail">
            <p>
              我是阿Jay，Richart J。视觉设计师，也在持续构建 AI
              自动化流程、网站和应用。
            </p>
            <p>
              我关注真实问题、使用体验与长期维护：先找到最短可靠路径，再让技术和视觉共同服务于产品价值。
            </p>
            <div className="principles" aria-label="工作原则">
              <span>01 / CLARITY</span>
              <span>02 / SYSTEM</span>
              <span>03 / CRAFT</span>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-signal" aria-hidden="true">
            <span />
            SIGNAL OPEN
          </div>
          <p className="section-code">/ 04 — CONTACT</p>
          <h2>
            有值得做的事情，
            <br />
            <span>一起把它变成现实。</span>
          </h2>
          <p className="contact-note">
            适合视觉系统、AIGC、AI 自动化、网站与应用相关的合作与交流。
          </p>
          <a
            className="contact-link"
            href="https://github.com/iamzwj"
            target="_blank"
            rel="noreferrer"
          >
            <span>GITHUB / IAMZWJ</span>
            <b aria-hidden="true">↗</b>
          </a>
        </section>
      </div>

      <footer className="site-footer">
        <div>
          <a className="brand" href="#top">
            <span className="brand-mark">17</span>
            <span>DESIGN.FUN</span>
          </a>
          <p>VISUAL DESIGN × INTELLIGENT SYSTEMS</p>
        </div>
        <p>© 2026 RICHART J</p>
        <a href="#top">
          BACK TO TOP <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </main>
  );
}
