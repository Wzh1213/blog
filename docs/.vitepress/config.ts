import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

// 主题独有配置
// 详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 文章默认作者
  author: 'wzh0126',
  // 友链
  friend: [
    {
      nickname: '粥里有勺糖',
      des: '你的指尖用于改变世界的力量',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top'
    },
    {
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTI2NzY1Ng==674995267656',
      url: 'https://vitepress.vuejs.org/'
    }
  ],
  recommend: {
    showSelf: true
  },
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  search: 'pagefind',
  // popover: {
  //   title: '公告',
  //   body: [
  //     {
  //       type: 'text',
  //       content: 'QQ交流群：681489336 🎉🎉'
  //     },
  //     { type: 'text', content: '👇公众号👇---👇 微信 👇' },
  //     {
  //       type: 'image',
  //       src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210'
  //     },
  //     {
  //       type: 'text',
  //       content: '欢迎大家加群&私信交流'
  //     },
  //     {
  //       type: 'button',
  //       content: '博客',
  //       link: 'https://sugarat.top'
  //     }
  //   ],
  //   duration: 0
  // }
})

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: blogTheme,
  lang: 'zh-cn',
  title: `wzh's blog`,
  description: 'Steven的博客主题,基于 vitepress 实现',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    footer: {
      message: '感谢<a target="_blank" href="https://theme.sugarat.top/"> @sugarat/theme </a> 的主题支持',
      copyright:
        'MIT Licensed | 基于<a target="_blank" href="https://vitepress.dev/">VitePress</a>的技术支持'
    },
    logo: 'https://img.ycitcl.top/header.jpg',

    nav: [
      { text: '关于我', link: '/about' },
      {
        text: '备战春秋',
        items: [
          { text: '面试', link: '/' },
          { text: '八股文', link: '/' },
        ]
      },
      {
        text: '算法&数据结构',
        items: [ 
          { text: 'C/C++', link: '/' },
          { text: 'JavaScript', link: '/' },
        ]
      },
      {
        text: '收藏内容',
        items: [
          { text: '开发类', link: '/collection/code/index' },
          { text: '学习类', link: '/collection/study/index' },
          { text: '娱乐类', link: '/collection/relax/index' },
        ]
      },
      {
        text: '笔记',
        items: [
          { text: 'Vue3', link: '/notebook/vue3' },
          { text: 'NodeJS', link: '/notebook/node' },
          { text: 'Pinia', link: '/notebook/pinia' },
          { text: 'CSS', link: '/notebook/css' },
          { text: 'JavaScript', link: '/notebook/js' },
          { text: '项目介绍', link: '/notebook/introduce' },
        ]
      },
      {
        text: '上线作品',
        items: [
          { text: 'WuTerminal', link: 'http://120.53.87.248:5173/' },
          { text: '敬请期待', link: '/' },
          { text: '敬请期待', link: '/' }
        ]
      },
      { text: '测试版本', link: 'https://blog.ycitcl.top/' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Wzh1213?tab=repositories'
      }
    ]
  }
})
