/* eslint-disable prettier/prettier */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function  abc(){
  const parentWithChildren = await prisma.record.findMany({
  });
  return parentWithChildren
}

abc()
  .then((pots) => {
    console.log(pots);
  })
  .catch((e) => {
    console.log(e);
  });