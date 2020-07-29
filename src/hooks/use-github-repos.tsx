import { useStaticQuery, graphql } from 'gatsby';

const useGithubRepoData = () => {
  const { github } = useStaticQuery(graphql`
    query getPinnedRepo {
      github {
        user(login: "kelvin8773") {
          pinnedItems(first: 10) {
            edges {
              node {
                ... on GitHub_Repository {
                  name
                  homepageUrl
                  updatedAt
                  openGraphImageUrl
                  createdAt
                  description
                  primaryLanguage {
                    name
                    color
                  }
                  nameWithOwner
                  watchers {
                    totalCount
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return github.user.pinnedItems.edges;
};

export default useGithubRepoData;
