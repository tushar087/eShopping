using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Security.Claims;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResouces => new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };

        public static IEnumerable<ApiScope> ApiScopes => new ApiScope[]
        {
            new ApiScope("catalogapi"),
            new ApiScope("basketapi"),
            new ApiScope("catalogapi.read"),
            new ApiScope("catalogapi.write"),
            new ApiScope("eshoppinggateway")
        };

        public static IEnumerable<ApiResource> ApiResources => new ApiResource[]
        {
            new ApiResource("Catalog","Catalog.API")
            {
                Scopes={"catalogapi.read","catalogapi.write"}
            },
            new ApiResource("Basket","Basket.API")
            {
                Scopes=new[] {"basketapi"}
            },
            new ApiResource("EshoppingGateway","EShopping Gateway")
            {
                Scopes={"eshoppinggateway","basketapi"}
            }

        };

        public static IEnumerable<Client> Clients => new Client[]
        {
            new Client
            {
                ClientName="Catalog API Client",
                ClientId="CatalogApiClient",
                ClientSecrets={ new Secret("5c6eb3b4-61a7-4668-ac57-2b4591ec26d2".Sha256()) },
                AllowedGrantTypes=GrantTypes.ClientCredentials,
                AllowedScopes={"catalogapi.read","catalogapi.write" }
            },
            new Client
            {
                ClientName="Basket API Client",
                ClientId="BasketApiClient",
                ClientSecrets={ new Secret("5c6eb3b4-61a7-4668-ac57-2b4591ec26d2".Sha256()) },
                AllowedGrantTypes=GrantTypes.ClientCredentials,
                AllowedScopes={"basketapi"}
            },
            new Client
                {
                    ClientName = "EShopping Gateway Client",
                    ClientId = "EShoppingGatewayClient",
                    ClientSecrets = {new Secret("5c7fd5c5-61a7-4668-ac57-2b4591ec26d2".Sha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes = {"eshoppinggateway", "basketapi"}
                }
        };

        public static List<TestUser> TestUsers => new List<TestUser>
        {
            new TestUser
        {
                SubjectId="5BE86359-073C-434B-AD2D-A3932222DABE",
                Username="tushar",
                Password="system123#",
                Claims=new List<Claim>
                {
                    new Claim(JwtClaimTypes.GivenName,"tushar"),
                    new Claim(JwtClaimTypes.FamilyName,"beniwal")
                }
        }
        };
    }
}
