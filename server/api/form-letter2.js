import { getCookie, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  // Parse the request body
  const body = await readBody(event);

  // Ensure that the letters are numbers
  const letterJ = Number(body.letterJ);
  const letterK = Number(body.letterK);
  const letterL = Number(body.letterL);
  const letterM = Number(body.letterM);

  // Calculate score
  const letterJ_check = 3;
  const letterK_check = 4;
  const letterL_check = 4;
  const letterM_check = 8;

  const letterJ_diff = Math.abs(letterJ_check - letterJ);
  const letterK_diff = Math.abs(letterK_check - letterK);
  const letterL_diff = Math.abs(letterL_check - letterL);
  const letterM_diff = Math.abs(letterM_check - letterM);

  const sum_tot = 19;
  let sum = sum_tot - (letterJ_diff + letterK_diff + letterL_diff + letterM_diff);

  console.log(sum);

  const subjectCondition = getCookie(event, 'subject_condition');
  let feedback = "";

  if (sum > 16) {
    switch (subjectCondition) {
      case '1':
        feedback = "Congratulations! You succeeded on the task! You earned $10.";
        setCookie(event, 'money_earned2', 10, { maxAge: 60 * 60 * 24 });
        break;
      case '2':
        feedback = "Congratulations! You succeeded on the task! You earned $0.10.";
        setCookie(event, 'money_earned2', 0.10, { maxAge: 60 * 60 * 24 });
        break;
      default:
        feedback = "Congratulations! You succeeded on the task! You earned $0.10.";
        setCookie(event, 'money_earned2', 0.10, { maxAge: 60 * 60 * 24 });
        break;
    }
  } else {
    feedback = "Unfortunately, you did not succeed on the task.";
  }

  setCookie(event, 'sum2', sum, { maxAge: 60 * 60 * 24 });
  setCookie(event, 'feedback2', feedback, { maxAge: 60 * 60 * 24 });

  console.log(sum);

  return sendRedirect(event, '/instructions23');
});