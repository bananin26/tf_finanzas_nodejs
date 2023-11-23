document.querySelector('.profile-photo-main img').style.display = 'none';
// Hacer una solicitud a la ruta /userInfo/:userId para obtener la información del usuario
// Obtener el ID de usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// Hacer una solicitud a la ruta /userInfo/:userId para obtener la información del usuario
fetch('http://localhost:3000/userInfo/' + userId)
 .then(response => {
 return response.json();
 })
 .then(data => {
  console.log(data);
 // Seleccionar el elemento que contiene el texto "Hello Jesse"
 const helloElement = document.querySelector('.header h1');
 const securityH1 = document.querySelector('#security-h1');
 // Actualizar el contenido del elemento con el nombre del usuario
 const firstNameInput = document.querySelector('#input-first-name');
 const emailInput = document.querySelector('#input-email');
 // Dividir el nombre del usuario en un arreglo de palabras
 const nameParts = data.nombre.split(' ');
 const lastNameInput = document.querySelector('#input-last-name');

 // Validar la cantidad de palabras en el nombre del usuario
 if (nameParts.length === 2) {
 // Si el nombre tiene dos palabras, asignar la primera al nombre y la segunda al apellido
 firstNameInput.value = nameParts[0];
 lastNameInput.value = nameParts[1];
 } else if (nameParts.length === 3) {
 // Si el nombre tiene tres palabras, asignar las dos primeras al apellido y la última al nombre
 firstNameInput.value = nameParts[2];
 lastNameInput.value = nameParts[0] + ' ' + nameParts[1];
 } else if (nameParts.length === 4) {
 // Si el nombre tiene cuatro palabras, asignar las dos primeras al nombre y las dos últimas al apellido
 firstNameInput.value = nameParts[0] + ' ' + nameParts[1];
 lastNameInput.value = nameParts[2] + ' ' + nameParts[3];
 }

 emailInput.value = data.email;
 // Actualizar el contenido del elemento h5 con el nombre del usuario
 document.querySelector('.profile h5').textContent = nameParts[0];
 helloElement.textContent = 'Hola ' + nameParts[0];
 securityH1.textContent = 'Hola ' + nameParts[0];

 // Asignar los valores de los campos adicionales a los elementos correspondientes
 if (data.direccion) {
 document.querySelector('#input-address').value = data.direccion;
 }
 if (data.ciudad) {
 document.querySelector('#input-city').value = data.ciudad;
 }
 if (data.pais) {
 document.querySelector('#input-country').value = data.pais;
 }
 if (data.codigoPostal) {
 document.querySelector('#input-postal-code').value = data.codigoPostal;
 }
 if (data.username) {
 document.querySelector('#input-username').value = data.username;
 }
 if (data.aboutMe) {
 document.querySelector('#about-me-1').value = data.aboutMe;
 }
 if (data.profileImage) {
  document.querySelector('.card-profile-image img').src = data.profileImage;
  document.querySelector('.profile-photo-main img').src = data.profileImage;
  document.querySelector('#image-profile-2').src = data.profileImage;
 }

  document.querySelector('.profile-photo-main img').style.display = 'block';

   // Verificar si todos los campos tienen un valor
  if (!data.nombre || !data.email || !data.direccion || !data.ciudad || !data.pais || !data.codigoPostal || !data.username || !data.aboutMe || !data.profileImage) {
  // Si alguno de los campos no tiene un valor, mostrar un mensaje con Swal.fire
  Swal.fire({
  title: 'Por favor completa tu perfil',
  text: "Hay campos en tu perfil que aún no has completado",
  icon: 'warning',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Ir a mi perfil'
  }).then((result) => {
  if (result.isConfirmed) {
  // Si el usuario hace clic en el botón "Ir a mi perfil", hacer clic en el elemento del menú "Profile"
  document.querySelector('aside .sidebar a:nth-child(2)').click();
  }
  });
  }

 // Actualizar el contenido de los elementos con la información del usuario
 const nameElement = document.querySelector('.card-profile h3');
 const nameElement2 = document.querySelector('#h3-2');
 const locationElement = document.querySelector('.card-profile .h5.font-weight-300');
 const locationElement2 = document.querySelector('#location');
 const aboutMeElement = document.querySelector('.card-profile p');
 const aboutMeElement2 = document.querySelector('#text-desc');

 // Asignar el nombre del usuario al elemento que muestra el nombre
 if (nameParts.length >= 2) {
 nameElement.textContent = nameParts[0] + ' ' + nameParts[1];
 nameElement2.textContent = nameParts[0] + ' ' + nameParts[1];
 } else {
 nameElement.textContent = data.nombre;
 nameElement2.textContent = data.nombre;
 }

 // Asignar la ciudad y el país del usuario al elemento que muestra la ubicación
 if (data.ciudad && data.pais) {
 locationElement.textContent = data.ciudad + ', ' + data.pais;
 locationElement2.textContent = data.ciudad + ', ' + data.pais
 } else {
 locationElement.style.display = 'none';
 locationElement2.style.display = 'none';
 }

 // Asignar la descripción "Acerca de mí" del usuario al elemento que muestra la descripción
 aboutMeElement.textContent = data.aboutMe || aboutMeElement.textContent;
 aboutMeElement2.textContent = data.aboutMe || aboutMeElement2.textContent;

 // Actualizar el contenido del elemento que muestra la ubicación
 if (data.ciudad && data.pais) {
   locationElement.textContent = data.ciudad + ', ' + data.pais;
   locationElement2.textContent = data.ciudad + ', ' + data.pais;
 } else {
   locationElement.style.display = 'none';
   locationElement2.style.display = 'none';
 }
 });

