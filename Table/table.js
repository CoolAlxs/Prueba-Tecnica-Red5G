paginaActual=1;

// Función para cargar los datos desde el archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('../table.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        datos = await response.json();
        registrosPorPagina = parseInt(document.getElementById('registro-pagina').value);
        mostrarRegistros();
    } catch (error) {
        console.error('Error al cargar los datos:', error.message);
    }
}

// Función para mostrar los registros en la tabla
function mostrarRegistros() {
    const tablaCuerpo = document.getElementById('tabla-cuerpo');
    const paginaActualSpan = document.getElementById('pagina-actual');
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const registrosMostrados = datos.slice(inicio, fin);

    tablaCuerpo.innerHTML = '';

    registrosMostrados.forEach(registro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${registro.fecha}</td>
                        <td>${registro.numero_desembolsos}</td>
                        <td>${registro.tipo_identificacion}</td>
                        <td>${registro.numero_identificacion}</td>
                        <td class="black">${registro.monto}</td>`;
        tablaCuerpo.appendChild(fila);
    });

    paginaActualSpan.textContent = paginaActual;

    const totalPaginasSpan = document.getElementById('total-paginas');
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    totalPaginasSpan.textContent = totalPaginas;
}

// Función para avanzar a la página siguiente
function nextPage() {
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarRegistros();
    }
}

// Función para retroceder a la página anterior
function previousPage() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarRegistros();
    }
}

// Función para cambiar la cantidad de registros por página
function cambiarRegistros() {
    registrosPorPagina = parseInt(document.getElementById('registro-pagina').value);
    paginaActual = 1;
    mostrarRegistros();
}

// Evento que se ejecuta cuando se cambia la cantidad de registros por página
document.getElementById('registro-pagina').addEventListener('change', cambiarRegistros);

// Cargar los datos al cargar la página
window.onload = cargarDatos;


function buscarRegistros() {
    const tipoDocumento = document.getElementById('tipo-documento').value;
    const numeroDocumento = document.getElementById('numero-documento').value;
    const numeroDesembolso = document.getElementById('numero-desembolso').value;
    const fechaDesde = document.getElementById('fecha-desde').value;
    const fechaHasta = document.getElementById('fecha-hasta').value;

    // Filtra los registros según los criterios de búsqueda
    const resultados = datos.filter(registro => {
        return (tipoDocumento === '' || registro.tipo_identificacion === tipoDocumento) &&
            (numeroDocumento === '' || registro.numero_identificacion.includes(numeroDocumento)) &&
            (numeroDesembolso === '' || registro.numero_desembolsos.toString() === numeroDesembolso) &&
            (fechaDesde === '' || registro.fecha >= fechaDesde) &&
            (fechaHasta === '' || registro.fecha <= fechaHasta);
    });

    // Muestra los resultados en la tabla
    mostrarResultados(resultados);
}

// Función para mostrar los resultados de búsqueda en la tabla
function mostrarResultados(resultados) {
    const tablaCuerpo = document.getElementById('tabla-cuerpo');
    tablaCuerpo.innerHTML = '';

    resultados.forEach(registro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td>${registro.fecha}</td>
                        <td>${registro.numero_desembolsos}</td>
                        <td>${registro.tipo_identificacion}</td>
                        <td>${registro.numero_identificacion}</td>
                        <td>${registro.monto}</td>`;
        tablaCuerpo.appendChild(fila);
    });

    const paginaActualSpan = document.getElementById('pagina-actual');
    paginaActualSpan.textContent = 1; // Reinicia la página a 1 al realizar la búsqueda
    const totalPaginasSpan = document.getElementById('total-paginas');
    totalPaginasSpan.textContent = 1; // También puedes ajustar el total de páginas según los resultados
}