/** Atlas structural sizing tokens. Source: Atlas UI System, 03 — Foundations, Grid & Layout. */
export const sizing = {
  sidebar: '240px',
  sidebarCollapsed: '72px',
  topbar: '129px',
  iconSm: '14px',
  iconMd: '16px',
  iconLg: '20px',
} as const;

export type SizingToken = keyof typeof sizing;
