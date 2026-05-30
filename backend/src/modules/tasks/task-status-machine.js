const transitions = {
  TODO: ["IN_PROGRESS", "BLOCKED"],

  IN_PROGRESS: ["IN_REVIEW", "BLOCKED"],

  IN_REVIEW: ["DONE", "BLOCKED"],

  DONE: [],

  BLOCKED: ["TODO", "IN_PROGRESS"],
};

const canTransition = (currentStatus, newStatus) => {
  return (transitions[currentStatus] || []).includes(newStatus);
};

module.exports = {
  canTransition,
};
