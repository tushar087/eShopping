using IdentityServer;
using IdentityServerHost.Quickstart.UI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddIdentityServer()
       .AddInMemoryClients(Config.Clients)
       .AddInMemoryApiScopes(Config.ApiScopes)
       .AddInMemoryIdentityResources(Config.IdentityResouces)
       .AddTestUsers(TestUsers.Users)
       .AddDeveloperSigningCredential();
var app = builder.Build();


app.UseStaticFiles();
app.UseRouting();
app.UseIdentityServer();
app.UseAuthorization();


app.UseEndpoints(x =>
{
   x.MapDefaultControllerRoute();
});
app.Run();
