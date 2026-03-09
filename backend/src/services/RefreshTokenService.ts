import { prisma } from '../repository/prisma';

export class RefreshTokenService {
  static async createRefreshToken(refreshToken: string, userId: string) {
    const token = await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  static async removeRefreshToken(refreshToken: string) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }
}
