export const getStringDate = () => {
    const fecha = new Date(Date.now());

    const dia = String(fecha.getDate()).padStart(2, '0');
    const año = fecha.getFullYear();

    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const mes = meses[fecha.getMonth()];

    const fechaFormateada = `${dia} de ${mes} de ${año}`;

    // console.log(fechaFormateada); 

    return fechaFormateada;
}