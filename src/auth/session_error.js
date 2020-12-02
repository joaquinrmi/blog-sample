class SessionError
{
   constructor(type, message)
   {
      this.type = type;
      this.message = message;
   }
};

class EmptyForm extends SessionError
{
   constructor()
   {
      super("empty-form", "El formularo está vacío.");
   }
};

class InvalidUsername extends SessionError
{
   constructor()
   {
      super("invalid-username", "El nombre de usuario debe contener solo letras, números y guiones.")
   }
};

class InvalidEmail extends SessionError
{
   constructor()
   {
      super("invalid-email", "El email es inválido.");
   }
};

class InvalidPassword extends SessionError
{
   constructor()
   {
      super("invalid-password", "La contraseña debe contener al menos 8 caracteres y un máximo de 64, al menos una letra mayúscula, al menos un número y al menos un símbolo.");
   }
};

class UsernameAlreadyUsed extends SessionError
{
   constructor()
   {
      super("username-already-used", "Ya existe una cuenta no ese nombre de usuario.");
   }
};

class UsernameDoesNotExist extends SessionError
{
   constructor()
   {
      super("username-does-not-exist", "El nombre de usuario no existe.");
   }
};

class WrongUsernameOrPassword extends SessionError
{
   constructor()
   {
      super("wrong-username-or-password", "Combinación usuario-contraseña incorrecta.");
   }
};

class UserSessionDoesNotExist extends SessionError
{
   constructor()
   {
      super("user-session-does-not-exist", "No existe una sesión para el usuario indicado.");
   }
};

class CookieDoesNotExist extends SessionError
{
   constructor()
   {
      super("cookie-does-not-exist", "La cookie de sesión no existe.");
   }
};

module.exports = {
   EmptyForm,
   InvalidUsername,
   InvalidEmail,
   InvalidPassword,
   SessionError,
   UsernameAlreadyUsed,
   UsernameDoesNotExist,
   WrongUsernameOrPassword,
   UserSessionDoesNotExist,
   CookieDoesNotExist
};