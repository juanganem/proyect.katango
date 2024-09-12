// Datos de los usuarios (alumnos)
const usuarios = [
    { id: 1, nombre: 'Juan', contrasena: 'usuario', turnosPorSemana: 2, turnosAsignados: { Lunes: null, Martes: null, Miércoles: null, Jueves: null, Viernes: null } },
    { id: 2, nombre: 'María', contrasena: 'usuario', turnosPorSemana: 3, turnosAsignados: { Lunes: null, Martes: null, Miércoles: null, Jueves: null, Viernes: null } },
    { id: 3, nombre: 'Pedro', contrasena: 'usuario', turnosPorSemana: 5, turnosAsignados: { Lunes: null, Martes: null, Miércoles: null, Jueves: null, Viernes: null } }
  ];
  
  // Elementos del DOM
  const loginForm = document.getElementById('login-form');
  const gimnasioApp = document.getElementById('gimnasio-app');
  const loginBtn = document.getElementById('login-btn');
  const errorMessage = document.getElementById('error-message');
  
  // Función de inicio de sesión
  loginBtn.addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const usuario = usuarios.find(user => user.nombre.toLowerCase() === username.toLowerCase());
  
    // Verificar si el usuario existe y la contraseña es correcta
    if (usuario && usuario.contrasena === password) {
      // Ocultar el formulario de inicio de sesión y mostrar la aplicación del gimnasio
      loginForm.style.display = 'none';
      gimnasioApp.style.display = 'block';
      
      // Inicializar la aplicación con el usuario autenticado
      inicializarApp(usuario);
    } else {
      // Mostrar un mensaje de error
      errorMessage.style.display = 'block';
    }
  });
  
  // Inicializar la aplicación del gimnasio
  function inicializarApp(usuario) {
    // Mostrar el nombre del usuario autenticado y deshabilitar la selección de otros
    document.getElementById('usuarioAutenticado').value = usuario.nombre;
    document.getElementById('nombreAlumno').textContent = usuario.nombre;
  
    // Lógica de actualización de turnos
    actualizarTurnos(usuario);
  }
  
  // Renderizar los turnos en la tabla (lógica previa)
  function renderTurnos(usuario, dia) {
    // Lógica para renderizar los turnos según el usuario autenticado
    // Usamos el usuario que ya ha iniciado sesión
    const turnos = usuario.turnosAsignados[dia];
    // Lógica para mostrar los turnos (disponibles o no) en la tabla
  }
  
  // Función para actualizar los turnos en la tabla
  function actualizarTurnos(usuario) {
    const diaSeleccionado = document.getElementById('dia').value;
    renderTurnos(usuario, diaSeleccionado);
  }
  