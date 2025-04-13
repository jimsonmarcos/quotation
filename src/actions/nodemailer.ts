'use server'

import nodemailer from 'nodemailer'

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST || 'localhost'
const SMTP_SERVER_PORT = parseInt(process.env.SMTP_SERVER_PORT || '1025')
const SMTP_SECURE = process.env.SMTP_SECURE === 'true'

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: SMTP_SERVER_PORT,
  secure: SMTP_SECURE,
})

export async function sendQuotationMail({
  email,
  sendTo,
  subject,
  html,
}: {
  email: string
  sendTo?: string
  subject: string
  html: string
}) {
  try {
    const isVerified = await transporter.verify()
    if (!isVerified) throw new Error('Transporter verification failed')

    const info = await transporter.sendMail({
      from: email,
      to: sendTo || 'recipient@example.com',
      subject: subject,
      html: html,
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
