---
title: "从零搭建一个部署到 GitHub Pages 的 React 博客"
date: "2026-10-03"
excerpt: "不用静态站点生成器，用 React + Vite 亲手搭一个博客，并一键部署到 GitHub Pages。"
category: "tech"
tags: ["React", "Vite", "部署"]
cover: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=A%20close%20up%20of%20a%20code%20editor%20on%20a%20screen%20with%20colorful%20syntax%20highlighting&image_size=square"
---

## 为什么不用现成的生成器

Hexo、Hugo、VitePress 都很成熟，但对一个想学好前端的学生来说，**亲手搭一遍**能学到的东西多得多：路由、内容解析、构建产物、静态部署，每个环节都清清楚楚。

## 核心思路

### 1. 用 import.meta.glob 打包文章

Vite 提供了 `import.meta.glob`，可以在**构建期**把 Markdown 文件直接打进产物：

```ts
const files = import.meta.glob('../posts/**/*.md', { as: 'raw', eager: true })
```

这样部署出来的就是纯静态文件，无需运行时请求。

### 2. 解析 frontmatter

每篇文章开头是 YAML 元信息：

```yaml
---
title: "标题"
date: "2026-10-03"
category: "tech"
tags: ["React"]
---
```

用 `js-yaml` 解析，再交给 `react-markdown` 渲染正文。

### 3. 相对路径 + Hash 路由

`vite.config.ts` 里设置 `base: './'`，配合 HashRouter，仓库名任意、部署在根目录或子目录都能正常加载。

```ts
export default defineConfig({
  base: './',
  plugins: [react()],
})
```

## 部署到 GitHub Pages

一个 GitHub Actions 工作流就够了：

1. `push` 到 `main` 分支；
2. 安装依赖、执行 `npm run build`；
3. 把 `dist` 目录上传并发布。

整个过程零服务器成本，真正的「push 即上线」。
