
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;


namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        // Type of encryption where one is key used to encrypt and decrypt. 
        public TokenService(IConfiguration config)
        {
            // Encode a new key and add a property Called TokenKey for us to access 
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            // Claims will come in handy in DB's especially when roles are assigned
            var claims = new List<Claim>
            {

                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)

            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            // Describe our Token architecture 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            //Token handler, to work with the token, create, renew etc
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }

    }

}