const base = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image'

export function img(prompt: string, size = 'landscape_16_9'): string {
  return `${base}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`
}

export interface GalleryImage {
  src: string
  caption: string
}

export const galleryImages: GalleryImage[] = [
  { src: img('Silhouette of a basketball player dunking against a dramatic orange sky', 'square'), caption: '篮球 · 每一次起跳' },
  { src: img('Close up of headphones on a desk with soft cyan neon light', 'square'), caption: '音乐 · 声音里的专注' },
  { src: img('A row of dumbbells in a gym with dark moody lighting', 'square'), caption: '健身 · 与自己的较量' },
  { src: img('A close up of a code editor on a screen with colorful syntax highlighting', 'square'), caption: '代码 · 另一种语言' },
  { src: img('A basketball hoop under warm stadium lights at night', 'square'), caption: '球场 · 十英尺的目标' },
  { src: img('A guitar and a notebook on a cozy desk with warm light', 'square'), caption: '灵感 · 日常记录' },
]
