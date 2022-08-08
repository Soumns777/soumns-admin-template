import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  theme: {
    backgroundImage: {
      'hero-man': "url('/src/assets/uploads/bg.png",
    },
  },
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
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
});
