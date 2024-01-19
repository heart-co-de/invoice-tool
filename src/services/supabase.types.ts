export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customer: {
        Row: {
          city: string
          created_at: string | null
          default_price_per_hour: number
          ical_url: string | null
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
          ical_url?: string | null
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
          ical_url?: string | null
          id?: number
          name?: string
          name_additional?: string
          street?: string
          user_id?: string
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "invoice_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      invoice_position: {
        Row: {
          created_at: string | null
          description: string
          id: number
          invoice_id: number
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
          price?: number
          price_per_quantity?: number
          quantity?: number
          service_date?: string
          unit_quantity?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_position_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoice"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_position_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "user_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_calendar_data: {
        Args: {
          calendar_url: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
