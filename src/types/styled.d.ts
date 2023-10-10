import {DefaultCustomTheme} from '@themes/default';
import 'styled-components/native';

export type ITheme = typeof DefaultCustomTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends ITheme {}
}
