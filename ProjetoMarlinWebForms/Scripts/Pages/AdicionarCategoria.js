function Validar() {
    var ok = true;
    msgErro = "";

    var VerificarCampo = function (teste, mensagem, seletor) {

        if (teste) {
            ok = false;
            msgErro += mensagem + "</br>";
            $(seletor).addClass("is-invalid").siblings(".invalid-feedback").text(mensagem).focus();
        } else {
            $(seletor).removeClass("is-invalid");
        }
        return teste;
    }

    VerificarCampo($("#txtNome").val().length == 0, "Nome é um campo obrigatório.", "#txtNome");

    return ok;
}