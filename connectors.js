// Fake word generator
import faker from 'faker';

// Let's generate some tags
var id = 0;
var tags = [];
for (let i = 0; i < 42; i++) {
  addTag(faker.random.word());
}

function addTag(label) {
  return new Promise(resolve => {
    setTimeout(() => {
      let t = {
        id: id++,
        label
      };
      tags.push(t);
      resolve(t);
    }, 2000);
  });
}

export default {
  getTags() {
    return tags;
  },
  addTag,
};
