const got = require('got');
const catchify = require('catchify');

const PCO_TOKEN = process.env.PCO_TOKEN;
const PCO_SECRET = process.env.PCO_SECRET;

exports.handler = async function(event, context, callback) {
  const [err, data] = await catchify(got(`https://api.planningcenteronline.com/registrations/v2/events?filter=unarchived`, {
    username: PCO_TOKEN,
    password: PCO_SECRET,
  }).json());

  if (err) return callback(err);

  return callback(null, JSON.stringify(data.data
    .filter(({ attributes }) => attributes.name.includes(event.queryStringParameters.name))
    .map(({ attributes }) => ({
      eventTime: attributes.event_time_summary,
      publicUrl: attributes.public_url,
    }))));
};
