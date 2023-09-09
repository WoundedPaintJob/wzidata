const LocalImages = true;
const LocalSettings: SettingsType = {
  RenderMap: true,
  ResourceUrl: '/Images/Resources/',
  RewardUrl: '/Images/Rewards/',
};
const CDNSettings: SettingsType = {
  RenderMap: false,
  ResourceUrl: 'https://warzonecdn.com/ujs/Resources/',
  RewardUrl: 'https://warzonecdn.com/UJS/ANTC/',
};
export const Settings = LocalImages ? LocalSettings : CDNSettings;

type SettingsType = {
  RenderMap: boolean;
  ResourceUrl: string;
  RewardUrl: string;
};
