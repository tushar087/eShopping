using Microsoft.Extensions.Logging;
using Ordering.Domain.Entities;

namespace Ordering.Infrastructure.Persistence
{
    public class OrderContextSeed
    {
        public static async Task SeedAsync(OrderContext orderContext,ILogger<OrderContextSeed> logger)
        {
            if (!orderContext.Orders.Any())
            {
                orderContext.Orders.AddRange(GetPreconfigureOrders());
                await orderContext.SaveChangesAsync();
                logger.LogInformation("Seed database associated with context {DbContextName}", typeof(OrderContext).Name);
            }
        }

        private static IEnumerable<Order> GetPreconfigureOrders()
        {
            return new List<Order>
            {
                new Order(){UserName="tbeniwal",FirstName="Tushar",LastName="Beniwal",EmailAddress="tbeniwal@gmail.com",AddressLine="Jodhpur",Country="India",TotalPrice=400}
            };
        }
    }
}
