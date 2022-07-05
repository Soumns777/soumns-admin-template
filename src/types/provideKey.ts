import type { InjectionKey, Ref } from 'vue';

export interface IBgcolor {
  bgColor: Ref;
  setBgColor: Function;
}

const bgColorKey = Symbol('bgColorKey') as InjectionKey<IBgcolor>;

export { bgColorKey };
