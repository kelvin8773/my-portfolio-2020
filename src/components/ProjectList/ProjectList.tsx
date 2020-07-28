import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styles from './ProjectList.module.scss';

interface Project {
  author: string;
  repo: string;
}

interface props {
  projectList: Array<Project>;
}

const ProjectList = ({ projectList }: props) => {
  const githubData = useStaticQuery(graphql`
    query {
      github {
        viewer {
          login
          name
          email
          bio
          url
          avatarUrl(size: 10)
          createdAt
        }
      }
    }
  `);

  const data = githubData ? githubData.github.viewer : 'error';

  console.log(data);
  return (
    <div className={styles['projectList']}>
      {projectList.map((project) => {
        const repoLink = `https://github.com/${project.author}/${project.repo}`;

        return (
          <div key={repoLink} className={styles['projectList__item']}>
            <a href={repoLink} rel="noopener noreferrer" target="_blank">
              <div>{project.author}</div>
              <div>{project.repo}</div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
