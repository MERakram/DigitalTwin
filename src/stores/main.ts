import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    articles: [
      {
        id: 1,
        title: 'Advanced NLP for Small Businesses',
        price: 499,
        author: 'Dr. Sarah Chen',
        preview: 'A comprehensive NLP solution tailored for small business customer service automation. Includes sentiment analysis, intent recognition, and automated response generation.',
        category: 'Natural Language Processing'
      },
      {
        id: 2,
        title: 'Computer Vision for Retail Analytics',
        price: 799,
        author: 'Prof. James Wilson',
        preview: 'Implement smart retail analytics with our pre-trained computer vision models. Track customer behavior, optimize store layouts, and enhance security.',
        category: 'Computer Vision'
      },
      {
        id: 3,
        title: 'Predictive Analytics Suite',
        price: 599,
        author: 'Dr. Emily Rodriguez',
        preview: 'Leverage machine learning to forecast sales, optimize inventory, and identify business opportunities with our easy-to-use analytics dashboard.',
        category: 'Machine Learning'
      },
      {
        id: 4,
        title: 'Smart Document Processing',
        price: 399,
        author: 'Prof. Michael Chang',
        preview: 'Automate document processing with AI. Extract data from invoices, receipts, and forms with high accuracy. Includes OCR and data validation.',
        category: 'Data Analytics'
      }
    ]
  })
})