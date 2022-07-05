import { Ref, InjectionKey } from 'vue';

export interface BgColor {
  color: Ref;
  setColor: Function;
}

const BgColorKey: InjectionKey<BgColor> = Symbol('BgColor');

export { BgColorKey };
