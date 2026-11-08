export interface SearchableItem {
  repoName: string;
  repoId: string;
}

export function getSearchTargetId(repoId: string): string {
  return `search-target-${encodeURIComponent(repoId)}`;
}
