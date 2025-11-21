import { db } from '~/db'
import { leads, productLeads } from '~/db/schema'
import { defineEventHandler } from 'h3'
import { desc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allLeads = await db.select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .execute()

    const productLeadsData = await db.select()
      .from(productLeads)
      .execute()

    const productLeadsMap = new Map()
    productLeadsData.forEach(item => {
      if (!productLeadsMap.has(item.leadId)) {
        productLeadsMap.set(item.leadId, [])
      }
      productLeadsMap.get(item.leadId).push(item.productId)
    })

    const enrichedLeads = allLeads.map(lead => ({
      ...lead,
      productIds: productLeadsMap.get(lead.id) || []
    }))

    return { 
      leads: enrichedLeads,
      count: enrichedLeads.length
    }

  } catch (error: any) {
    console.error('Error fetching leads:', error)
    
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
})