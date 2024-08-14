import { theme, ThemeConfig } from 'antd';
import { token } from './token';
import { components } from './components';

export const themeConfig: ThemeConfig = {
  token,
  components,
  algorithm: theme.defaultAlgorithm,
};