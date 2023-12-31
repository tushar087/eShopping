using IdentityServer;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

builder.Services.AddIdentityServer()
       .AddInMemoryClients(Config.Clients)
       .AddInMemoryApiScopes(Config.ApiScopes)
       .AddInMemoryIdentityResources(Config.IdentityResouces)
       .AddDeveloperSigningCredential();

app.UseIdentityServer();

app.Run();
