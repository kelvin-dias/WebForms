<%@ Page Title="" Language="C#" MasterPageFile="~/Layout.Master" AutoEventWireup="true" CodeBehind="ConsultarProduto.aspx.cs" Inherits="ProjetoMarlinWebForms.ConsultarProduto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <div class="row">

        <asp:Repeater runat="server" ID="rptDados">
            <HeaderTemplate>
                <table class="table table-responsive table-bordered table-data animated fadeIn">
                    <thead style="font-size: 69%;">
                        <tr class="bg-gd-primary text-white">
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço</th>
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
                    <td>
                        <%--<asp:LinkButton runat="server" OnClick="btnExcluir_OnClick" ID="btnExcluir" data-toggle="tooltip" title="Excluir"><i class="fas fa-pencil-alt"></i></asp:LinkButton>--%>
                    </td>
                </tr>
            </ItemTemplate>
            <FooterTemplate>
                </tbody>
                    </table>
            </FooterTemplate>
        </asp:Repeater>
    </div>

    <asp:LinkButton runat="server" ClientIDMode="Static" ID="btnConsultar" OnClick="btnConsultar_OnClick" CssClass="btn btn-success"> <i class="fa fa-search"></i>&nbsp;Consultar </asp:LinkButton>



</asp:Content>
