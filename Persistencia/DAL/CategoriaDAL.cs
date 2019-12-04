using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Persistencia.Context;
using Modelo.Tabelas;

namespace Persistencia.DAL
{
    public class CategoriaDAL
    {
        private EFContext context = new EFContext();

        public IQueryable<Categoria> ObterCategoria()
        {
            return context.Categorias.OrderBy(b => b.Nome);
        }
    }
}
