import type { TabsProps } from './Tabs.vue';

export type NumberOrString = number | string;
export type TabsAlign = 'start' | 'center' | 'end';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsVariant = 'line' | 'enclosed' | 'soft-rounded';
export type TabsColor = 'default' | 'success' | 'info' | 'warning' | 'danger';

export interface TabsContext {
  state: {
    selectedIndex: NumberOrString;
  };
  onTabChange: (tab: NumberOrString) => void;
  props: Omit<TabsProps, 'modelValue'>;
}
