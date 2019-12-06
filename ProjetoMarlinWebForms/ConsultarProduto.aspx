<%@ Page Title="" Language="C#" MasterPageFile="~/Layout.Master" AutoEventWireup="true" CodeBehind="ConsultarProduto.aspx.cs" Inherits="ProjetoMarlinWebForms.ConsultarProduto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="content pt-10">
        <div class="row push">
            <div class="col-md py-10 d-md-flex align-items-md-center text-center">
                <h3 class="mb-0">
                    <span class="font-w300">Lista de Produtos</span>
                </h3>
            </div>
        </div>
    </div>


    <asp:Repeater runat="server" ID="rptDados">
        <HeaderTemplate>
            <table class="table <%--table-responsive table-bordered table-data animated fadeIn--%>">
                <thead style="font-size: 69%;">
                    <tr class="bg-gd-primary text-white">
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td><%# Eval("ProdutoId") %></td>
                <td><%# Eval("Nome") %></td>
                <td><%# Eval("Preco") %></td>
                <td><%# Eval("CategoriaId") %></td>
                <td>
                    <asp:LinkButton CssClass="btn btn-danger" runat="server" OnClick="btnExcluir_OnClick" CommandArgument='<%# Eval("ProdutoId") %>' ID="btnEditar" title="Excluir">Excluir</asp:LinkButton>
                </td>
            </tr>
        </ItemTemplate>
        <FooterTemplate>
            </tbody>
                    </table>
        </FooterTemplate>
    </asp:Repeater>

    <asp:LinkButton runat="server" ClientIDMode="Static" ID="btnConsultar" OnClick="btnConsultar_OnClick" CssClass="btn btn-success"> <i class="fa fa-search"></i>&nbsp;Consultar </asp:LinkButton>



</asp:Content>
