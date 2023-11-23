const passport = require('passport');
const Usuario = require('../js/Usuario');

exports.postSignup = async (req, res, next) => {
  try {
    const usuario = new Usuario({
      email: req.body.email,
      nombre: req.body.nombre,
      password: req.body.password
    });

    const usuarioExistente = await Usuario.findOne({ email: req.body.email });
    if (usuarioExistente) {
      return res.status(400).send('This email is already registered');
    }

    const nuevoUsuario = await usuario.save();
    req.logIn(nuevoUsuario, err => {
      if (err) {
        next(err);
      }
      res.send('User has been registered successfully');
    });
  } catch (err) {
    next(err);
  }
};

  exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info) => {
      if (err) {
        next(err);
      }
      if (!usuario) {
        return res.status(400).send('Invalid email or password');
      }
      req.logIn(usuario, (err) => {
        if (err) {
          next(err);
        }
        console.log('Sesión creada:', req.session); // Mensaje de registro
        res.json({ userId: usuario.id });
      })
    })(req, res, next);
  }

  exports.getUserInfo = async (req, res) => {
    const userId = req.params.userId;
    const user = await Usuario.findById(userId);
    res.json({
      email: user.email,
      nombre: user.nombre,
      // Agregar campos adicionales aquí
      direccion: user.direccion,
      ciudad: user.ciudad,
      pais: user.pais,
      codigoPostal: user.codigoPostal,
      username: user.username,
      aboutMe: user.aboutMe,
      profileImage: user.profileImage
      });
   };

   exports.updateUserInfo = async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;
    await Usuario.findByIdAndUpdate(userId, updateData);
    res.send('Información actualizada');
   };

  exports.logout = (req, res) => {
    req.logout(err => {
      if (err) {
        // Aquí puedes manejar el error
        console.error(err);
        res.status(500).send('Algo salió mal');
      } else {
        res.send('Logout exitoso');
      }
    });
  };

  exports.uploadProfileImage = async (req, res) => {
    try {
      const userId = req.params.userId;
      const image = req.body;
      // Aquí puedes guardar la imagen en tu base de datos
      await Usuario.findByIdAndUpdate(userId, { profileImage: image });
      res.send('Imagen guardada');
    } catch (err) {
      res.status(500).send('Error al guardar la imagen');
    }
  }; 

  exports.changePassword = async (req, res) => {
    try {
      // Obtener el ID de usuario, la contraseña actual y la nueva contraseña del usuario de la solicitud
      const userId = req.params.userId;
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
  
      // Buscar al usuario en la base de datos
      const user = await Usuario.findById(userId);
  
      // Verificar si la contraseña actual es correcta
      user.compararPassword(currentPassword, async (err, sonIguales) => {
        if (err) {
          throw err;
        }
        if (!sonIguales) {
          res.status(400).send('La contraseña actual es incorrecta');
          return;
        }
  
        // Si la contraseña actual es correcta, actualizar la contraseña del usuario en la base de datos
        user.password = newPassword;
        await user.save();
  
        // Enviar una respuesta al cliente indicando que la actualización fue exitosa
        res.send('Contraseña actualizada');
      });
    } catch (err) {
      // Si ocurre un error, enviar una respuesta de error al cliente
      res.status(500).send('Error al actualizar la contraseña');
    }
  };



