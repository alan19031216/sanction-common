import * as jose from 'jose'

interface PayloadType {
    id: string;
    email: string;
}

export class Jwt {
    private static readonly secret = jose.base64url.decode(process.env.JWT_SECRET!);

    static async toGenerate(id: string, email: string) {
        const jwt = await new jose.EncryptJWT({ id, email })
            .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
            .setIssuedAt()
            .setIssuer(process.env.JWT_ISSUER!)
            .setAudience(process.env.JWT_AUDIENCE!)
            .setExpirationTime('2h')
            .encrypt(this.secret)

        return { jwt }
    }

    static async decrypt(jwt: string) {
        const { payload, protectedHeader }: {
            payload: PayloadType;
            protectedHeader: any;
        } = await jose.jwtDecrypt(jwt, this.secret, {
            issuer: process.env.JWT_ISSUER!,
            audience: process.env.JWT_AUDIENCE!,
        })

        return { payload, protectedHeader }
    }
}
