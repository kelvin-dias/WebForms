using Modelo.Tabelas;
using Persistencia.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ProjetoMarlinWebForms
{
    public partial class AdicionarCategoria : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack) return;
        }

        protected void btnSalvar_OnClick(object sender, EventArgs e)
        {

            CategoriaDAL categoriaDAL = new CategoriaDAL();

            Categoria categoria = new Categoria();

            categoria.Nome = txtNome.Text;

            categoriaDAL.GravarCategoria(categoria);

            LimparCampos();
        }
        private void LimparCampos()
        {
            txtNome.Text = string.Empty;
        }
    }
}
