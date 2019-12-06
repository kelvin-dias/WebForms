//Validador de latitude e longitude de coordenada no formato Geodésico decimal, adequado ao formato(decimal(18,14)) salvo atualmente(12/12/2018) no banco de dados
var Geodesico = {
    RegEx: /(^((\-\d{1,4})|(\d{1,4})))\.\d{1,14}?$/,
    IsValid: (valor) => Geodesico.RegEx.test(valor)
}