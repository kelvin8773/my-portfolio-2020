import React from 'react';
import styles from './Header.module.scss';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

import { useSiteMetadata } from '../../../hooks';

interface Props {
  title: string;
  date: string;
  readingTime: string;
}

const Header = ({ title, date, readingTime }: Props) => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['header']}>
      <h1 className={styles['header__title']}>{title}</h1>

      {/* front meta start */}

      <div className="flex justify-center items-center italic text-gray-600 text-base">
        <div className="flex items-center mr-4">
          <img className="w-8 rounded-full mr-2" src={author.photo} />
          <div className="font-bold">{author.name}</div>
        </div>

        <div className="text-left capitalize">
          <span className="mr-1">{dayjs(date).format('LL')}</span>
          <span className="mr-1"> {readingTime}</span>
        </div>
      </div>

      {/* front meta end */}
    </div>
  );
};

export default Header;
