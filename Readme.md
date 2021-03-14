<b>HENRY MANAGER</b>

PRESENTACION<br />
Proyecto final realizado para el bootcamp de Henry, en grupo de varios integrantes, aplicando técnicas de SCRUM y tecnologías adquiridas algunas durante el bootcamp y otras durante el desarollo del propio proyecto.

TECNOLOGÍAS<br />
Las tecnologías principales utilizadas fueron: <b>Typescript</b> como lenguaje general del proyecto. <b>React</b>, <b>Redux</b> y <b>Router</b> para el diseño de los componentes del Frontend, <b>Axios</b> para las consultas al Backend. <b>NodeJs</b>, <b>Express</b> para el desarrollo del Backend. <b>Bcrypt</b> para el hasheo de passwords. <b>Passport</b> para estrategias locales de usuarios y protección de rutas junto a <b>JsonWebToken</b>. <b>Mailgun</b> para manejo de mails. <b>Multer</b> para uploads de imágenes. <b>Xlxs</b> para el manejo de planillas de cálculo y <b>C3Js</b> para visualizar gráficos estadísticos.

LOGIN<br />
<imagen del login>
El home de la aplicación es directamente el login de la misma, ya que unicamente pueden acceder a ella sólo aquellos usuarios que hayan sido invitados por email. De esta forma, no se despliega ningún menú o información hasta que el usuario ingresa, y, dependiendo del rol del usuario logeado, la aplicación se adapta al mismo.
  
  ALUMNOS<br />
  Tienen acceso solo a componentes read only, comos ser sus notas, sus datos estadísticos, etc.
  
  TEACHERS ASSISTANTS<br />
  Ya que también es un alumno, tienen acceso a los mismos componentes que un alumno, pero sumado el acceso y edicion de asistencias y participación de los alumnos del grupo de StandUp al que pertenecen.
  
  ADMINISTRADORES<br />
  Tienen acceso a maenjo y control de alumnos.
  
  Manejo, creación y control de cohortes.
  
  Manejo y carga de notas de los diferentes checkpoints de los alumnos.
  
