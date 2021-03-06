import { message } from "antd";
import { AxiosInstance } from "axios";
import moment from 'moment';

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function formatMoney(
  amount: string,
  decimalCount = 2,
  decimal = ",",
  thousands = ".",
  symbol = "Bs"
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = parseFloat(amount) < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(parseFloat(amount) - parseFloat(i))
            .toFixed(decimalCount)
            .slice(2)
        : "") +
      ` ${symbol}`
    );
  } catch (e) {
    console.log(e);
  }
}

export function moneyFormatter(amount: string, symbol="Bs. ") {
  return formatMoney(amount, 2, ",", ".", symbol);
}

export function downloadFile(
  axios: AxiosInstance,
  path: string,
  filename: string,
  extension: string
) {
  axios
    .get(path, {
      responseType: "blob",
    })
    .then((file) => {
      const url = window.URL.createObjectURL(new Blob([file.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${filename}.${extension}`);
      document.body.appendChild(link);
      link.click();
    })
    .catch((e) => message.error("No se pudo descargar el archivo"));
}

export function downloadFileFromLink(
  url: string,
  filename: string,
  extension: string
) {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.${extension}`);
  document.body.appendChild(link);
  link.click();
}

export const monthsMarks = {
  1: "Ene",
  2: "Feb",
  3: "Mar",
  4: "Abr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dic",
}

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

export function getBeginAndEndOfMonths(dateRange: [number, number]) {
  const year = moment().format('Y');
  const initMonth = dateRange[0] > 9 ? dateRange[0] : `0${dateRange[0]}`;
  const endMonth =  dateRange[1] > 9 ? dateRange[1] : `0${dateRange[1]}`;
  const begin = `01-${initMonth}-${year}`;
  const monthEnd = `${year}-${endMonth}-01`;
  console.log(begin, monthEnd);
  const end = moment(monthEnd).clone().endOf('month').format('DD-MM-YYYY'); 
  console.log([begin, end]);
  return [begin, end];
}