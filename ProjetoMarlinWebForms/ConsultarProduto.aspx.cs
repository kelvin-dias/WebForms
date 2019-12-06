using System;
using System.Linq;
using System.Web.Services;
using System.Web.UI.WebControls;
using Persistencia.DAL;



namespace ProjetoMarlinWebForms
{
    public partial class ConsultarProduto : System.Web.UI.Page
    {
        ProdutoDAL produtoDAL = new ProdutoDAL();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack) return;

            btnConsultar_OnClick(null, null);

        }

        protected void btnConsultar_OnClick(object sender, EventArgs e)
        {


            rptDados.DataSource = produtoDAL.ObterProdutos().ToList();
            rptDados.DataBind();
        }

        public void btnExcluir_OnClick(object sender, EventArgs e)
        {
            ProdutoDAL produtoDAL = new ProdutoDAL();

            var id = Server.UrlEncode((((LinkButton)sender).CommandArgument));
            produtoDAL.EliminarProdutoPorId(Convert.ToInt32(id));

            Response.Redirect("ConsultarProduto.aspx");
        }
    }
}