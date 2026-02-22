const { google } = require('googleapis');
const credentials = require('./credentials.json');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // Authenticate
  const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/calendar']
  );
  await jwtClient.authorize();

  const calendar = google.calendar({ version: 'v3', auth: jwtClient });

  // Create event
  const calendarId = 'nicolaebordei3@gmail.com';
  const startTime = `${data.date}T${data.time}:00+02:00`;
  const endHour = String(parseInt(data.time.split(':')[0]) + 1).padStart(2, '0');
  const endTime = `${data.date}T${endHour}:${data.time.split(':')[1]}:00+02:00`;
  const eventObj = {
    summary: `Programare: ${data.name} (${data.serviceLabel})`,
    description: `Telefon: ${data.phone}\nEmail: ${data.email}\nDetalii: ${data.notes}`,
    start: { dateTime: startTime },
    end: { dateTime: endTime },
    attendees: [{ email: data.email }]
  };

  try {
    await calendar.events.insert({ calendarId, resource: eventObj });
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
