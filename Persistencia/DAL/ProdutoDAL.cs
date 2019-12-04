using Persistencia.Context;
using System.Linq;
using Modelo.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Persistencia.DAL
{
    public class ProdutoDAL
    {
        private EFContext context = new EFContext();

        public Produto ObterServidorPorId(long id)
        {
            return context.Produtos.Where(p => p.ProdutoId == id).First();
        }

        public void GravarProduto(Produto produto)
        {

            if (produto.ProdutoId == null)
            {
                context.Produtos.Add(produto);
            }
            else
            {
                context.Entry(produto).State = EntityState.Modified;
            }

            context.SaveChanges();
        }


        public IQueryable<Produto> ObterProdutos()
        {
            return context.Produtos.OrderBy(b => b.ProdutoId);
        }

        public void EliminarProdutoPorId(long id)
        {
            Produto produto = ObterServidorPorId(id);
            context.Produtos.Remove(produto);
            context.SaveChanges();
        }
    }
}
