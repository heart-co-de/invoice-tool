export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customer: {
        Row: {
          city: string
          created_at: string | null
          default_price_per_hour: number
          id: number
          name: string
          name_additional: string
          street: string
          user_id: string
          zip: string
        }
        Insert: {
          city?: string
          created_at?: string | null
          default_price_per_hour: number
          id?: number
          name?: string
          name_additional?: string
          street?: string
          user_id: string
          zip?: string
        }
        Update: {
          city?: string
          created_at?: string | null
          default_price_per_hour?: number
          id?: number
          name?: string
          name_additional?: string
          street?: string
          user_id?: string
          zip?: string
        }
      }
      invoice: {
        Row: {
          created_at: string | null
          customer_id: number
          for_month: number
          for_year: number
          id: number
          invoice_number: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: number
          for_month: number
          for_year: number
          id?: number
          invoice_number: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: number
          for_month?: number
          for_year?: number
          id?: number
          invoice_number?: number
          user_id?: string
        }
      }
      invoice_position: {
        Row: {
          created_at: string | null
          description: string
          id: number
          invoice_id: number
          is_per_hour: boolean
          price: number
          price_per_quantity: number
          quantity: number
          service_date: string
          unit_quantity: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string
          id?: number
          invoice_id: number
          is_per_hour?: boolean
          price: number
          price_per_quantity: number
          quantity: number
          service_date: string
          unit_quantity?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          invoice_id?: number
          is_per_hour?: boolean
          price?: number
          price_per_quantity?: number
          quantity?: number
          service_date?: string
          unit_quantity?: string
          user_id?: string
        }
      }
      user_data: {
        Row: {
          bank_account_holder: string
          bank_bic: string
          bank_iban: string
          bank_name: string
          city: string
          company_name: string
          created_at: string | null
          email: string
          mobile: string
          name: string
          no_sales_tax: boolean
          street: string
          tax_id: string
          tax_office: string
          tel: string
          user_id: string
          zip: string
        }
        Insert: {
          bank_account_holder?: string
          bank_bic?: string
          bank_iban?: string
          bank_name?: string
          city?: string
          company_name?: string
          created_at?: string | null
          email?: string
          mobile?: string
          name?: string
          no_sales_tax: boolean
          street?: string
          tax_id?: string
          tax_office?: string
          tel?: string
          user_id: string
          zip?: string
        }
        Update: {
          bank_account_holder?: string
          bank_bic?: string
          bank_iban?: string
          bank_name?: string
          city?: string
          company_name?: string
          created_at?: string | null
          email?: string
          mobile?: string
          name?: string
          no_sales_tax?: boolean
          street?: string
          tax_id?: string
          tax_office?: string
          tel?: string
          user_id?: string
          zip?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
