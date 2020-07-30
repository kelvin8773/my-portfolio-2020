import React from 'react';
import useGithubRepoData from '../../hooks/use-github-repos';
import styles from './ProjectList.module.scss';

const ProjectList = () => {
  const repos = useGithubRepoData();
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
          languages,
        } = repo.node;

        return (
          <div key={name} className="md:flex mb-8 w-full">
            <div className="md:flex-shrink-0">
              <img
                className="rounded-lg md:w-56"
                src={openGraphImageUrl}
                alt="project image"
              />
            </div>
            <div className="mt-4 mb-4 md:mt-0 md:ml-6">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                {name}
              </div>
              <a
                href={homepageUrl}
                target="_blank"
                className="block mb-4 text-lg leading-tight font-semibold text-gray-900 hover:underline"
              >
                {description}
              </a>

              {/* language */}
              <div className="mb-4 text-sm">
                {languages.edges.map((node) => {
                  const { name, color } = node.node;
                  return (
                    <strong
                      key={name + color}
                      style={{ background: color }}
                      className="mr-3 text-white p-2 rounded-lg"
                    >
                      {name}
                    </strong>
                  );
                })}
              </div>

              {/* tech stack & Topic   */}
              <div className="mb-4">
                {repositoryTopics.edges.map((node) => {
                  const { name } = node.node.topic;
                  const { url } = node.node;
                  return (
                    <span
                      key={url + name}
                      className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mt-2 mr-1"
                    >
                      <a
                        href={url}
                        target="_blank"
                        className="hover:text-orange-700"
                      >
                        #{name}
                      </a>
                    </span>
                  );
                })}
              </div>

              {/* button   */}
              <div className="mt-6">
                <a
                  href={homepageUrl}
                  target="_blank"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-5 rounded-full mr-5"
                >
                  Demo
                </a>
                <a
                  href={url}
                  target="_blank"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-5 rounded-full"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
