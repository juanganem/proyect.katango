// Datos de los usuarios (alumnos) con turnos predefinidos para cada día de la semana
const usuarios = [
  { 
    id: 1, 
    nombre: 'Juan', 
    contrasena: 'usuario', 
    turnosPorSemana: 2, 
    turnosAsignados: { 
      Lunes: [null, null, null, null, null], 
      Martes: [null, null, null, null, null], 
      Miércoles: [null, null, null, null, null], 
      Jueves: [null, null, null, null, null], 
      Viernes: [null, null, null, null, null] 
    } 
  },
  { 
    id: 2, 
    nombre: 'María', 
    contrasena: 'usuario', 
    turnosPorSemana: 3, 
    turnosAsignados: { 
      Lunes: [null, null, null, null, null], 
      Martes: [null, null, null, null, null], 
      Miércoles: [null, null, null, null, null], 
      Jueves: [null, null, null, null, null], 
      Viernes: [null, null, null, null, null] 
    } 
  },
  { 
    id: 3, 
    nombre: 'Pedro', 
    contrasena: 'usuario', 
    turnosPorSemana: 5, 
    turnosAsignados: { 
      Lunes: [null, null, null, null, null], 
      Martes: [null, null, null, null, null], 
      Miércoles: [null, null, null, null, null], 
      Jueves: [null, null, null, null, null], 
      Viernes: [null, null, null, null, null] 
    } 
  }
];

// Definir las horas de los turnos (09:00 - 21:00)
const horasTurnos = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

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
  // Mostrar el nombre del usuario autenticado
  document.getElementById('usuarioAutenticado').value = usuario.nombre;
  document.getElementById('nombreAlumno').textContent = usuario.nombre;

  // Actualizar los turnos disponibles para el día seleccionado
  actualizarTurnos(usuario);
}

// Función para actualizar los turnos
function actualizarTurnos(usuario) {
  const diaSeleccionado = document.getElementById('dia').value;
  renderTurnos(usuario, diaSeleccionado);
}

// Renderizar los turnos en la tabla
function renderTurnos(usuario, dia) {
  const turnosBody = document.getElementById('turnos');
  turnosBody.innerHTML = ''; // Limpiar la tabla

  // Verificar si el usuario ya tiene un turno ocupado ese día
  const tieneTurno = usuario.turnosAsignados[dia].some(turno => turno !== null);

  horasTurnos.forEach((hora, index) => {
    const turnoOcupado = usuario.turnosAsignados[dia][index];

    const row = document.createElement('tr');
    
    // Columna de la hora
    const horaCell = document.createElement('td');
    horaCell.textContent = hora;
    row.appendChild(horaCell);

    // Columna del estado del turno (Disponible/Ocupado)
    const estadoCell = document.createElement('td');
    if (turnoOcupado) {
      estadoCell.textContent = 'Ocupado';
      estadoCell.classList.add('occupied');
    } else {
      estadoCell.textContent = 'Disponible';
      estadoCell.classList.add('available');
    }
    row.appendChild(estadoCell);

    // Columna de acción (Ocupar/Liberar)
    const accionCell = document.createElement('td');
    const accionBtn = document.createElement('button');
    
    if (turnoOcupado) {
      accionBtn.textContent = 'Liberar';
      accionBtn.classList.add('liberar');
      accionBtn.addEventListener('click', function() {
        liberarTurno(usuario, dia, index);
      });
    } else {
      accionBtn.textContent = 'Ocupar';
      accionBtn.classList.add('ocupar');
      accionBtn.disabled = tieneTurno; // Deshabilitar si ya tiene un turno
      if (!tieneTurno) {
        accionBtn.addEventListener('click', function() {
          ocuparTurno(usuario, dia, index);
        });
      }
    }
    accionCell.appendChild(accionBtn);
    row.appendChild(accionCell);

    // Añadir la fila a la tabla
    turnosBody.appendChild(row);
  });
}

// Función para ocupar un turno
function ocuparTurno(usuario, dia, index) {
  // Verificar si el usuario ya tiene un turno ocupado ese día
  const tieneTurno = usuario.turnosAsignados[dia].some(turno => turno !== null);
  
  if (!tieneTurno) {
    // Si no tiene turno asignado, ocupar el turno
    usuario.turnosAsignados[dia][index] = true; // Ocupar el turno
    actualizarTurnos(usuario); // Actualizar la tabla
  } else {
    // Mostrar un mensaje de error si ya tiene un turno
    alert("Ya has ocupado un turno para este día. Solo puedes reservar un turno por día.");
  }
}

// Función para liberar un turno
function liberarTurno(usuario, dia, index) {
  if (usuario.turnosAsignados[dia][index]) {
    usuario.turnosAsignados[dia][index] = null; // Liberar el turno
    actualizarTurnos(usuario); // Actualizar la tabla
  }
}

// Evento para cambiar los turnos cuando el usuario selecciona otro día
document.getElementById('dia').addEventListener('change', function() {
  const usuario = usuarios.find(user => user.nombre.toLowerCase() === document.getElementById('usuarioAutenticado').value.toLowerCase());
  actualizarTurnos(usuario);
});
