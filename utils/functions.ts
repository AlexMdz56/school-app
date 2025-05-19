export const generateSecurePassword = (length: number = 16) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    // Asegurar al menos un carácter de cada tipo
    password += "A"; // Mayúscula
    password += "a"; // Minúscula
    password += "1"; // Número
    password += "!"; // Símbolo
    // Resto de la contraseña
    for (let i = 4; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    // Mezclar los caracteres
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}