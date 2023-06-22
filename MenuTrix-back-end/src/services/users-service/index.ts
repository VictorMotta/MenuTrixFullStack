import { ReqBody, ReqQuerys } from '@/controllers';
import { invalidDataError, unauthorizedError } from '@/errors';
import { conflictError } from '@/errors/conflict-data-error';
import { invalidCredentialsError } from '@/errors/invalid-credentials-error';
import { notFoundError } from '@/errors/not-found-error';
import { CreateUser, SignInUser } from '@/protocols/types';
import usersRepository from '@/repositories/users-repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getUser(userId: number): Promise<User> {
  const user = await usersRepository.getUserById(userId);
  if (!user) throw notFoundError();

  return user;
}

async function createUser(userData: CreateUser) {
  const emailExist = await usersRepository.verifyUserByEmail(userData.email);
  if (emailExist) throw conflictError();

  const cpfExist = await usersRepository.verifyUserByCpf(userData.cpf);
  if (cpfExist) throw conflictError();

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const body = {
    name: userData.name,
    email: userData.email,
    cpf: userData.cpf,
    password: hashedPassword,
  };

  await usersRepository.createUser(body);
}

async function signIn(userData: SignInUser): Promise<SignUserReturn> {
  const { email, password } = userData;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  delete user.password;

  return {
    user,
    token,
  };
}

type SignUserReturn = { user: Omit<User, 'password'>; token: string };

async function createSession(userId: number): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await usersRepository.createSession({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function getUserOrFail(email: string): Promise<User> {
  const user = await usersRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

async function alterEmail(body: ReqBody, userId: number): Promise<User> {
  if (!body.mainEmail || !body.newEmail || !body.repeatEmail) throw unauthorizedError();

  console.log('entrou!');

  const emailExist = await usersRepository.verifyUserByEmail(body.mainEmail);
  if (!emailExist) throw unauthorizedError();

  if (emailExist.id !== userId) throw unauthorizedError();
  console.log('entrou');

  if (body.newEmail !== body.repeatEmail) throw conflictError();

  const user = await usersRepository.alterEmail(userId, body.newEmail);
  return user;
}

async function alterCpf(body: ReqBody, userId: number): Promise<User> {
  if (!body.mainCpf || !body.newCpf || !body.repeatCpf) throw unauthorizedError();

  const cpfExist = await usersRepository.verifyUserByCpf(body.mainCpf);
  if (!cpfExist) throw unauthorizedError();
  console.log('passou');
  if (cpfExist.id !== userId) throw unauthorizedError();

  if (body.newCpf !== body.repeatCpf) throw conflictError();

  const arrNewCpf = body.newCpf.split('');
  console.log(arrNewCpf.length < 11);
  if (arrNewCpf.length !== 11) throw conflictError(); 

  const user = await usersRepository.alterCpf(userId, body.newCpf);
  return user;
}

async function alterPassword(body: ReqBody, userId: number): Promise<User> {
  if (!body.mainPassword || !body.newPassword || !body.repeatPassword) throw unauthorizedError();

  console.log(body);

  const userExist = await usersRepository.getUserById(userId);
  if (!userExist) throw unauthorizedError();

  await validatePasswordOrFail(body.mainPassword, userExist.password);

  if (body.newPassword !== body.repeatPassword) throw conflictError();

  const hashNewPassword = await bcrypt.hash(body.newPassword, 12);

  const user = await usersRepository.alterPassword(userId, hashNewPassword);
  return user;
}

async function alterName(body: ReqBody, userId: number): Promise<User> {
  if (!body.newName) throw unauthorizedError();

  const userExist = await usersRepository.getUserById(userId);
  if (!userExist) throw unauthorizedError();

  const user = await usersRepository.alterName(userId, body.newName);
  return user;
}

async function alterInfos(query: ReqQuerys, userId: number, body: ReqBody): Promise<User> {
  console.log(query);
  if (query.cpf && query.email) throw unauthorizedError();
  if (query.cpf && query.name) throw unauthorizedError();
  if (query.cpf && query.password) throw unauthorizedError();
  if (query.email && query.name) throw unauthorizedError();
  if (query.email && query.password) throw unauthorizedError();
  if (query.name && query.password) throw unauthorizedError();

  if (query.email) return await alterEmail(body, userId);

  if (query.cpf) return await alterCpf(body, userId);

  if (query.name) return await alterName(body, userId);

  if (query.password) return await alterPassword(body, userId);
}

const usersService = {
  getUser,
  createUser,
  signIn,
  alterInfos,
};

export default usersService;
