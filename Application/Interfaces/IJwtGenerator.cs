using Models;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
         string CreatToken(AppUser user);
    }
}