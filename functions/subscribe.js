const mailchimp = require('mailchimp-node')(process.env.MAILCHIMP_KEY);

exports.handler = async function(event, context, callback) {

  await mailchimp.lists.createMember('1b4fe08285', {
    email_address: JSON.parse(event.body).email,
    status: 'subscribed',
  }).catch((e) => {
    console.log('Member already exists. Ignoring error.');
  });

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: 'Subscribed!' }),
  });
};
