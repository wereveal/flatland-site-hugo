const got = require('got');
const catchify = require('catchify');

const PCO_TOKEN = process.env.PCO_TOKEN;
const PCO_SECRET = process.env.PCO_SECRET;

const getTime = (str) => {
  const dateString = str.replace('Next Step', '').trim();
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });
  return formatter.format(date);
};

exports.handler = async function(event, context, callback) {
  const { name } = event.queryStringParameters;
  const opts = {
    username: PCO_TOKEN,
    password: PCO_SECRET,
  };
  const isNextStep = name.includes('Next Step');
  const url = isNextStep ?
    `https://api.planningcenteronline.com/groups/v2/group_types/63283/groups` :
    `https://api.planningcenteronline.com/registrations/v2/events?filter=unarchived`;

  const [err, data] = await catchify(got(url, opts).json());

  if (err) return callback(err);

  return callback(null, {
    body: JSON.stringify(data.data
      .filter(({ attributes }) => attributes.name.includes(isNextStep ? 'Next Step' : name) && (isNextStep && attributes.enrollment_strategy !== 'closed'))
      .map(({ attributes }) => ({
        eventTime: isNextStep ? getTime(attributes.name) : attributes.event_time_summary,
        publicUrl: isNextStep ?
          `https://flatland.churchcenter.com/groups/core-classes/${attributes.name.replace(/[\s\/]/g, '-').toLowerCase()}` :
          attributes.public_url,
        schedule: isNextStep ? attributes.schedule : undefined,
      }))),
    statusCode: 200,
  });
};
