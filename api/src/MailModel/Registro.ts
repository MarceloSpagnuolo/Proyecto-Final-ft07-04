require('dotenv').config();
var fs = require("fs");
const mailgunLoader = require("mailgun-js");
const jwt = require("jsonwebtoken");
const mailgun = mailgunLoader({
apiKey: process.env.MAILGUN_KEY,
domain: process.env.MAILGUN_DOMAIN,
});

function Registro(email: string, msj: string, cohorte: any) {
  const token = jwt.sign({ email, cohorte }, process.env.SECRET, { expiresIn: 259200 });

  var modelEmail = fs.readFileSync(
    "./src/mailmodel/Registro.html",
    "utf8",
    function (err: any, data: any) {
      if (err) console.error(err);
      return data;
    }
  );

  var datatemplate = `<a style="padding:0.5em; display:inline-block; text-decoration:none; background-color: red;
   color:#ffffff; margin:.5em; border-radius:.5em;"href="${"http://localhost:3000"}/registro/?mailToken=${token}">REGISTRARSE EN HENRY APP</a>`;
  var copypaste = `http://localhost:3000/registro/?mailToken=${token}`;
  modelEmail = modelEmail.replace("%givenname%", email);
  modelEmail = modelEmail.replace("%resetlink%", datatemplate);
  modelEmail = modelEmail.replace("%direccion%", copypaste);
  modelEmail = modelEmail.replace("%msj%", msj);

  mailgun.messages().send(
    {
      from: "Henry App <SoyHenry@henry.com>",
      to: email,
      subject: "Registro de Usuario",
      html: modelEmail,
    },
    function (err: any, info: any) {
      if (err) {
        console.error("Error: " + err);
      } else {
        console.error("Response: " + info);
      }
    }
  );

  return modelEmail;
}
export default Registro;
