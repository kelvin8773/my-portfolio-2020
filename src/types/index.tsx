import type { Node as ReactNode } from 'react';

export type RenderCallback = {
  render: (data: any) => ReactNode;
};

export interface Entry {
  getIn: (arg0: string[]) => string;
};

export type WidgetFor = (arg0: string) => string;


export interface PageContext {
  tag: string,
  category: string,
  currentPage: number,
  prevPagePath: string,
  nextPagePath: string,
  hasPrevPage: boolean,
  hasNextPage: boolean
};

export interface Node {
  fields: {
    slug: string,
    categorySlug?: string,
    tagSlugs?: string[]
  },
  frontmatter: {
    date: string,
    description?: string,
    category?: string,
    tags?: string[],
    title: string,
    socialImage?: string
  },
  body: string,
  id: string
};

export interface Edge {
  node: Node
};

export type Edges = Array<Edge>;

export interface AllMdx  {
  allMdx: {
    edges:  Edges
  },
  group: {
    fieldValue: string,
    totalCount: number
  }[]
};

export type Mdx = Node;

