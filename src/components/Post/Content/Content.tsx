import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styles from './Content.module.scss';

interface Props {
  body: string;
}

const Content = ({ body }: Props) => (
  <div className={styles['content']}>
    <div className={styles['content__body']}>
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  </div>
);

export default Content;
