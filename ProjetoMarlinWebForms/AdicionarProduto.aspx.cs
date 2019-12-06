using System;
using System.Web.UI.WebControls;
using Modelo.Entidades;
using Persistencia.DAL;

namespace ProjetoMarlinWebForms

{
    public partial class AdicionarProduto : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack) return;

            PopularDropdownCategoria();
        }

        protected void btnSalvar_OnClick(object sender, EventArgs e)
        {

            ProdutoDAL produtoDAL = new ProdutoDAL();

            Produto produto = new Produto();

            produto.Nome = txtNome.Text;
            produto.Preco = Convert.ToDouble(txtPreco.Text);
            produto.CategoriaId = Convert.ToInt32(ddlCategoria.SelectedValue);


            produtoDAL.GravarProduto(produto);

            
            LimparCampos();

            Response.Redirect("ConsultarProduto.aspx");
        }


        public void PopularDropdownCategoria()
        {
            CategoriaDAL categoriaDAL = new CategoriaDAL();

            ddlCategoria.DataSource = categoriaDAL.ObterCategoria();
            ddlCategoria.DataTextField = "Nome";
            ddlCategoria.DataValueField = "CategoriaId";
            ddlCategoria.DataBind();
            ddlCategoria.Items.Insert(0, new ListItem("Selecione", ""));
        }


        private void LimparCampos()
        {
            txtNome.Text = string.Empty;
            txtPreco.Text = string.Empty;
        }
    }
}
