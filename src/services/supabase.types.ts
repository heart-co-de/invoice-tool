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
          address: string
          created_at: string | null
          ical_url: string
          id: number
          name: string
        }
        Insert: {
          address?: string
          created_at?: string | null
          ical_url?: string
          id?: number
          name: string
        }
        Update: {
          address?: string
          created_at?: string | null
          ical_url?: string
          id?: number
          name?: string
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
