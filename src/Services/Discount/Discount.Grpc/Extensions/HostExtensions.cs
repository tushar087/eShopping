
using Npgsql;


namespace Discount.Grpc.Extensions
{
    public static class HostExtensions
    {
        public static IHost MigrationDatabase<TContext>(this IHost host,int? retry=0)
        {
            int retryForAvailability = retry.Value;

            using(var scope=host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var configuration=services.GetRequiredService<IConfiguration>();

                var logger=services.GetRequiredService<ILogger<TContext>>();


                try
                {
                    logger.LogInformation("Migrating postresql database.");

                    using var connection = new NpgsqlConnection(configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

                    connection.Open();

                    using var command = new NpgsqlCommand
                    {
                        Connection = connection
                    };

                    command.CommandText = "DROP Table if exists Coupon";
                    command.ExecuteNonQuery();


                    command.CommandText = "Create Table Coupon(Id SERIAL Primary Key, ProductName varchar(24) not null, Description TEXT,Amount INT)";

                    command.ExecuteNonQuery();

                    command.CommandText = "Insert into Coupon(ProductName, Description,Amount) values('IPhone X','IPhone X Discount',150)";
                    command.ExecuteNonQuery();

                    command.CommandText = "Insert into Coupon(ProductName, Description,Amount) values('Samsung 10','Samsung Discount',100)";
                    command.ExecuteNonQuery();



                    logger.LogInformation("Migrating postreqsql database.");

                }
                catch(NpgsqlException ex)
                {
                    logger.LogError(ex, "An error occurred while migrating postresql database");

                    if (retryForAvailability < 50)
                    {
                        retryForAvailability++;
                        System.Threading.Thread.Sleep(2000);
                        MigrationDatabase<TContext>(host, retryForAvailability);
                    }
                }
            }
            return host;
        }
    }
}
