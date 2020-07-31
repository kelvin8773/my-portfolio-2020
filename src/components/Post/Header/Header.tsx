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
  socialImage: string;
  description: string;
}

const Header = ({
  title,
  date,
  readingTime,
  socialImage,
  description,
}: Props) => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['header']}>
      <h1 className={styles['header__title']}>{title}</h1>
      <img
        className="md:w-10/12 rounded shadow-md md:mt-0 mt-4"
        src={socialImage}
        alt="Cover Image"
      />

      <div
        className="md:w-9/12 text-center text-2xl font-bold capitalize
                text-orange-700 bg-gray-100 p-8 
                my-6 rounded-lg shadow-md"
      >
        {description}
      </div>

      {/* front meta start */}
      <div className="flex justify-center items-center italic text-gray-600 text-base ">
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
