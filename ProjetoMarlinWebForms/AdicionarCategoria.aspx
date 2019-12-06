<%@ Page Title="" Language="C#" MasterPageFile="~/Layout.Master" AutoEventWireup="true" CodeBehind="AdicionarCategoria.aspx.cs" Inherits="ProjetoMarlinWebForms.AdicionarCategoria" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Pages/AdicionarCategoria.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content pt-10">
        <div class="row push">
            <div class="col-md py-10 d-md-flex align-items-md-center text-center">
                <h3 class="mb-0">
                    <span class="font-w300">Inserir Categoria</span>
                </h3>
            </div>
        </div>
    </div>
    <div class="content pt-0">
        <div class="block block-rounded block-bordered  pb-10">
            <div class="block-content">
                <asp:Panel ID="p" runat="server">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="txtNome">Nome<span class="text-danger">*</span></label>
                                <asp:TextBox runat="server" CssClass="form-control" ID="txtNome" ClientIDMode="Static"></asp:TextBox>
                                <div class="invalid-feedback fadeInDown">N/A</div>
                            </div>
                        </div>

                    </div>
                </asp:Panel>

                <div class="row">
                    <div class="col-12 col-md-2">
                        <asp:LinkButton runat="server" ClientIDMode="Static" OnClientClick="return Validar();" OnClick="btnSalvar_OnClick" ID="btnSalvar" CssClass="btn btn-block btn-outline-success float-right"> <i class="fa fa-check"></i>&nbsp;Salvar </asp:LinkButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
