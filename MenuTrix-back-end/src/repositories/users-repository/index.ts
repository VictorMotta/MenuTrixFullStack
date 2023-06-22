import { prisma } from '@/config/database';
import { CreateUser, CreateSessionUser } from '@/protocols/types';
import { Session, User } from '@prisma/client';

async function getUserById(id: number): Promise<User> {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
}

async function verifyUserByEmail(email: string): Promise<User> {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function verifyUserByCpf(cpf: string): Promise<User> {
  return await prisma.user.findFirst({
    where: {
      cpf,
    },
  });
}

async function createUser({ name, email, password, cpf }: CreateUser) {
  await prisma.user.create({
    data: {
      name,
      email,
      password,
      cpf,
    },
  });
}

async function findByEmail(email: string): Promise<User> {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function createSession(data: CreateSessionUser): Promise<Session> {
  return await prisma.session.upsert({
    where: {
      userId: data.userId,
    },
    create: {
      token: data.token,
      userId: data.userId,
    },
    update: {
      token: data.token,
      updatedAt: new Date(),
    },
  });
}

async function alterEmail(id: number, email: string): Promise<User> {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
    },
  });
}

async function alterCpf(id: number, cpf: string): Promise<User> {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      cpf,
    },
  });
}

async function alterName(id: number, name: string): Promise<User> {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

async function alterPassword(id: number, password: string): Promise<User> {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });
}

const usersRepository = {
  getUserById,
  verifyUserByEmail,
  verifyUserByCpf,
  createUser,
  findByEmail,
  createSession,
  alterEmail,
  alterCpf,
  alterName,
  alterPassword,
};

export default usersRepository;
