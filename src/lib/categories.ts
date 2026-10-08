// Sub-categories within the "tech" section, used to group posts in the sidebar.
export const categories = ['web', 'ds-algo', 'ai-agent', 'security', 'martech', 'ai'] as const;
export type Category = (typeof categories)[number];
export const categoryLabels: Record<Category, string> = {
  web: 'Web',
  'ds-algo': 'DS & Algo',
  'ai-agent': 'AI Agent',
  security: 'Security',
  martech: 'MarTech',
  ai: 'AI',
};

export const sections = ['general', 'tech', 'project'] as const;
export type Section = (typeof sections)[number];
