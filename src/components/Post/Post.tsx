import React from 'react';
import { Link } from 'gatsby';

import Author from './Author';
import Comments from './Comments';
import Header from './Header';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import { Node } from '../../types';
import readingTime from 'reading-time';

interface Props {
  post: Node;
}

const Post = ({ post }: Props) => {
  const { body } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date, description, socialImage } = post.frontmatter;
  const time = readingTime(body, { wordsPerMinute: 300 }).text;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">
        All Articles
      </Link>

      <div className={styles['post__content']}>
        <Header
          title={title}
          date={date}
          readingTime={time}
          socialImage={socialImage}
          description={description}
        />
        <div className="flex justify-center align-items mt-5 px-4">
          {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        </div>

        <Content body={body} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
