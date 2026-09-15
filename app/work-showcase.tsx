"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type WorkType = "coding" | "visual";
type VisualType = "poster" | "detail" | "print";
type AccentTone = "green" | "magenta" | "cyan";

type ShowcaseProject = {
  id: string;
  index: string;
  category: string;
  title: string;
  tone: AccentTone;
  techTags: readonly string[];
  coverSrc?: string;
  detailSrc?: string;
  description?: string;
};

const codingProjects: readonly ShowcaseProject[] = [
  {
    id: "coding-01",
    index: "01",
    category: "AI AGENT / CODING",
    title: "天气日签智能体",
    tone: "green",
    techTags: ["Coze 工作流", "Coze 智能体", "飞书定时"],
    coverSrc: "/weather-sign-agent-cover.png",
    detailSrc: "/weather-sign-agent-detail.png",
    description: "让天气信息自动生成、自动排版、自动发送。",
  },
  {
    id: "coding-02",
    index: "02",
    category: "CODING PROJECT",
    title: "项目案例待补充",
    tone: "cyan",
    techTags: ["技术待补充"],
  },
  {
    id: "coding-03",
    index: "03",
    category: "CODING PROJECT",
    title: "项目案例待补充",
    tone: "magenta",
    techTags: ["技术待补充"],
  },
];

const visualProjects: Record<VisualType, readonly ShowcaseProject[]> = {
  poster: [
    {
      id: "poster-01",
      index: "01",
      category: "POSTER DESIGN",
      title: "海报设计待补充",
      tone: "green",
      techTags: ["技术待补充"],
    },
    {
      id: "poster-02",
      index: "02",
      category: "POSTER DESIGN",
      title: "海报设计待补充",
      tone: "magenta",
      techTags: ["技术待补充"],
    },
    {
      id: "poster-03",
      index: "03",
      category: "POSTER DESIGN",
      title: "海报设计待补充",
      tone: "cyan",
      techTags: ["技术待补充"],
    },
  ],
  detail: [
    {
      id: "detail-01",
      index: "01",
      category: "DETAIL PAGE DESIGN",
      title: "详情页设计待补充",
      tone: "cyan",
      techTags: ["技术待补充"],
    },
    {
      id: "detail-02",
      index: "02",
      category: "DETAIL PAGE DESIGN",
      title: "详情页设计待补充",
      tone: "green",
      techTags: ["技术待补充"],
    },
    {
      id: "detail-03",
      index: "03",
      category: "DETAIL PAGE DESIGN",
      title: "详情页设计待补充",
      tone: "magenta",
      techTags: ["技术待补充"],
    },
  ],
  print: [
    {
      id: "print-01",
      index: "01",
      category: "PRINT DESIGN",
      title: "印刷物设计待补充",
      tone: "magenta",
      techTags: ["技术待补充"],
    },
    {
      id: "print-02",
      index: "02",
      category: "PRINT DESIGN",
      title: "印刷物设计待补充",
      tone: "cyan",
      techTags: ["技术待补充"],
    },
    {
      id: "print-03",
      index: "03",
      category: "PRINT DESIGN",
      title: "印刷物设计待补充",
      tone: "green",
      techTags: ["技术待补充"],
    },
  ],
};

const visualTabs: ReadonlyArray<{ id: VisualType; label: string }> = [
  { id: "poster", label: "海报设计" },
  { id: "detail", label: "详情页设计" },
  { id: "print", label: "印刷物设计" },
];

export function WorkShowcase() {
  const [activeType, setActiveType] = useState<WorkType>("coding");
  const [activeVisualType, setActiveVisualType] =
    useState<VisualType>("poster");
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(
    null,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [selectedProject]);

  const projects =
    activeType === "coding" ? codingProjects : visualProjects[activeVisualType];

  return (
    <section className="portfolio-section showcase-section" id="work">
      <div className="section-heading showcase-heading">
        <div>
          <p className="section-code">/ 02 — SELECTED WORK</p>
          <h2>
            作品展示
            <span>.</span>
          </h2>
        </div>
        <p>从代码构建到视觉表达，项目内容将持续在这里更新。</p>
      </div>

      <div className="showcase-switch" aria-label="作品类别">
        <button
          type="button"
          className={activeType === "coding" ? "is-active" : undefined}
          aria-pressed={activeType === "coding"}
          onClick={() => setActiveType("coding")}
        >
          <span>01</span>
          Coding 作品
        </button>
        <button
          type="button"
          className={activeType === "visual" ? "is-active" : undefined}
          aria-pressed={activeType === "visual"}
          onClick={() => setActiveType("visual")}
        >
          <span>02</span>
          视觉作品
        </button>
      </div>

      {activeType === "visual" ? (
        <div className="visual-work-tabs" aria-label="视觉作品分类">
          {visualTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeVisualType === tab.id ? "is-active" : undefined}
              aria-pressed={activeVisualType === tab.id}
              onClick={() => setActiveVisualType(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="project-grid work-showcase-grid">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`project-card project-${project.tone} showcase-card`}
            onClick={() => setSelectedProject(project)}
          >
            <span className="project-visual" aria-hidden="true">
              {project.coverSrc ? (
                <img
                  className="showcase-project-image"
                  src={project.coverSrc}
                  alt=""
                />
              ) : (
                <>
                  <span className="project-signal">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="project-number">{project.index}</span>
                </>
              )}
              <span className="visual-label">
                {project.coverSrc ? "PROJECT COVER" : "THUMBNAIL SLOT"}
              </span>
            </span>
              <span className="project-content">
                <span className="project-category">{project.category}</span>
                <strong>{project.title}</strong>
                <span className="project-tech-tags">
                  {project.techTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
                <small>点击查看作品详情 ↗</small>
            </span>
          </button>
        ))}
      </div>

      {selectedProject && isMounted
        ? createPortal(
            <div
              className="showcase-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="showcase-modal-title"
            >
              <div className="showcase-modal-panel">
                <button
                  type="button"
                  className="showcase-modal-close"
                  aria-label="关闭作品详情"
                  onClick={() => setSelectedProject(null)}
                >
                  ×
                </button>
                <p className="section-code">{selectedProject.category}</p>
                <h3 id="showcase-modal-title">{selectedProject.title}</h3>
                {selectedProject.detailSrc ? (
                  <img
                    className="showcase-modal-image"
                    src={selectedProject.detailSrc}
                    alt={`${selectedProject.title}项目详情预览`}
                  />
                ) : (
                  <div className="showcase-modal-artwork" aria-hidden="true">
                    <span>{selectedProject.index}</span>
                    <b>WORK DETAIL / PENDING</b>
                  </div>
                )}
                <p className="showcase-modal-note">
                  {selectedProject.description ??
                    "此处将用于展示完整项目背景、设计过程、作品图片与成果说明。"}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
