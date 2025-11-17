import dayjs from "dayjs";

export default function gerarCalendario(
    mes = dayjs().locale('pt-br').month(),
    ano = dayjs().locale('pt-br').year()
) {
    const inicioMes = dayjs(new Date(ano, mes, 1));
    const diasNoMes = inicioMes.daysInMonth();

    const semanas = [];
    let semana = new Array(7).fill('');

    // Preenche os dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const data = dayjs(new Date(ano, mes, dia));
        const diaSemana = data.day();

        semana[diaSemana] = dia;

        // Quando chega no sábado, fecha a semana
        if (diaSemana === 6 || dia === diasNoMes) {
            semanas.push(semana);
            semana = new Array(7).fill('');
        }
    }

    return semanas;
}