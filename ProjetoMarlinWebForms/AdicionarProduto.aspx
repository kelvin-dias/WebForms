<%@ Page Title="" Language="C#" MasterPageFile="~/Layout.Master" AutoEventWireup="true" CodeBehind="AdicionarProduto.aspx.cs" Inherits="ProjetoMarlinWebForms.AdicionarProduto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Pages/AdicionarProduto.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content pt-10">
        <div class="row push">
            <div class="col-md py-10 d-md-flex align-items-md-center text-center">
                <h3 class="mb-0">
                    <span class="font-w300">Inserir Produto</span>
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

                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="txtPreco">Preço<span class="text-danger">*</span></label>
                                <asp:TextBox runat="server" CssClass="form-control" ID="txtPreco" ClientIDMode="Static"></asp:TextBox>
                                <div class="invalid-feedback fadeInDown">N/A</div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="form-group">
                                <label for="ddlCategoria">Categoria</label>
                                <asp:DropDownList runat="server" CssClass="form-control" ID="ddlCategoria" ClientIDMode="Static"></asp:DropDownList>
                                <div class="invalid-feedback animated fadeInDown"></div>
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
