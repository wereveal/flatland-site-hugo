const got = require('got');

const PCO_TOKEN = process.env.PCO_TOKEN;
const PCO_SECRET = process.env.PCO_SECRET;

exports.handler = async function (event, ctx, cb) {
  if (!event.queryStringParameters.id) {
    return cb(null, {
      body: JSON.stringify({ errors: ['ID of form must be supplied.'] }),
    });
  }

  const form = await got(
    `https://api.planningcenteronline.com/people/v2/forms/${event.queryStringParameters.id}/fields`,
    {
      username: PCO_TOKEN,
      password: PCO_SECRET,
      searchParams: {
        order: 'sequence',
        include:
          'options,field_definitions,field_options,marital_statuses,campuses,form_field_conditions,school_options',
      },
    },
  ).json();

  cb(null, {
    body: JSON.stringify(form),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
