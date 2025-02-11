import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST: RequestHandler = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return new Response(JSON.stringify({ success: true, token }), {
      status: 200,
      headers: {
        "Set-Cookie": `jwt=${token}; HttpOnly; Path=/; Max-Age=3600; Secure`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "signin failed" }), {
      status: 500,
    });
  }
};
