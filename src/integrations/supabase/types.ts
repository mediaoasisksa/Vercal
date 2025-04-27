export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_settings: {
        Row: {
          additional_settings: Json | null
          billing_currency: string
          created_at: string
          id: string
          payment_provider: string
          provider_customer_id: string
          subdomain: string
          updated_at: string
        }
        Insert: {
          additional_settings?: Json | null
          billing_currency?: string
          created_at?: string
          id?: string
          payment_provider: string
          provider_customer_id: string
          subdomain: string
          updated_at?: string
        }
        Update: {
          additional_settings?: Json | null
          billing_currency?: string
          created_at?: string
          id?: string
          payment_provider?: string
          provider_customer_id?: string
          subdomain?: string
          updated_at?: string
        }
        Relationships: []
      }
      accounts: {
        Row: {
          account_settings_id: string
          created_at: string
          email: string
          id: string
          password_hash: string
          room_settings_id: string
          updated_at: string
          username: string
        }
        Insert: {
          account_settings_id: string
          created_at?: string
          email: string
          id?: string
          password_hash: string
          room_settings_id: string
          updated_at?: string
          username: string
        }
        Update: {
          account_settings_id?: string
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
          room_settings_id?: string
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_account_settings_id_fkey"
            columns: ["account_settings_id"]
            isOneToOne: true
            referencedRelation: "account_settings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_room_settings_id_fkey"
            columns: ["room_settings_id"]
            isOneToOne: true
            referencedRelation: "room_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      room_settings: {
        Row: {
          additional_settings: Json | null
          created_at: string
          guest_url: string
          id: string
          moderator_url: string
          theme_fonts: Json | null
          theme_images: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          additional_settings?: Json | null
          created_at?: string
          guest_url: string
          id?: string
          moderator_url: string
          theme_fonts?: Json | null
          theme_images?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          additional_settings?: Json | null
          created_at?: string
          guest_url?: string
          id?: string
          moderator_url?: string
          theme_fonts?: Json | null
          theme_images?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          cadence: Database["public"]["Enums"]["subscription_cadence"]
          created_at: string
          currency: string
          description: string | null
          id: string
          is_active: boolean
          price: number
          short_description: string
          title: string
          updated_at: string
        }
        Insert: {
          cadence: Database["public"]["Enums"]["subscription_cadence"]
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          price: number
          short_description: string
          title: string
          updated_at?: string
        }
        Update: {
          cadence?: Database["public"]["Enums"]["subscription_cadence"]
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          price?: number
          short_description?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          account_id: string
          created_at: string
          id: string
          is_active: boolean
          plan_id: string
          start_date: string
          transaction_id: string
          updated_at: string
          valid_till: string
        }
        Insert: {
          account_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          plan_id: string
          start_date?: string
          transaction_id: string
          updated_at?: string
          valid_till: string
        }
        Update: {
          account_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          plan_id?: string
          start_date?: string
          transaction_id?: string
          updated_at?: string
          valid_till?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: string
          amount: number
          created_at: string
          currency: string
          id: string
          provider_ref: string | null
          settled_at: string | null
          tx_type: Database["public"]["Enums"]["tx_type"]
          updated_at: string
        }
        Insert: {
          account_id: string
          amount: number
          created_at?: string
          currency: string
          id?: string
          provider_ref?: string | null
          settled_at?: string | null
          tx_type: Database["public"]["Enums"]["tx_type"]
          updated_at?: string
        }
        Update: {
          account_id?: string
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          provider_ref?: string | null
          settled_at?: string | null
          tx_type?: Database["public"]["Enums"]["tx_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_cadence: "monthly" | "yearly"
      tx_type: "call" | "subscription" | "refund"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_cadence: ["monthly", "yearly"],
      tx_type: ["call", "subscription", "refund"],
    },
  },
} as const
