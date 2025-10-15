let listaEmpleados = document.getElementById("listaEmpleados");
 
function obtenerEmpleados() {
 
      fetch('Datos/Empleados.json')
        .then(response => response.json())
        .then(data => {
            mostrarEmpleados(data);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}
 
function mostrarEmpleados(empleados) {
 
    listaEmpleados.innerHTML = "";
   
    empleados.forEach(empleado => {
 
        listaEmpleados.innerHTML += `
                    <div class="col-12 col-md-3 py-3 text-center">
                        <img src="${empleado.foto}" alt="Foto de empleado" class="img-fluid rounded-circle shadow border-white" style="max-height: 150px;">
                    </div>
                    <div class="col-12 col-md-3 py-3 d-flex align-items-center text-center">
                        ${empleado.nombre}
                    </div>
                    <div class="col-12 col-md-3 py-3 d-flex align-items-center text-center">
                        Edad: ${empleado.edad} años
                    </div>
                    <div class="col-12 col-md-3 py-3 d-flex align-items-center text-center">
                        Sueldo: $${empleado.sueldo}
                    </div>
            `;
    });
}
 
obtenerEmpleados();