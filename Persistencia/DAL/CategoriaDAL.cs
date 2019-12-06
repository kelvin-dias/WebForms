using System.Collections.Generic;
using System.Linq;
using Persistencia.Context;
using Modelo.Tabelas;
using Microsoft.EntityFrameworkCore;

namespace Persistencia.DAL
{
    public class CategoriaDAL
    {
        private EFContext context = new EFContext();

        public List<Categoria> ObterCategoria()
        {
            return context.Categorias.OrderBy(b => b.Nome).ToList();
        }

        public void GravarCategoria(Categoria categoria)
        {

            if (categoria.CategoriaId == null)
            {
                context.Categorias.Add(categoria);
            }
            else
            {
                context.Entry(categoria).State = EntityState.Modified;
            }

            context.SaveChanges();
        }
    }
}
