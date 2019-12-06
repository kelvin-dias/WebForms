using Modelo.Tabelas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Entidades
{
    public class Produto
    {
        public long? ProdutoId { get; set; }
        public string Nome { get; set; }
        public double Preco { get; set; }
        public long? CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
    }
}
