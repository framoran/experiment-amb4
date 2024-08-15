import { setCookie, send, readBody, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log('body: ', body);

    if (!body.subject_nb || !body.condition) {
      return send(event, { error: 'Please complete all information' }, 400);
    } else {
      setCookie(event, 'subject_nb', body.subject_nb, { maxAge: 60 * 60 * 24 * 7 });
      setCookie(event, 'subject_condition', body.condition, { maxAge: 60 * 60 * 24 * 7 });

      sendRedirect(event, '/instructions1');
    }
  } catch (error) {
    console.error('Error handling the request:', error);
    return send(event, { error: 'An internal error occurred' }, 500);
  }
});
