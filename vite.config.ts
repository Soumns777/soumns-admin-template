import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import path from 'path';
const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: 'public',
  build: {
    target: 'modules',
    outDir: 'dist/www', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    sourcemap: false, // 构建后是否生成 source map 文件
    rollupOptions: {
      output: {
        // 切割过大的包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [
    vue({
      reactivityTransform: true, // 可以支持 $ref 语法糖
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        // 在这个可以增加预设规则, 也可以使用正则表达式
        [
          'soumns-center', // 使用时只需要写 p-c 即可应用该组样式
          {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          },
        ],
        [
          'soumns-dfl',
          {
            'background-color': '#80D1c8',
          },
        ],
        [
          'soumns-kly',
          {
            color: '#002EA6',
          },
        ],
        [
          'soumns-flex',
          {
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
          },
        ],
        [
          'soumns-bg',
          {
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%',
          },
        ],
      ],
      shortcuts: [
        {
          'soumns-btn':
            'py-2 px-4 font-semibold rounded-lg shadow-md  border-none  cursor-pointer text-center',
        },
        // 动态颜色
        [
          /^soumns-btn-(.*)$/,
          ([, c]) =>
            `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg shadow-md  border-none  cursor-pointer text-center`,
        ],
      ],
    }),
    VueSetupExtend(),
  ],
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/sass/index.scss";`, // 这里结尾需要添加一个 ;
      },
    },
  },
  server: {
    host: '0.0.0.0',
    open: true, // 是否自动在浏览器打开
    // 反向代理解决跨域
    proxy: {
      '/api': {
        target: 'http://v.juhe.cn',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
