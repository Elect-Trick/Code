using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    // Paged List takes a generic entity type
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items, int count, int pageNUmber, int pageSize)
        {
            CurrentPage = pageNUmber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items);
            // Allows us to have access to the items in the pagedList whene a new instace is created
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        // Nuber of items in the page
        public int TotalCount { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> sourceData, int pageNumber, int pageSize)
        {
            var count = await sourceData.CountAsync();
            var items = await sourceData.Skip((pageNumber-1)* pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items,count,pageNumber,pageSize);

        }
    }


}