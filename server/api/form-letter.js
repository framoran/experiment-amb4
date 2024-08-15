import { getCookie, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  // Parse the request body
  const body = await readBody(event);

  // Ensure that the letters are numbers
  const letterD = Number(body.letterD);
  const letterE = Number(body.letterE);
  const letterF = Number(body.letterF);
  const letterG = Number(body.letterG);

  // Calculate score
  const letterD_check = 5;
  const letterE_check = 3;
  const letterF_check = 7;
  const letterG_check = 4;

  const letterD_diff = Math.abs(letterD_check - letterD);
  const letterE_diff = Math.abs(letterE_check - letterE);
  const letterF_diff = Math.abs(letterF_check - letterF);
  const letterG_diff = Math.abs(letterG_check - letterG);

  const sum_tot = 19;
  let sum = sum_tot - (letterD_diff + letterE_diff + letterF_diff + letterG_diff);

  console.log(sum);

  const subjectCondition = getCookie(event, 'subject_condition');
  let feedback = "";

  if (sum > 16) {
    switch (subjectCondition) {
      case '1':
        feedback = "Congratulations! You succeeded on the task! You earned $0.10.";
        setCookie(event, 'money_earned1', 0.10, { maxAge: 60 * 60 * 24 });

        break;
      case '2':
        feedback = "Congratulations! You succeeded on the task! You earned $10.";
        setCookie(event, 'money_earned1', 10, { maxAge: 60 * 60 * 24 });

        break;
      default:
        feedback = "Congratulations! You succeeded on the task! You earned $0.10.";
        setCookie(event, 'money_earned1', 0.10, { maxAge: 60 * 60 * 24 });
        break;
    }
  } else {
    feedback = "Unfortunately, you did not succeed on the task.";
  }

  setCookie(event, 'sum1', sum, { maxAge: 60 * 60 * 24 });
  setCookie(event, 'feedback1', feedback, { maxAge: 60 * 60 * 24 });

  console.log(sum);

  return sendRedirect(event, '/instructions13');
});
