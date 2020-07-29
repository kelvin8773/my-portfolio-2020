import React from 'react';
import useGithubRepoData from '../../hooks/use-github-repos';
import styles from './ProjectList.module.scss';

const ProjectList = () => {
  const repos = useGithubRepoData();

  return (
    <div className={styles['projectList']}>
      {repos.map((repo) => {
        console.log(repo.node);
        const { name } = repo.node;
        return (
          <div key={name} className={styles['projectList__item']}>
            <div>{name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
