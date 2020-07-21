import React from 'react';
import styles from './Copyright.module.scss';

interface Props {
  copyright: string;
}

const Copyright = ({ copyright }: Props) => (
  <div className={styles['copyright']}>{copyright}</div>
);

export default Copyright;
