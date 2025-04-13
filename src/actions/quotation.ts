'use server'

import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { sendQuotationMail } from './nodemailer'

const prisma = new PrismaClient()

export async function getAllQuotations() {
  return prisma.quotation.findMany()
}

export async function createQuotation() {
  const quotation = await prisma.quotation.create({
    data: {
      salesperson: faker.name.fullName(),
      content: faker.lorem.sentence({
        min: 8,
        max: 10,
      }),
      status: 'pending',
    },
  })

  await sendQuotationMail({
    email: faker.internet.email(),
    sendTo: faker.internet.email(),
    subject: 'New Quotation Created',
    html: `<p>Quotation ID: ${quotation.id}</p>
           <p>Salesperson: ${quotation.salesperson}</p>
           <p>Content: ${quotation.content}</p>
           <div style="">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/quotations/${quotation.id}/accepted" style="background-color: #3b82f6;color: white;font-weight: bold;padding: 0.5rem 1rem;border-radius: 0.5rem;margin-right: 12px;">Accept</a>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/quotations/${quotation.id}/denied" style="background-color: #fb2c36;color: white;font-weight: bold;padding: 0.5rem 1rem;border-radius: 0.5rem;margin-right: 12px;">Deny</a>
           </div>`,
  })

  return quotation
}

export async function updateQuotationStatus(id: number, status: string) {
  const quotation = await prisma.quotation.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  })

  return quotation
}
