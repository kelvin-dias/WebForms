using Microsoft.EntityFrameworkCore;

namespace Persistencia.Context
{
    public class EFContext : DbContext
    {
        public DbSet<Modelo.Entidades.Produto> Produtos { get; set; }
        public DbSet<Modelo.Tabelas.Categoria> Categorias { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\Fadami\source\repos\webforms\ProjetoMarlinWebForms\App_Data\WebFormsBD.mdf;Integrated Security=True");
        }
    }
}
