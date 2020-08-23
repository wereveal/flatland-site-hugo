const got = require('got');
const catchify = require('catchify');

const PCO_TOKEN = process.env.PCO_TOKEN;
const PCO_SECRET = process.env.PCO_SECRET;

exports.handler = async function(event, context, callback) {
  const groupTypes = [
    { id: '81072', name: 'Interest Group' },
    { id: '63282', name: 'Series-Based' },
    { id: '82649', name: 'Student' },
    { id: '94717', name: 'Study Group' },
  ];

  const groups = (await Promise.all(groupTypes.map(async ({ id, name }) => {
    const [err, data] = await catchify(got(`https://api.planningcenteronline.com/groups/v2/group_types/${id}/groups`, {
      username: PCO_TOKEN,
      password: PCO_SECRET,
    }).json());

    if (err) return null;
    return data.data
      .filter(({ attributes }) => attributes.enrollment_strategy !== 'closed')
      .map(({ attributes }) => ({
        image: attributes.header_image.medium,
        name: attributes.name,
        schedule: attributes.schedule,
        groupType: name,
      }));
  }))).reduce((acc, val) => [...acc, ...val], []);

  callback(null, {
    body: JSON.stringify(groups),
    statusCode: 200,
  });
};
