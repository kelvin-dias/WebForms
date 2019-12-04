using System;
using System.Linq;
using System.Web.UI.WebControls;
using Persistencia.DAL;

namespace ProjetoMarlinWebForms
{
    public partial class ConsultarProduto : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack) return;

            btnConsultar_OnClick(null, null);

        }

        protected void btnConsultar_OnClick(object sender, EventArgs e)
        {
            ProdutoDAL produtoDAL = new ProdutoDAL();

            rptDados.DataSource = produtoDAL.ObterProdutos().ToList();
            rptDados.DataBind();
        }
    }
}