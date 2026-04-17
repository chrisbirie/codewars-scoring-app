export interface TeamConfig {
  teamMembers: string[];
  codeWarsUser: string;
}

export const SCOREBOARD_TEAMS_CONFIG: TeamConfig[] = [
  {
    teamMembers: ['CSS Ninjas'],
    codeWarsUser: 'css99',
  },
  {
    teamMembers: ['Chris Birie', 'My Awesome Partner'],
    codeWarsUser: 'crimsongreen',
  },
  {
    teamMembers: ['Mild Racc Team'],
    codeWarsUser: 'MildRacc',
  },
  {
    teamMembers: ['He Who Loses', 'Their Partner'],
    codeWarsUser: 'IWillLoseToChris',
  },
];
