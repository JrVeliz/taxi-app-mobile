export async function login(user: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user === "test" && password === "123") {
        console.log("Login successful");
        resolve();
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 800);
  });
}
