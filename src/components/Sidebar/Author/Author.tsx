import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

interface Props {
  author: {
    name: string;
    bio: string;
    photo: string;
  };
  isIndex: boolean;
}

const Author = ({ author, isIndex }: Props) => (
  <div className={styles['author']}>
    <Link to={isIndex === true ? '/about' : '/'}>
      <img
        src={withPrefix(author.photo)}
        className={styles['author__photo']}
        width="95"
        height="95"
        alt={author.name}
      />
    </Link>

    <h3 className={styles['author__title']}>
      <Link
        className={styles['author__title-link']}
        to={isIndex === true ? '/about' : '/'}
      >
        {author.name}
      </Link>
    </h3>

    <p className={styles['author__subtitle']}>{author.bio}</p>
  </div>
);

export default Author;
