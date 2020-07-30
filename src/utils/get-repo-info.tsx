import { graphql } from '@octokit/graphql';

interface Project {
  owner: string;
  name: string;
}

interface props {
  projectList: Array<Project>;
}

const getRepoInfo = async ({ owner, name }: Project) => {
  const { repository } = await graphql({
    query: `query repoInfo($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        name
        description
        languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            name
            color
          }
        }
        pushedAt
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
            url
          }
        }
        primaryLanguage {
          color
          name
        }
        collaborators(first: 10) {
          totalCount
          nodes {
            avatarUrl
            name
          }
        }
        updatedAt
        openGraphImageUrl
      }
    }`,
    owner: owner,
    name: name,
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });

  return repository;
};

export default getRepoInfo;
