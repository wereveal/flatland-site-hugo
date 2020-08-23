const got = require('got');
const catchify = require('catchify');

const PCO_TOKEN = process.env.PCO_TOKEN;
const PCO_SECRET = process.env.PCO_SECRET;

const slugify = (str) => str.split(/\W/g).filter((t) => t).join('-').toLowerCase();

exports.handler = async function(event, context, callback) {
  const groupTypes = [
    { id: '81072', name: 'Interest Group', slug: 'interest-groups', color: 'pink' },
    { id: '63282', name: 'Series-Based', slug: 'series-based-life-groups', color: 'green' },
    { id: '82649', name: 'Student', slug: 'student-ministries-life-groups', color: 'purple' },
    { id: '94717', name: 'Study Group', slug: 'study-groups', color: 'yellow' },
  ];

  const groups = (await Promise.all(groupTypes.map(async ({ id, name, slug, color }) => {
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
        groupColor: color,
        url: `https://flatland.churchcenter.com/groups/${slug}/${slugify(attributes.name)}`,
      }));
  }))).reduce((acc, val) => [...acc, ...val], []);

  callback(null, {
    body: JSON.stringify(groups),
    statusCode: 200,
  });
};
