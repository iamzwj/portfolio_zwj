import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://17design.fun"),
  title: "Richart J — AIGC 设计师与 AI 内容构建者",
  description:
    "Richart J（阿Jay）的个人设计主页，关注 AI 视觉内容、AIGC 工作流、AI 自动化与视觉设计。",
  openGraph: {
    title: "Richart J — AIGC 设计师与 AI 内容构建者",
    description:
      "连接视觉、AI 与代码，构建可复用的智能内容生产流程。",
    url: "https://17design.fun",
    siteName: "17DESIGN.FUN",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Richart J — Visual Design × AI Product Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Richart J — AIGC 设计师与 AI 内容构建者",
    description: "AI 视觉内容 × AIGC 工作流 × AI 自动化 × 视觉设计",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
