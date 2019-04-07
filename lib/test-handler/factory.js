const caseStrategy = require('./case');
const describeStrategy = require('./describe');

function create(name) {
  if (name === 'case') {
    return caseStrategy;
  }
  if (name === 'describe') {
    return describeStrategy;
  }

  return null;
}

module.exports = {
  create,
};
