var fs = require("fs")
const mailgunLoader = require("mailgun-js")
const jwt = require('jsonwebtoken');
const mailgun = mailgunLoader({
  apiKey: `${process.env.MAILGUN_KEY}`,
  domain: `${process.env.MAILGUN_DOMAIN}`,
});

function Registro(email: string) {
  console.log(email, "ENTRE ACA 1")

  const token = jwt.sign({ email}, "secreto", { expiresIn: 1800 });

  var modelEmail = fs.readFileSync("./src/mailmodel/Registro.html", 'utf8', function (err: any, data: any) {
    if (err) console.error(err);
    return data
  })

  var datatemplate = `<a style="padding:0.5em; display:inline-block; text-decoration:none; background-color: red;
   color:#ffffff; margin:.5em; border-radius:.5em;"href="${'http://localhost:3000'}/registro/?token=${token}">REGISTRARSE EN HENRY APP</a>`;
  var copypaste = `http://localhost:3000/registro/?token=${token}`
  modelEmail = modelEmail.replace("%givenname%", email);
  modelEmail = modelEmail.replace("%resetlink%", datatemplate);
  modelEmail = modelEmail.replace("%direccion%", copypaste);
  mailgun.messages().send({
    from: 'Henry App <SoyHenry@henry.com>',
    to: email,
    subject: 'Registro de Usuario',
    html: modelEmail
  }, function (err: any, info: any) {
    if (err) {
      console.log("Entre aca 3")
      console.error('Error: ' + err);
    } else {
      console.log("Entre aca 4")
      console.error('Response: ' + info);
    }
  });

  return modelEmail;
}
export default Registro