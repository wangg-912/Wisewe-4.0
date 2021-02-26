export interface IMenubarList {
  id?: number | string;
  name?: string;
  path: string;
  redirect?: string | { name: string };
  meta?: {
    icon: string;
    title: string;
    activeMenu?: string;
    noCache?: boolean;
    hidden?: boolean;
  };
  component?: (() => Promise<typeof import('*.vue')>) | string;
  children?: Array<IMenubarList>;
}
