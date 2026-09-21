function generateToken(password: string): string {
    return password;
}

function isValidToken(token: string): boolean {
    return Boolean(token && token.length > 0);
}

exports.generateToken = generateToken;
exports.isValidToken = isValidToken;
