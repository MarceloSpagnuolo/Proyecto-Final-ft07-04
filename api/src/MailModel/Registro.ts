var fs = require("fs")
const mailgunLoader = require("mailgun-js")
const jwt = require('jsonwebtoken');
const mailgun = mailgunLoader({
  apiKey: "ee88a4918226f8f65ddd7b1d2b21a3f8-3d0809fb-f6bf0951",
  domain: "sandbox2b110fa331aa4c138c477da2dc662ad1.mailgun.org",
});

function Registro(email: string) {

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
      console.error('Error: ' + err);
    } else {
      console.error('Response: ' + info);
    }
  });

  return modelEmail;
}
export default Registro