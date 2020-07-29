import React from 'react';
import useGithubRepoData from '../../hooks/use-github-repos';
import styles from './ProjectList.module.scss';

const ProjectList = () => {
  const repos = useGithubRepoData();
  console.log(repos);
  return (
    <div className={styles['projectList']}>
      {repos.map((repo) => {
        const {
          name,
          homepageUrl,
          openGraphImageUrl,
          description,
          primaryLanguage,
          startgazers,
          url,
          repositoryTopics,
          pushedAt,
          createdAt,
          updatedAt,
        } = repo.node;

        return (
          <div key={name} className="md:flex m-4">
            <div className="md:flex-shrink-0">
              <img
                className="rounded-lg md:w-48"
                src={openGraphImageUrl}
                alt="Woman paying for a purchase"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                {name}
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
              >
                {description}
              </a>
              <p className="mt-2 text-gray-600">
                Getting a new business off the ground is a lot of hard work.
                Here are five ideas you can use to find your first customers.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
