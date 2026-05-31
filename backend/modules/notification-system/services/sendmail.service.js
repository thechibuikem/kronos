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

 const {data,error} = await
  resend.emails.send({
  from: `${generateName()} from Kronos`,
  to: [receiverEmail],
  subject: "Productivity Report",
  html: `<h2>it works!</h2>`,
})

  if (error) {
    return res.status(400).json({ error });
  }
  
  res.status(200).json({ data });

}


















// app.listen(3000, () => {
//   console.log("Listening on http://localhost:3000");
// });