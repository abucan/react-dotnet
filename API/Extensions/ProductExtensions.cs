using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> ApplySort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
            query = orderBy switch
            {
                "priceAsc" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> ApplySearch(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm)) return query;
            return query.Where(p => p.Name.Trim().ToLower().Contains(searchTerm.ToLower()));
        }

        public static IQueryable<Product> ApplyFilter(this IQueryable<Product> query, string brands, string types)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if (!string.IsNullOrWhiteSpace(brands))
            {
                brandList.AddRange(brands.ToLower().Split(",").ToList());
            }

            if (!string.IsNullOrWhiteSpace(types))
            {
                typeList.AddRange(types.ToLower().Split(",").ToList());
            }

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

            return query;
        }
    }
}