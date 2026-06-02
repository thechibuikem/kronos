import { Resend } from "resend";
import { getUserFromUserId } from "../../user/service/user.service.js";
const resend = new Resend("re_xxxxxxxxx");


function generateName(){
  const names = ["Nancy", "David", "Miracle", "Success"]
  const randomNumber = Math.floor(Math.random() * 4);
  return (names[randomNumber])
}
  
export async function sendMail(userId,insights) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const receiverEmail = (await getUserFromUserId(userId)).userEmail

  const content = 
  insights?.summary
    ? `<p>${insights.summary}</p>`
    : `
        <p>${insights.tip}</p>
        <p>${insights.explanation}</p>
      `
    }
  
 const { data, error } = await resend.emails.send({
   from: `${generateName()} from Kronos`,
   to: [receiverEmail],
   subject: "Productivity Report",
   html: content,
 });

  if (error) {
    return error
  }
  
  return { data };

console.log("email sent successfully")

// app.listen(3000, () => {
//   console.log("Listening on http://localhost:3000");
// });