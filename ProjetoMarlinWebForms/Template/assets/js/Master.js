/*
    Métodos assíncronos:
    ObterLocalizacao;
    GetSession;
    ObterQuantidadeOcorrenciasPR02;
    ObterAlerta;
    ObterQuantidadeAlerta;
*/

let appMaster;
let attMaster = {};
class MasterPainelControle {
    constructor() {
        this.ObterLocalizacao();        
        this.ObterTelemetria();        
        this.SetDataServidor();
        this.GetSession();
        this.ObterQuantidadeOcorrenciasPR02(); 
        this.ObterQuantidadeAlerta();
        setTimeout(()=>{this.ObterAlerta()},1000);
        this.AtualizarDados();  
        this.Eventos();
    }
    Eventos(){
        
        $("body").on("click", ".btnLinksUteis", (e) => {
            this.MontarLinksTelefonesUteis();
        });

        $("body").on("click", ".btnHistoricoAlerta", (e) => {
            this.MontarHistoricoAtividade();
        });

        $("body").on("click", ".btnInterdicao", (e) => {
            this.MontarInterdicao();
        }); 

        $("body").on("click", ".btnOcEncerradaPR02", (e) => {
            this.MontarOcEncerradasPR02();
        });
        
        $("body").on("click", ".btnPainelAlerta", (e) => {
            this.MontarPainelAlerta();
        }); 
    }
    /*--- MONTAR ABAS ---*/    
    SideBar(abrir){
        if(abrir){
            if(!$("#page-container").hasClass("side-overlay-o")) 
                $("#page-container").addClass("side-overlay-o");
                //$("#side-overlay").attr('style', 'width:620px !important');
                  
        }
        else{
            if($("#page-container").hasClass("side-overlay-o")) 
                $("#page-container").removeClass("side-overlay-o");
                
        }
    }
    /*---  MONTAR ABAS EXTRAS ---*/
    MontarLinksTelefonesUteis() {        
        $("#side-overlay .content-header-item a").html("Links e Telefones Úteis");
        $("#side-overlay .content-header-item span").empty();
        this.SideBar(true);
        //OBTENDO OS DADOS NO BANCO         
        $.ajax({
            assincrono: false,
            method: 'POST',
            url: 'WebMethodsMaster.aspx/ObterLinksTelefonesUteis',
            contentType: 'application/json',
            dataType: 'json',            
            success: response => {
                var retorno = JSON.parse(response.d);
                if (retorno.Error === undefined) {
                     if (retorno != "null"){ 
                        this.MasterLinksTelefonesUteis = retorno;
                        $("#menu-direito").html(`
                                <div class="container ">
                                   <div class="row gutters-tiny">
                                        <div class="col">
                                            <div class="form-group">
                                                 <div class="input-group">                                                    
                                                    <input type="text"" class="form-control form-control-sm" id="txtFiltro" autofocus placeholder="Digite alguma coisa para filtrar" />
                                                    <span class="input-group-btn">
                                                        <button type="button" class="btn btn-outline-secondary btn-sm">
                                                            <i class="fa fa-search"></i>
                                                        </button>
                                                    </span>
                                                </div> 
                                                <div class="invalid-feedback animated fadeInDown">N/A</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gutters-tiny bg-gray-lighter mb-10 p-5" style="height: 80vh; overflow-y: scroll; overflow-x: hidden;">
                                        <div class="col-md-12">
                                            ${  this.MasterLinksTelefonesUteis.map(x => {
                                                return `
                                                <div class="block block-themed block-mode-loading-refresh block-mode-hidden rounded item-link-util" style="border: 1px solid #8e8e8e;" data-id="${ x.Id}">
                                                    <div class="block-header bg-primary p-5 px-10 pointer" data-toggle="block-option" data-action="content_toggle">
                                                        <h3 class="block-title">
                                                            ${
                                                                !x.Link
                                                                    ? `<span class="bagde badge-info badge-pill mr-5 float-right" > <i class="fa fa-phone mr-5"></i> ${x.Telefone || ""} </span> `
                                                                    : `<a class="bagde badge-success badge-pill mr-5 float-right"  href="${x.Link || ""}" target="_blank"> <i class="fa fa-globe mr-5"></i>  abrir link </a> `
                                                                }
                                                            ${ x.Identificacao || ""}
                                                        </h3>
                                                        <div class="block-options">
                                                            <button type="button" class="btn-block-option" data-toggle="tooltip" data-original-title="Mais Detalhes">
                                                                <i class="si si-eye"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="block-content">
                                                        <div class="row items-push gutters-tiny">
                                                            <div class="col-12 text-center text-sm-left mb-5">
                                                                <div class="font-size-sm font-w600 text-uppercase text-muted"> Observação </div>
                                                                <div class="font-size-h5 font-w600"> <textarea class="form-control" disabled style="min-height:217px;">Telefone : ${ x.Telefone || ""}\nLink : ${x.Link || ""}\n${x.Observacao || ""} </textarea> </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> `}).join("")
                                            }
                                        </div>
                                    </div>
                                </div>              
                        `);
                        $("#txtFiltro").on("keyup", (e) => {
                            let text = $(e.currentTarget).val().toLowerCase().replace(/\ /g, "");
                            if (text.length > 1) {
                                let vet = Array.from(this.MasterLinksTelefonesUteis.filter(x => `${x.Identificacao}|${x.Telefone}|${x.Observacao}`.toLowerCase().replace(/\ /g, "").includes(text)), x => x.Id);
                                $(".item-link-util").each((i, ep) => {
                                    $(ep)[!vet.includes(parseInt($(ep).data("id"))) ? "hide" : "show"]();
                                });
                            } else {
                                $(".item-link-util").show();
                            }
                        });

                        $("#txtFiltro").focus();
                    }
                    else{ this.MasterLinksTelefonesUteis = [];}

                } else {
                    ShowMessage(4, retorno.Error);
                }               
            },
            error: error => {
                ShowMessage(4, error.Message);
            }
        });   
    }
    MontarHistoricoAtividade() {
        $("#side-overlay .content-header-item a").html("Histórico de Atividade");
        $("#side-overlay .content-header-item span").empty();

        let text = `<div class="timeline-item">
                        <div class="animated-background">
                            <div class="background-masker header-top"></div>
                            <div class="background-masker header-left"></div>
                            <div class="background-masker header-right"></div>
                            <div class="background-masker header-bottom"></div>
                            <div class="background-masker subheader-left"></div>
                            <div class="background-masker subheader-right"></div>
                            <div class="background-masker subheader-bottom"></div>                        
                        </div>
                    </div>`;
        for (let i = 1; i <= 3; i++) 
            text +=text;            

        $("#menu-direito").html(`
            <div class="container ">
                <div class="row gutters-tiny">
                    <div class="col">
                        <div class="form-group">
                                <div class="input-group">                                                    
                                <input type="text" class="form-control form-control-sm badge-border-focus" id="txtFiltro" autofocus placeholder="Digite alguma coisa para filtrar" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-outline-secondary btn-sm">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div> 
                            <div class="invalid-feedback animated fadeInDown">N/A</div>
                        </div>
                    </div>
                </div>
                <div class="row gutters-tiny mb-10 p-5 scroll-historico-atividade" >
                    <div class="col-md-12">
                        <ul class="timeline" id="timeline-html"> 
                        ${text}    
                        </ul>
                    </div>
                </div>
            </div>              
        `);

        $("#txtFiltro").on("keyup", (e) => {
            let text = $(e.currentTarget).val().toLowerCase().replace(/\ /g, "");
            if (text.length > 1) {
                let vet = Array.from(this.MasterHistoricoAtividadeUsuario.filter(x => `${"@"+x.NumeroOcorrencia}|${x.Data}|${x.Usuario}|${x.AtividadeUsuario}}`.toLowerCase().replace(/\ /g, "").includes(text)), x => x.Id);
                $(".item-link-util").each((i, ep) => {
                    $(ep)[!vet.includes(parseInt($(ep).data("id"))) ? "hide" : "show"]();
                });
            } else {
                $(".item-link-util").show();
            }
        });
        $("#txtFiltro").focus();
        
        this.SideBar(true);
        //OBTENDO OS DADOS NO BANCO 
        $.ajax({
            assincrono: false,
            method: 'POST',
            url: 'WebMethodsMaster.aspx/ObterHistoricoAlerta',
            contentType: 'application/json',
            dataType: 'json',            
            success: response => {
                var retorno = JSON.parse(response.d);
                if (retorno.Error === undefined) {
                     if (retorno != "null")
                        this.MasterHistoricoAtividadeUsuario = retorno;   
                    else 
                        this.MasterHistoricoAtividadeUsuario = [];
                                        
                    $('#timeline-html').html(`
                        ${this.MasterHistoricoAtividadeUsuario.map(x => {
                            return `<li class="item-link-util" data-id="${x.Id}">
                                <div class="li-timeline animated fadeIn">
                                    <div class="pt-5 pb-5">                    
                                        <span class="default bagde badge-info badge-pill mr-5 float-left" style="min-width: 50px;" title="Número da Ocorrência"> <i class="fa fa-exclamation-circle mr-5"></i> ${x.NumeroOcorrencia || ""} </span>
                                        <span class="default bagde badge-secondary badge-pill mr-5 float-right" style="min-width: 150px;"> <i class="fa fa-clock mr-5"></i> ${x.Data || ""} </span>
                                        <span class="default bagde badge-secondary badge-pill mr-5 float-right" title="Usuário"> <i class="fa fa-user mr-5"></i>${x.Usuario.split(" ").slice(0, 1).join("") + " " + x.Usuario.split(" ").slice(-1).join("") } </span> 
                                    </div>
                                    <div class="pt-5 pb-5">
                                        <div class="pt-5" style="min-width:300px;display: flex;">${ x.AtividadeUsuario || ""}</div>
                                    </div>
                                </div>
                            </li>`                                              
                        }).join("")}`);   

                } else {
                    ShowMessage(4, retorno.Error);
                }               
            },
            error: error => {
                ShowMessage(4, error.Message);
            }
        });
        
    }
    MontarInterdicao() {
        $("#side-overlay .content-header-item a").html("Interdições");
        $("#side-overlay .content-header-item span").empty();
        this.SideBar(true);
        //OBTENDO OS DADOS NO BANCO 
        $.ajax({
            assincrono: false,
            method: 'POST',
            url: 'WebMethodsMaster.aspx/ObterInterditadas',
            contentType: 'application/json',
            dataType: 'json',            
            success: response => {
                var retorno = JSON.parse(response.d);
                if (retorno.Error === undefined) {
                     if (retorno != "null"){ 
                        this.MasterCongestionamentos = retorno;                        
                    }
                    else{ 
                        this.MasterCongestionamentos = [];
                    }
                    $("#menu-direito").html(`
                            <div class="container ">
                               <div class="row gutters-tiny">
                                    <div class="col">
                                        <div class="form-group">
                                             <div class="input-group">                                                    
                                                <input type="text" class="form-control form-control-sm" id="txtFiltro" autofocus placeholder="Digite alguma coisa para filtrar" />
                                                <span class="input-group-btn">
                                                    <button type="button" class="btn btn-outline-secondary btn-sm">
                                                        <i class="fa fa-search"></i>
                                                    </button>
                                                </span>
                                            </div> 
                                            <div class="invalid-feedback animated fadeInDown">N/A</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row gutters-tiny bg-gray-lighter mb-10 p-5" style="height: 80vh; overflow-y: scroll; overflow-x: hidden;">
                                    <div class="col-md-12">
                                        ${  this.MasterCongestionamentos.map(x => {
                                            return `
                                            <div class="block block-themed block-mode-loading-refresh block-mode-hidden rounded item-link-util" style="border: 1px solid #8e8e8e;" data-id="${x.Id}">
                                                <div class="block-header bg-primary p-5 px-10 transfer pointer" data-toggle="block-option" data-action="content_toggle">
                                                    <h3 class="block-title">
                                                        ${x.Motivo == "OBRA" 
                                                            ?   '<i class="fas fa-wrench"></i> ' 
                                                            :   (x.Motivo == "CONGESTIONAMENTO" ? "<i class='fas fa-hand-paper'></i> " : "")}
                                                        ${ x.Nome || ""} - ${x.Localizacao || ""}
                                                </h3>
                                                <div class="block-options">
                                                    <button type="button" class="btn-block-option" data-toggle="tooltip" data-original-title="Mais Detalhes">
                                                        <i class="si si-eye"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="block-content">
                                                <div class="row items-push gutters-tiny">
                                                    <div class="col-12 text-center text-sm-left mb-5">
                                                        <div class="font-size-sm font-w600 text-uppercase text-muted"> Observação </div>
                                                        <div class="font-size-h5 font-w600">
                                                            <button type="button" class="btn btn-sm btn-circle btn-alt-secondary mr-5 mb-5 copy" style="position: absolute; top: 25px; right: 5px;" onclick="copyToClipboard('#txtObservacao${x.Id}')" title="Copiar"><i class="far fa-clone"></i></button>
                                                            <textarea class="form-control txtObservacao" disabled style="min-height:150px; resize:none;" id="txtObservacao${x.Id}"> Nome: ${x.Nome || ""} \nLocalização: \n\t${x.Localizacao || ""} \nData: ${x.Data || ""} \nObservação: \n\t${x.Observacao || ""}
                                                            </textarea>
                                                                                                                        
                                                            <label class="custom-control custom-checkbox m-0">
                                                                <input type="checkbox" class="custom-control-input" ${ x.BlPareSiga ? "checked" : ""} disabled>
                                                                <span class="custom-control-indicator" style="top: 8px;"></span>
                                                            </label>
                                                            <label class="font-size-sm font-w600 text-uppercase text-muted"> Operação Pare e Siga </label>
                                                            
                                                            <table class="table table-responsive table-striped table-bordered animated fadeIn table-editable mt-20" id="tbl-congestionamento-0">
                                                                        <thead>
                                                                            <tr class="bg-primary text-white">
                                                                                <th class="text-center" colspan="12" style="font-size:12px;"> FAIXAS INTERDITADAS </th>
                                                                            </tr>
                                                                            <tr class="bg-primary text-white">
                                                                                <th class="text-center" style="font-size:12px;"> C </th>
                                                                                <th class="text-center" style="font-size:12px;"> 1 </th>
                                                                                <th class="text-center" style="font-size:12px;"> 2 </th>
                                                                                <th class="text-center" style="font-size:12px;"> 3 </th>
                                                                                <th class="text-center" style="font-size:12px;"> 4 </th>
                                                                                <th class="text-center" style="font-size:12px;"> 5 </th>
                                                                                <th class="text-center" style="font-size:12px;"> 6 </th>
                                                                                <th class="text-center d-none" style="font-size:12px;"> 7 </th>
                                                                                <th class="text-center d-none" style="font-size:12px;"> 8 </th>
                                                                                <th class="text-center d-none" style="font-size:12px;"> 9 </th>
                                                                                <th class="text-center d-none" style="font-size:12px;"> 10 </th>
                                                                                <th class="text-center" style="font-size:12px;"> A </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa1" ${ x.Canteiro ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa1" ${ x.Faixa1 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa2" ${ x.Faixa2 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa3" ${ x.Faixa3 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa4" ${ x.Faixa4 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa5" ${ x.Faixa5 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa6" ${ x.Faixa6 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center d-none">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa7" ${ x.Faixa7 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center d-none">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa8" ${ x.Faixa8 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center d-none">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa9" ${ x.Faixa9 ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center d-none">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa10" ${ x.Faixa10 ? "checked" : ""}" disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                            <td class="text-center">
                                                                                <label class="custom-control custom-checkbox m-0">
                                                                                    <input type="checkbox" class="custom-control-input chkFaixa1" ${ x.Acostamento ? "checked" : ""} disabled>
                                                                                    <span class="custom-control-indicator"></span>
                                                                                </label>
                                                                            </td>
                                                                        </tbody>
                                                                    </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> `}).join("")
                                        }
                                        </div>
                                    </div>
                                </div>              
                            `);

                    $("#txtFiltro").on("keyup", (e) => {
                        let text = $(e.currentTarget).val().toLowerCase().replace(/\ /g, "");
                        if (text.length > 1) {
                            let vet = Array.from(this.MasterCongestionamentos.filter(x => `${x.Nome}|${x.Localizacao}|${x.Data}|${x.Observacao}`.toLowerCase().replace(/\ /g, "").includes(text)), x => x.Id);
                            $(".item-link-util").each((i, ep) => {
                                $(ep)[!vet.includes(parseInt($(ep).data("id"))) ? "hide" : "show"]();
                            });
                        } else {
                            $(".item-link-util").show();
                        }
                    });                   

                    $("#txtFiltro").focus();                    

                } else {
                    ShowMessage(4, retorno.Error);
                }               
            },
            error: error => {
                ShowMessage(4, error.Message);
            }
        });        
    } 
    MontarOcEncerradasPR02() {
        $("#side-overlay .content-header-item a").html("Controle de Ocorrências não localizadas - <b>PR02</b>");
        $("#side-overlay .content-header-item span").empty();
        this.SideBar(true);
        //OBTENDO OS DADOS NO BANCO 
        $.ajax({
            assincrono: false,
            method: 'POST',
            url: 'WebMethodsMaster.aspx/ObterOcEncerradasPR02',
            contentType: 'application/json',
            dataType: 'json',            
            success: response => {
                var retorno = JSON.parse(response.d);
                if (retorno.Error === undefined) {
                     if (retorno != "null"){ 
                        this.OcEncerradasPR02 = retorno;                        
                    }
                    else{ 
                        this.OcEncerradasPR02 = [];
                    }
                    $("#menu-direito").html(`
                            <div class="container ">                               
                                <div class="row gutters-tiny bg-gray-lighter mb-10 p-5" style="height: 85vh; overflow-y: scroll; overflow-x: hidden;">
                                    <div class="col-md-12">
                                        ${  this.OcEncerradasPR02.map(x => {
                                            return `
                                            <div class="block block-themed block-mode-loading-refresh block-mode-hidden rounded item-link-util" style="border: 0.5px solid #343a40;" data-id="${ x.CD_OCORRENCIA}" >
                                                <div class="block-header bg-default-dark p-5 px-10 pointer" data-toggle="block-option" data-action="content_toggle">
                                                    <h3 class="block-title">
                                                        <p class="m-0"> <small> Aberto: ${x.ABERTURA} / Encerrado: ${x.ENCERRAMENTO} </small> </p>
                                                        <span class="bagde badge-info badge-pill mr-5"> ${x.NUMERO_OCORRENCIA} </span>${x.TIPO_OCORRENCIA || ""}
                                                    </h3>
                                                    <div class="block-options">
                                                        <button type="button" class="btn-block-option" data-toggle="tooltip" data-original-title="Mais Detalhes" style="font-size: 20px;">
                                                            <i class="si si-eye"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="block-content">
                                                    <div class="row items-push gutters-tiny">
                                                        <div class="col-12 text-center text-sm-left mb-5">
                                                            <button type="button" class=" btn btn-sm mr-5 btn-outline-success float-right btnNovaOcPR02" data-id="${x.CD_OCORRENCIA}"> <i class="fa fa-plus"></i> Nova Ocorrência </button>                                                            
                                                            <button type="button" class=" btn btn-sm mr-5 btn-outline-danger btnCalcelarOcPR02" data-id="${x.CD_OCORRENCIA}"> <i class="fa fa-times"></i> Cancelar </button>
                                                        </div>

                                                        <div class="col-6 text-center text-sm-left mb-5">
                                                            <div class="font-size-sm font-w600 text-uppercase text-muted"> Localização</div>
                                                            <div class="font-size-h5 font-w600"> ${x.LOCALIZACAO || "-"} </div>
                                                        </div>
                                                        <div class="col-6 text-center text-sm-left mb-5">
                                                            <div class="font-size-sm font-w600 text-uppercase text-muted"> Origem </div>
                                                            <div class="font-size-h5 font-w600"> ${ x.ORIGEM_OCORRENCIA || "-"} </div>
                                                        </div>                                                       
                                                        
                                                        <div class="col-3 text-center text-sm-left mb-5">
                                                            <div class="font-size-sm font-w600 text-uppercase text-muted"> Contato </div>
                                                            <div class="font-size-h5 font-w600"> ${x.CONTATO || "-"} </div>
                                                        </div>
                                                        <div class="col-3 text-center text-sm-left mb-5">
                                                            <div class="font-size-sm font-w600 text-uppercase text-muted"> Telefone </div>
                                                            <div class="font-size-h5 font-w600"> ${x.TELEFONE || "-"} </div>
                                                        </div>

                                                        <div class="col-6 text-center text-sm-left mb-5">
                                                            <div class="font-size-sm font-w600 text-uppercase text-muted"> Recursos Enviados </div>
                                                            <div class="font-size-h5 font-w600"> ${x.RECURSOS_ACIONADOS || "-"} </div>
                                                        </div>                                                                                                            
                                                        
                                                        <div class="col-12 text-center text-sm-left mb-5">
                                                            <div class="font-size-sm font-w600 text-uppercase text-muted"> Observação </div>
                                                            <div class="font-size-h5 font-w600"> <textarea class="form-control" disabled style="min-height:100px;"> ${ x.OBSERVACAO || ""} </textarea> </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>`}).join("")
                                       }
                                    </div>
                                </div>
                                </div>              
                            `);                                      

                } else {
                    ShowMessage(4, retorno.Error);
                }               
            },
            error: error => {
                ShowMessage(4, error.Message);
            }
        });

        $("body").on("click", ".btnCalcelarOcPR02", (e) => {
            let idOcorrencia = $(e.currentTarget).data("id");
            swal({
                title: 'Deseja cancelar a ocorrência?',
                text: '',
                type: 'warning',
                showCancelButton: !0,
                confirmButtonColor: '#d26a5c',
                confirmButtonText: 'Sim, Cancelar',
                cancelButtonText: "Não",
                html: !1,
                preConfirm: function () {
                    return new Promise(function (resolve) {
                            appMaster.EncerrarOcorrenciaPR02(idOcorrencia);
                            resolve();
                        });
                    }           
            }).then(
                function (result) { },
                function (dismiss) { }
            );                      
        });

        $("body").on("click", ".btnNovaOcPR02", (e) => {
            let idOcorrencia = $(e.currentTarget).data("id");
            this.MontarGerarOcEncerradasPR02(idOcorrencia);
        });  
    }
    MontarGerarOcEncerradasPR02(idOcorrencia) {
        $("#side-overlay .content-header-item a").html("Controle de Ocorrências não localizadas - <b>PR02</b>");
        $("#side-overlay .content-header-item span").empty();
        this.SideBar(true);
        $("#menu-direito").html(`
            <div class="container">
                <div class="row gutters-tiny">
                    <div class="col">
                        <div class="form-group">
                            <label class="badge badge-primary">Rodovia</label>
                            <select class="form-control form-control-sm ddlRodovias" id="ddlRodoviaMaster">  
                                ${Array.from(attMaster.Rodovia, x => `<option value="${x.Id}"> ${x.Nome}</option>`).join("")} 
                            </select>
                            <div class="invalid-feedback animated fadeInDown">N/A</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label class="badge badge-primary"> Km/Metro  <span class="text-danger">*</span></label>
                            <input class="form-control form-control-sm txtKms" id="txtKmMaster" type="text" />                            
                            <div class="invalid-feedback animated fadeInDown">N/A</div>
                        </div>
                    </div>                
                    <div class="col">
                        <div class="form-group">
                            <label class="badge badge-primary"> Sentido <span class="text-danger">*</span></label>
                            <select class="form-control form-control-sm ddlSentidos"  id="ddlSentidoMaster">  
                                <option value="">Selecione</option>                             
                            </select>
                            <div class="invalid-feedback animated fadeInDown">N/A</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label class="badge badge-primary">Local <span class="text-danger">*</span></label>
                            <select class="form-control form-control-sm" id="ddlTipoPistaMaster"> 
                                <option value="">Selecione</option>
                                ${Array.from(attMaster.Pista, x => `<option value="${x.Id}"> ${x.Nome}</option>`).join("")}
                            </select>
                            <div class="invalid-feedback animated fadeInDown">N/A</div>
                        </div>
                    </div> 
                </div>
                <div class="row gutters-tiny">
                    <div class="col">
                        <button type="button" class="btn btn-rounded btn-outline-secondary min-width-125 float-left mb-10 ml-15" id="btn-fechar-pr02" ><i class="fa fa-arrow-left"></i> Voltar </button>                        
                        <button type="button" class="btn btn-rounded btn-outline-success min-width-125 float-right mb-10 ml-15" id="btn-salvar-oc-pr02" data-id="${idOcorrencia}"> <i class="fa fa-check"></i> Salvar </button>                    
                    </div>
                </div>
            </div>      
        `);
        $("#ddlRodoviaMaster").on("change",(e)=>{
            var r = attMaster.Rodovia.find(x=> x.Id == parseInt($("#ddlRodoviaMaster").val()));
            $("#ddlSentidoMaster").html(`<option value="">Selecione</option>`+ Array.from(attMaster.Sentido.filter(x => x.CdRodovia == parseInt($("#ddlRodoviaMaster").val())), x=> `<option value="${x.Id}">${x.Nome}</option>`).join("")  );

            $("#txtKmMaster").trigger("change");
        });

        $("#ddlRodoviaMaster").trigger("change");
        
        $("#btn-fechar-pr02").on("click", (e) => {
            appMaster.SideBar();
            setTimeout(() => {$(".btnOcEncerradaPR02").trigger("click");},400)
        });

        $("#btn-salvar-oc-pr02").on("click", (e) => {
            if (this.Validar("ocorrencia-pr02",!1)) {
	    	$(e.currentTarget).prop("disabled", !0);
            	let idOcorrenciaPR02 = $(e.currentTarget).data("id");
                let objeto = {
                    Id: idOcorrenciaPR02
                    , CdRodovia: $("#ddlRodoviaMaster").val()
                    , CdPista: $("#ddlTipoPistaMaster").val()
                    , CdSentido: $("#ddlSentidoMaster").val()
                    , KmMetro: $("#txtKmMaster").val().replace("+",".")                    
                };
                ExecutarAjax({
                    assincrono: false,
                    url: "WebMethodsMaster.aspx",
                    metodo: "SalvarOcorrenciaPR02",
                    parametro: JSON.stringify({
                        obj: JSON.stringify(objeto)
                    }),
                    fnSucesso: (retorno) => {
                        if (retorno.includes("[Erro]"))
                            ShowMessage(2, retorno.replace("[Erro]", ""));
                        else {
                            app.SideBar();                          
                            ShowMessage(1, "Salvo com sucesso");                            
                        }
                    },
                    fnErro: (ex) => {
                        ShowMessage(4, ex.Message);
                    },
                });
            }
            $("#btn-salvar-oc-dano").removeClass("btn-outline-success").addClass("btn-outline-secondary");
        
        });
    }
    MontarPainelAlerta() {
        $("#side-overlay .content-header-item a").html("Alertas");
        $("#side-overlay .content-header-item span").empty();               

        $("#menu-direito").html(`
            <div class="container ">                
                <div class="row gutters-tiny mb-10 p-5 scroll-historico-atividade" >
                    <div class="col-md-12">
                        <ul class="timeline" id="timeline-html">                            
                        </ul>
                    </div>
                </div>
            </div>              
        `);        
        
        this.SideBar(true);
        //OBTENDO OS DADOS NO BANCO 
        $.ajax({
            assincrono: false,
            method: 'POST',
            url: 'WebMethodsMaster.aspx/ObterPainelAlerta',
            contentType: 'application/json',
            dataType: 'json',            
            success: response => {
                var retorno = JSON.parse(response.d);
                if (retorno.Error === undefined) {
                     if (retorno != "null")
                        this.PainelAlerta = retorno;   
                    else 
                        this.PainelAlerta = [];
                                        
                    $('#timeline-html').html(`
                        ${this.PainelAlerta.map(x => {
                            return `<li class="item-link-util" data-id="${x.CD_PAINEL_ALERTA}">
                                <div class="li-timeline animated fadeIn">
                                    <div class="pt-5 pb-5" style="height: 1.5em;">                    
                                        <span class="default bagde badge-info badge-pill mr-5 float-left" style="min-width: 50px;" title="Número do Alerta"> <i class="fa fa-exclamation-circle mr-5"></i> ${x.CD_PAINEL_ALERTA || ""} </span>
                                        <span class="default bagde badge-secondary badge-pill mr-5 float-right" style="min-width: 150px;"> <i class="fa fa-clock mr-5"></i> ${x.DH_TIMESTAMP || ""} </span>                                        
                                    </div>
                                    <div class="pt-5 pb-5">
                                        <div class="pt-5" style="min-width:300px;">${ x.ALERTA || ""}</div>
                                    </div>
                                </div>
                            </li>`                                              
                        }).join("")}`);   

                } else {
                    ShowMessage(4, retorno.Error);
                }               
            },
            error: error => {
                ShowMessage(4, error.Message);
            }
        });
    }  
    ObterDataServidor() {
        try{
            let obj = undefined
            ExecutarAjax({
                assincrono: false,
                url: "WebMethodsMaster.aspx",
                metodo: "ObterDataServidor",
                fnSucesso: function (retorno) {
                    if (retorno.includes("[Erro]"))
                        ShowMessage(2, retorno.replace("[Erro]", ""));
                    else {
                        obj = retorno.replace(/\'/g, "");                    
                    }
                },
                fnErro: function (ex) {
                    ShowMessage(4, ex.Message);
                },
            });
            return obj != undefined ? obj.split(".")[0].replace(" ", "T") : false;
        }catch(e){
            console.log(e);
        }
    } 
    SetDataServidor(){
        let texto;
        let hr = new Date(this.ObterDataServidor()).getHours();
        let isDay = hr > 6 && hr < 18;
        let temperatura = Math.round(attMaster.SP[0].TEMPERATURA) + "° <small>SP</small>";

        if(this.ObterDataServidor()){
            texto = `<i class="px-5 fas ${isDay ? attMaster.SP[1].day : attMaster.SP[1].night} fa-2x" style="color: #9ccc65;"></i> <span class="font-size-sm">`+ temperatura +` `+ this.ObterDataServidor().substring(11,16) + `</span>` ;
        } else {
            let dt =  new Date();            
            texto = `<i class="px-5 fas ${isDay ? attMaster.SP[1].day : attMaster.SP[1].night} fa-2x" style=" color: #808080;"></i> <span class="font-size-sm">`+ temperatura +` `+ (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) + ":" + dt.getMinutes() + `</span>` ;
        }        
        $("#txtDataServidor").html(texto);        
    }
    ObterTelemetria(){
        try{
            ExecutarAjax({
                assincrono: false,
                url: "WebMethodsMaster.aspx",
                metodo: "ObterTelemetria",            
                fnSucesso: function (retorno) {
                    if (retorno.includes("[Erro]"))
                        ShowMessage(2, retorno.replace("[Erro]", ""));
                    else {
                        let obj = JSON.parse(retorno);
                        attMaster.SP = obj;                    
                    }
                },
                fnErro: function (ex) {
                    ShowMessage(4, ex.Message);
                },
            });

            switch(attMaster.SP[0].CLIMA){
                case "Clear":               
                    attMaster.SP.push({day:`fa-sun`, night: `fa-moon`})
                    break;
                case "Clouds":                
                    attMaster.SP.push({day:`fa-cloud-sun`, night: `fa-cloud-moon`})                
                    break;                
                case "Rain":                
                case "Drizzle":                
                    attMaster.SP.push({day:`fa-cloud-sun-rain`, night: `fa-cloud-moon-rain`})                                
                    break;
                case "Thunderstorm":
                    attMaster.SP.push({day:`fa-cloud-showers-heavy`, night: `fa-cloud-showers-heavy`})                                
                    break;
                default:
                    attMaster.SP.push({day:`fa-cloud`, night: `fa-cloud`})
                    break;
            } 
        }catch(e){
            console.log(e);
        }
    }
    GetSession() {
        try{
            ExecutarAjax({
                assincrono: true,
                url: "WebMethodsMaster.aspx",
                metodo: "GetSession",            
                fnSucesso: function (retorno) {
                    if (retorno.includes("[Erro]"))
                        ShowMessage(2, retorno.replace("[Erro]", ""));
                    else {
                        let obj = JSON.parse(retorno);
                        attMaster.KeepSession = obj;                    
                    }
                },
                fnErro: function (ex) {
                    ShowMessage(4, ex.Message);
                },
            });
        }catch(e){
            console.log(e);
        }
    }
    SetSession() { 
        try{
            ExecutarAjax({
                assincrono: false,
                url: "WebMethodsMaster.aspx",
                metodo: "SetSession", 
                parametro: JSON.stringify({
                    session: JSON.stringify(attMaster.KeepSession)
                }),           
                fnSucesso: function (retorno) {
                    if (retorno.includes("[Erro]"))
                        ShowMessage(2, retorno.replace("[Erro]", ""));
                    else {
                        attMaster.KeepSession = JSON.parse(retorno);                    
                    }
                },
                fnErro: function (ex) {
                    ShowMessage(4, ex.Message);
                },
            });  
        }catch(e){
            console.log(e);
        }    
    }
    AtualizarDados() {
        this.DataServidor = setInterval(() => { this.SetDataServidor()}, 60000);
        this.Session = setInterval(() => { this.SetSession() }, 60000);  
        this.PR02 = setInterval(() => { this.ObterQuantidadeOcorrenciasPR02() }, 5000);
        this.Telemetria = setInterval(() => { this.ObterTelemetria();}, 1800000);  
        //this.Alerta =  setInterval(() => { this.ObterAlerta();this.ObterQuantidadeAlerta();}, 15000);         
    } 
    EncerrarOcorrenciaPR02(idOcorrencia) {
        try{
            ExecutarAjax({
                assincrono: !1,
                parametro: JSON.stringify({
                    Id: idOcorrencia
                }),
                url: "WebMethodsMaster.aspx",
                metodo: "EncerrarOcorrencia",
                fnSucesso: function (retorno) {
                    if (retorno.includes("[Erro]"))
                        ShowMessage(2, retorno.replace("[Erro]", ""));
                    else {                                  
                        ShowMessage(1, "Cancelada com sucesso");
                        appMaster.SideBar(); 
                    }
                },
                fnErro: function (ex) {
                    ShowMessage(4, ex.Message);
                },
            }); 
        }catch(e){
            console.log(e);
        }       
    } 
    ObterLocalizacao() {
        try{
            ExecutarAjax({
                assincrono: true,
                url: "WebMethodsMaster.aspx",
                metodo: "ObterLocalizacao",
                fnSucesso: function (retorno) {
                    if (retorno.includes("[Erro]"))
                        ShowMessage(2, retorno.replace("[Erro]", ""));
                    else {
                        let obj = JSON.parse(retorno);

                        attMaster.Rodovia = obj.Rodovia;
                        attMaster.Sentido = obj.Sentido;
                        attMaster.Pista = obj.Pista;
                    }
                },
                fnErro: function (ex) {
                    ShowMessage(4, ex.Message);
                },
            }); 
        }catch(e){
            console.log(e);
        }
    } 
    Validar(codigo,editar){
        let ok = !0;
        var VerificarCampo = function (teste, mensagem, seletor) {
            if (teste) {
                ok = !1;
                $(seletor).addClass("is-invalid").siblings(".invalid-feedback").text(mensagem).focus();
            } else {
                $(seletor).removeClass("is-invalid");
            }
            return teste;
        }
        var VerificarCampoData = function (teste, mensagem, seletor) {
            if (teste) {
                ok = !1;
                $(seletor).closest(".form-group").addClass("is-invalid").find(".invalid-feedback").text(mensagem).focus();
            } else {
                $(seletor).closest(".form-group").removeClass("is-invalid");
            }
            return teste;
        }
        var ValidarCPF = function (a) {
            let b, c, d, e, f, g, h, i, j, k;
            if (14 == a.length) {
                if (!a.match(/[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]\-[0-9][0-9]/)) return !1;
                c = a.split("."), d = c[2].split("-"), e = c[0] + c[1] + d[0] + d[1], b = e
            } else {
                if (11 != a.length) return !1;
                b = a
            }
            if (k = 1, b.length < 11) return !1;
            for (i = 0; i < b.length - 1; i++)
                if (b.charAt(i) != b.charAt(i + 1)) {
                    k = 0;
                    break
                } if (k) return !1;
            for (f = b.substring(0, 9), g = b.substring(9), h = 0, i = 10; i > 1; i--) h += f.charAt(10 - i) * i;
            if (j = 2 > h % 11 ? 0 : 11 - h % 11, j != g.charAt(0)) return !1;
            for (f = b.substring(0, 10), h = 0, i = 11; i > 1; i--) h += f.charAt(11 - i) * i;
            return j = 2 > h % 11 ? 0 : 11 - h % 11, j != g.charAt(1) ? !1 : !0
        }

        switch(codigo){

            case "ocorrencia-pr02":
                           
                VerificarCampo($("#ddlRodoviaMaster").val().length == 0, "Rodovia é um campo obrigatório", "#ddlRodoviaMaster");  
                VerificarCampo(!$("#ddlSentidoMaster").val(), "Sentido é um campo obrigatório", "#ddlSentidoMaster");
                VerificarCampo(!$("#ddlTipoPistaMaster").val(), "Local é um campo obrigatório", "#ddlTipoPistaMaster");                            
                
                if($("#txtKmMaster").val().length == 0){
                    VerificarCampo(!0, "Km é um campo obrigatório", "#txtKmMaster");
                }else{
                    let km = parseInt($("#txtKmMaster").val());
                    let kmInicial = parseInt(attMaster.Rodovia.find(x => x.Id == parseInt($("#ddlRodoviaMaster").val())).KmInicial);
                    let kmFinal = parseInt(attMaster.Rodovia.find(x => x.Id == parseInt($("#ddlRodoviaMaster").val())).KmFinal); 
                    
                    if(kmInicial > km){
                        VerificarCampo(!0, "Km/Metro inferior ao Km/Metro Inicial da Rodovia", "#txtKmMaster");
                    } else if(kmFinal < km) {
                        VerificarCampo(!0, "Km/Metro superior ao Km/Metro Final da Rodovia", "#txtKmMaster"); 
                    }
                }  
                    
                
                break;           

        }

        return ok;
    }
    ObterQuantidadeOcorrenciasPR02() {
        try{
            $.ajax({
                assincrono: true,
                method: 'POST',
                url: 'WebMethodsMaster.aspx/ObterOcEncerradasPR02',
                contentType: 'application/json',
                dataType: 'json',            
                success: response => {
                    try{
                        let retorno = JSON.parse(response.d);
                        if (retorno.Error === undefined) {
                            if (retorno != "null"){ 
                                let obj = retorno;                        
                                obj && obj.length > 0 ? $("#bg-pr02").text(obj.length).show() : $("#bg-pr02").hide();
                                
                            }
                        } else {
                            ShowMessage(4, retorno.Error);
                        }
                    }catch(e){
                        console.log(e);
                    }                 
                },
                error: error => {
                    ShowMessage(4, error.Message);
                }
            });
        }catch(e){
            console.log(e);
        }
    }
    ObterAlerta(){
        try{
            if(window.location.href.indexOf("PainelMonitoramentoOcorrencia.aspx") != -1){
                if(!$("#page-container").hasClass("side-overlay-o")){
                    ExecutarAjax({
                        assincrono: true,
                        url: "WebMethodsMaster.aspx",
                        metodo: "ObterAlerta",
                        fnSucesso: function (retorno) {
                            if (retorno.includes("[Erro]"))
                                ShowMessage(2, retorno.replace("[Erro]", ""));
                            else {
                                let obj = JSON.parse(retorno);
                                
                                if(obj[obj.length-1].ALERTA != null){
                                    ShowMessage(4, obj[obj.length-1].ALERTA)                                
                                }
                                
                            }
                        },
                        fnErro: function (ex) {
                            ShowMessage(4, ex.Message);
                        },
                    });  
                }
            }
        }catch(e){
            console.log(e);
        }
        
    }
    ObterQuantidadeAlerta() {        
        $.ajax({
            assincrono: true,
            method: 'POST',
            url: 'WebMethodsMaster.aspx/ObterPainelAlerta',
            contentType: 'application/json',
            dataType: 'json',            
            success: response => {
                try{
                    var retorno = JSON.parse(response.d);
                    if (retorno.Error === undefined) {
                        if (retorno != "null"){ 
                            let obj = retorno;                        
                            obj && obj.length > 0 ? $("#bg-painel-alerta").text(obj.length).show() : $("#bg-painel-alerta").hide();
                            
                        }
                    } else {
                        ShowMessage(4, retorno.Error);
                    }
                }catch(e){
                    console.log(e);
                }               
            },
            error: error => {                    
                ShowMessage(4, error.Message);
            }
        });        
    }
}

$(document).ready(function () {
    appMaster = new MasterPainelControle(); 
});

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    ShowMessage(1, "Observação copiada.");
}
