export interface TeamConfig {
  teamMembers: string[];
  codeWarsUser: string;
}

export const SCOREBOARD_TEAMS_CONFIG: TeamConfig[] = [
  {
    teamMembers: ['Chris Birie', 'My Awesome Partner'],
    codeWarsUser: 'crimsongreen',
  },
  {
    teamMembers: ['He Who Loses', 'Their Partner'],
    codeWarsUser: 'IWillLoseToChris',
  },
];
