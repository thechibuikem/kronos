export function craftRepoList(response,user){
  const repoList = response.data.map((e) => ({
    repoId: e.id,
    repoUrl: e.html_url,
    repoName: e.name,
    githubOwnerId: user.id,
    isPrivate: e.private,
    owner: e.owner.login,
  })); // prepared repoList

  return repoList
}