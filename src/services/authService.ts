//Estructura usuario falso
export interface Profile {
  nombre: string;
}

export async function login(
  user: string,
  password: string,
): Promise<{ token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Envío de credenciales y recibir token de sesión
      if (user === "test" && password === "123") {
        resolve({ token: "token-falso" });
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 800);
  });
}

export async function fetchProfile(token: string): Promise<Profile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Pedir la información de perfil con el token
      resolve({ nombre: "Usuario de prueba" });
    }, 1200);
  });
}
