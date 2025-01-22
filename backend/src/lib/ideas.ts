import _ from 'lodash';

export const ideas = _.times(50, (i) => ({
  nick: `nick-${i}`,
  name: `Name ${i}`,
  description: `Fuck ${i}`,
  text: _.times(50, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}));