const lastNameInput = document.querySelector('#input-last-name');

lastNameInput.addEventListener('change', (event) => {
 // Obtener el valor del campo "First Name"
 const firstNameValue = document.querySelector('#input-first-name').value;
 // Concatenar el valor del campo "First Name" con el valor del campo "Last Name" para formar el nuevo nombre completo del usuario
 const newFullName = firstNameValue + ' ' + event.target.value;
 // Enviar una solicitud PUT a la ruta /userInfo/:userId para actualizar el nombre del usuario
 fetch('http://localhost:3000/userInfo/' + userId, {
 method: 'PUT',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({
 nombre: newFullName
 })
 })
 .then(response => {
 if (!response.ok) {
 throw new Error(response.statusText);
 }
 return response.text();
 })
 .then(data => {
 console.log('Nombre actualizado:', newFullName);
 })
 .catch(error => console.error('Error al actualizar el nombre:', error));
});

//Cambiar password
const buttonAplicar2 = document.querySelector('#aplicar2');
const currentPassword = document.querySelector('#input-current-password');
const newPassword = document.querySelector('#input-new-password');
const ConfirmNewPassword = document.querySelector('#input-confirm-password');

buttonAplicar2.addEventListener('click', async () => {
  // Obtener los valores de los campos "Current Password", "New Password" y "Confirm Password"
  event.preventDefault();
  const currentPasswordValue = currentPassword.value;
  const newPasswordValue = newPassword.value;
  const confirmNewPasswordValue = ConfirmNewPassword.value;

  // Verificar si la nueva contraseña y la confirmación de la contraseña coinciden
  if (newPasswordValue !== confirmNewPasswordValue) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden'
    });
    return;
  }

  // Enviar una solicitud PUT a la ruta /changePassword/:userId para actualizar la contraseña del usuario
  const response = await fetch(`http://localhost:3000/changePassword/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currentPassword: currentPasswordValue,
      newPassword: newPasswordValue
    })
  });

  if (!response.ok) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La contraseña actual es incorrecta'
    });    
    return;
  }
    // Borrar los valores de los campos de entrada
    currentPassword.value = '';
    newPassword.value = '';
    ConfirmNewPassword.value = '';

   // Mostrar un mensaje de SweetAlert indicando que la contraseña se actualizó con éxito
   Swal.fire({
    icon: 'success',
    title: 'Contraseña actualizada',
    text: 'La contraseña se ha actualizado con éxito'
  }).then(() => {
    cambiosGuardados = true;
    document.querySelector('aside .sidebar a:nth-child(1)').click();
  });

});

// Obtener el botón de logout
const logoutElement = document.querySelector('.sidebar .logout');

// Agregar el ID del usuario como un parámetro de consulta a cada enlace en la página
const links = document.querySelectorAll('a');
links.forEach(link => {
  // Verificar si el enlace ya contiene un parámetro userId y si no es el botón de logout
  const linkUrlParams = new URLSearchParams(link.search);
  if (!linkUrlParams.has('userId') && link !== logoutElement) {
    // Si el enlace no contiene un parámetro userId y no es el botón de logout, agregar uno
    if (link.href.indexOf('?') === -1) {
      link.href = link.href + '?userId=' + userId;
    } else {
      link.href = link.href + '&userId=' + userId;
    }
  }
});

// Obtener todos los enlaces <a> en la barra lateral
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Obtener el elemento con la clase "middle"
const middleElement = document.querySelector('.middle');
const firstOperationElement = document.querySelector('.first_operation');
const securityElement = document.querySelector('.security');

//Al iniciar la pagina los estilos de todos son bloqueados menos el middleElement
middleElement.style.display = 'block';
firstOperationElement.style.setProperty('display', 'none', 'important');
securityElement.style.setProperty('display', 'none', 'important');

// show or hide sidebar
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');
const carousel = document.querySelector('.container-carousel');
const inputContainer = document.querySelector('.input-container'); // Agregar esta línea
const labels = document.querySelectorAll('.first_operation label');

let isMenuOpen = false;

sidebar.style.display = 'none';
carousel.classList.add('container-carousel-close');
securityElement.classList.add('security-close'); // Agregar esta línea
firstOperationElement.classList.add('first-operation-close');
closeBtn.style.display = 'block';

// Agrega una variable para seleccionar el elemento con la clase first_operation

menuBtn.addEventListener('click', () => {
  if (isMenuOpen) {
    sidebar.classList.remove('sidebar-open');
    sidebar.style.display = 'none';
    carousel.classList.remove('container-carousel-open');
    carousel.classList.add('container-carousel-close');
    securityElement.classList.remove('security-open');
    securityElement.classList.add('security-close');
    firstOperationElement.classList.remove('first-operation-open');
    firstOperationElement.classList.add('first-operation-close');
    isMenuOpen = false;
  } else {
    sidebar.classList.add('sidebar-open');
    sidebar.style.display = 'block';
    carousel.classList.remove('container-carousel-close');
    carousel.classList.add('container-carousel-open');
    securityElement.classList.remove('security-close');
    securityElement.classList.add('security-open');
    firstOperationElement.classList.add('first-operation-open');
    firstOperationElement.classList.remove('first-operation-close');
    isMenuOpen = true;
  }
})

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('sidebar-open');
  sidebar.style.display = 'none';
  carousel.classList.remove('container-carousel-open');
  carousel.classList.add('container-carousel-close');
  securityElement.classList.remove('security-open');
  securityElement.classList.add('security-close');
  firstOperationElement.classList.remove('first-operation-open');
  firstOperationElement.classList.add('first-operation-close');
  isMenuOpen = false;
})

// change theme
const themeBtn = document.querySelector('.theme-btn');
// Obtener el elemento <img> del logotipo
const logoImg = document.querySelector('.logo');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');

    // Verificar si el cuerpo del documento tiene la clase "dark-theme"
    if (document.body.classList.contains('dark-theme')) {
      // Cambiar el atributo src del elemento <img> del logotipo a la imagen del tema oscuro
      logoImg.src = './images/logo2.png';
    } else {
      // Cambiar el atributo src del elemento <img> del logotipo a la imagen del tema claro
      logoImg.src = './images/logo.png';
    }
})

let cambiosGuardados = true;

const botonAplicar = document.querySelector('#aplicar');

botonAplicar.addEventListener('click', (event) => {
  event.preventDefault();
  // Obtener los valores de los campos del formulario
  const direccionValue = document.querySelector('#input-address').value;
  const ciudadValue = document.querySelector('#input-city').value;
  const paisValue = document.querySelector('#input-country').value;
  const codigoPostalValue = document.querySelector('#input-postal-code').value;
  const usernameValue = document.querySelector('#input-username').value;
  const aboutMeValue = document.querySelector('#about-me-1').value;
  // Enviar una solicitud PUT a la ruta /userInfo/:userId para actualizar la información del usuario
  fetch('http://localhost:3000/userInfo/' + userId, {
  method: 'PUT',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  direccion: direccionValue,
  ciudad: ciudadValue,
  pais: paisValue,
  codigoPostal: codigoPostalValue,
  username: usernameValue,
  aboutMe: aboutMeValue
  })
  })
  .then(response => {
  if (!response.ok) {
  throw new Error(response.statusText);
  }
  return response.text();
  })
  .then(data => {
  Swal.fire(
  'Exito!',
  'Cambios guardados exitosamente!',
  'success'
  )
  cambiosGuardados = true;
 
  // Actualizar el contenido de los elementos en la página con los valores de los campos del formulario
  const nameElement = document.querySelector('.card-profile h3');
  const locationElement = document.querySelector('.card-profile .h5.font-weight-300');
  const aboutMeElement = document.querySelector('.card-profile p');
 
  nameElement.textContent = document.querySelector('#input-first-name').value + ' ' + document.querySelector('#input-last-name').value;
  locationElement.textContent = ciudadValue + ', ' + paisValue;
  aboutMeElement.textContent = aboutMeValue;

   // Verificar si se ha seleccionado un archivo de imagen
   if (fileInput.files && fileInput.files[0]) {
    // Leer el contenido del archivo como un ArrayBuffer
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onloadend = () => {
      // Enviar una solicitud PUT a la ruta /uploadProfileImage/:userId con el contenido del archivo como cuerpo de la solicitud
      fetch('http://localhost:3000/uploadProfileImage/' + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        body: reader.result
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.text();
        })
        .then(data => {
          console.log(data);
          // Actualizar el atributo src del elemento img con la nueva imagen
          const imgElement = document.querySelector('.profile-photo-main img');
          const imgElement2 = document.querySelector('#image-profile-2');
          imgElement.src = reader.result;
          imgElement2.src = reader.result;
        })
        .catch(error => console.error(error));
    };
  }
  })
  .catch(error => Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Algo salió mal al guardar los cambios',
  }))
 });
 
const aboutMeTextarea = document.querySelector('#about-me-1');
const wordCountElement = document.querySelector('#word-count');
aboutMeTextarea.addEventListener('input', (event) => {
 // Contar el número de caracteres
 const charCount = event.target.value.length;
 // Si el número de caracteres es mayor que 250
 if (charCount > 250) {
 // Eliminar los caracteres adicionales
 event.target.value = event.target.value.slice(0, 250);
 }
 // Actualizar el contenido del elemento span con el número de caracteres
 wordCountElement.textContent = event.target.value.length + '/250';
});

const editProfileButton = document.querySelector('#edit-profile-button');
const editProfileButton2 = document.querySelector('#edit-profile-button-2');
const scrollableSection = document.querySelector('.first_operation');
const scrollableSection2 = document.querySelector('.security');
editProfileButton.addEventListener('click', (event) => {
 event.preventDefault();
 // Desplazar el contenido de la sección hacia abajo
 scrollableSection.scrollTop = 0;
 scrollableSection.scrollTop += 450;
});
editProfileButton2.addEventListener('click', (event) => {
  event.preventDefault();
  // Desplazar el contenido de la sección hacia abajo
  scrollableSection2.scrollTop = 0;
  scrollableSection2.scrollTop += 450;
 });
 
const enlaces = document.querySelectorAll('aside a');

let enlaceSeleccionado = null;

enlaces.forEach((enlace) => {
  enlace.addEventListener('click', async (event) => {
    if (!cambiosGuardados) {
      event.preventDefault();
      enlaceSeleccionado = event.currentTarget;
      Swal.fire({
        title: '¿Estás seguro que quieres salir?',
        text: "Los cambios no se guardarán",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Enviar una solicitud GET a la ruta /userInfo/:userId para obtener la información del usuario
          const response = await fetch(`http://localhost:3000/userInfo/${userId}`);
          const data = await response.json();

          // Seleccionar los elementos input dentro del contenedor .input-container
          const firstNameInput = document.querySelector('#input-first-name');
          const lastNameInput = document.querySelector('#input-last-name');
          const emailInput = document.querySelector('#input-email');

          // Dividir el nombre del usuario en un arreglo de palabras
          const nameParts = data.nombre.split(' ');

          // Validar la cantidad de palabras en el nombre del usuario
          if (nameParts.length === 2) {
            // Si el nombre tiene dos palabras, asignar la primera al nombre y la segunda al apellido
            firstNameInput.value = nameParts[0];
            lastNameInput.value = nameParts[1];
          } else if (nameParts.length === 3) {
            // Si el nombre tiene tres palabras, asignar las dos primeras al apellido y la última al nombre
            firstNameInput.value = nameParts[2];
            lastNameInput.value = nameParts[0] + ' ' + nameParts[1];
          } else if (nameParts.length === 4) {
            // Si el nombre tiene cuatro palabras, asignar las dos primeras al nombre y las dos últimas al apellido
            firstNameInput.value = nameParts[0] + ' ' + nameParts[1];
            lastNameInput.value = nameParts[2] + ' ' + nameParts[3];
          }

          emailInput.value = data.email;

          // Asignar los valores de los campos adicionales a los elementos correspondientes
          if (data.direccion) {
            document.querySelector('#input-address').value = data.direccion;
          }
          if (data.ciudad) {
            document.querySelector('#input-city').value = data.ciudad;
          }
          if (data.pais) {
            document.querySelector('#input-country').value = data.pais;
          }
          if (data.codigoPostal) {
            document.querySelector('#input-postal-code').value = data.codigoPostal;
          }
          if (data.username) {
            document.querySelector('#input-username').value = data.username;
          }
          if (data.aboutMe) {
            document.querySelector('#about-me-1').value = data.aboutMe;
          }
          if (data.profileImage)
          {
            document.querySelector('.card-profile-image img').src = data.profileImage;
          }
          
          cambiosGuardados = true;
          enlaceSeleccionado.click();
        }
      })
    } else {
      // Eliminar la clase "active" del enlace <a> actualmente activo
      document.querySelector('.sidebar a.active').classList.remove('active');
      // Agregar la clase "active" al enlace <a> que se hizo clic
      event.currentTarget.classList.add('active');

      // Verificar si se hizo clic en el enlace "Dashboard"
      if (event.currentTarget.querySelector('h4').textContent === 'Dashboard') {
        // Mostrar el elemento con la clase "middle"
        middleElement.style.display = 'block';
        firstOperationElement.style.setProperty('display', 'none', 'important');
        securityElement.style.setProperty('display', 'none', 'important');
      }

      // Verificar si se hizo clic en el enlace "Settings"
      if (event.currentTarget.querySelector('h4').textContent === 'Profile') {
        // Ocultar el elemento con la clase "middle"
        middleElement.style.display = 'none';
        firstOperationElement.style.display = 'block';
        securityElement.style.setProperty('display', 'none', 'important');
      }

      // Verificar si se hizo clic en el enlace "Security"
      if (event.currentTarget.querySelector('h4').textContent === 'Security') {
        // Ocultar el elemento con la clase "middle"
        middleElement.style.display = 'none';
        firstOperationElement.style.setProperty('display', 'none', 'important');
        securityElement.style.display = 'block';
      }

      // Verificar si se hizo clic en el enlace "Logout"
      if (event.currentTarget.querySelector('h4').textContent === 'Logout') {
        // Eliminar el parámetro userId de la URL
        const url = new URL(window.location.href);
        url.searchParams.delete('userId');
        window.history.replaceState(null, '', url);

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login/login.html';
      }
    }
  });
});

const inputs = document.querySelectorAll('input, select');
inputs.forEach((input) => {
  input.addEventListener('change', () => {
    cambiosGuardados = false;
  });
});

const textarea = document.querySelector('textarea');
textarea.addEventListener('input', () => {
 cambiosGuardados = false;
});

// Seleccionar el elemento <img> dentro del elemento <div class="card-profile-image">
const profileImage = document.querySelector('.card-profile-image img');

// Crear un elemento <input type="file"> oculto
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

// Agregar un evento de clic a la imagen para activar el cuadro de diálogo de selección de archivos
profileImage.addEventListener('click', () => {
 fileInput.click();
});

// Agregar un evento "change" al elemento <input> para detectar cuando se ha seleccionado un archivo
fileInput.addEventListener('change', (event) => {
 // Verificar si se ha seleccionado un archivo
 if (event.target.files && event.target.files[0]) {
 // Crear un objeto URL para el archivo seleccionado
 const imageUrl = URL.createObjectURL(event.target.files[0]);
 // Actualizar la imagen con el nuevo archivo
 profileImage.src = imageUrl;
 }
});

fileInput.addEventListener('change', () => {
  cambiosGuardados = false;
 });
