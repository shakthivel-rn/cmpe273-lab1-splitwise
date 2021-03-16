const request = require('supertest')('http://localhost:3001');
const { describe, it } = require('mocha');

describe('GET /dashboard/getGroupNames', () => {
  it('should succesfully return group names', (done) => {
    request
      .get('/dashboard/getGroupNames')
      .query({ userId: 1 })
      .expect(200, [
        { group_id: 3, group_name: 'Activity' },
        { group_id: 1, group_name: 'Daily' },
        { group_id: 4, group_name: 'Exam' },
        { group_id: 2, group_name: 'Hike' }], done);
  });
});
