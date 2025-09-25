export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bids: {
        Row: {
          created_at: string
          currency: string
          driver_id: string | null
          driver_user_id: string | null
          estimated_pickup_time: string | null
          id: string
          message: string | null
          price_tnd: number
          request_id: string | null
          status: Database["public"]["Enums"]["bid_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          driver_id?: string | null
          driver_user_id?: string | null
          estimated_pickup_time?: string | null
          id?: string
          message?: string | null
          price_tnd: number
          request_id?: string | null
          status?: Database["public"]["Enums"]["bid_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          driver_id?: string | null
          driver_user_id?: string | null
          estimated_pickup_time?: string | null
          id?: string
          message?: string | null
          price_tnd?: number
          request_id?: string | null
          status?: Database["public"]["Enums"]["bid_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "public_driver_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "transfer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          bid_id: string | null
          commission_rate: number | null
          created_at: string
          currency: string
          customer_id: string | null
          driver_earnings: number | null
          driver_id: string | null
          id: string
          payment_status: string | null
          platform_fee: number | null
          request_id: string | null
          stripe_session_id: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          bid_id?: string | null
          commission_rate?: number | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          driver_earnings?: number | null
          driver_id?: string | null
          id?: string
          payment_status?: string | null
          platform_fee?: number | null
          request_id?: string | null
          stripe_session_id?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          bid_id?: string | null
          commission_rate?: number | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          driver_earnings?: number | null
          driver_id?: string | null
          id?: string
          payment_status?: string | null
          platform_fee?: number | null
          request_id?: string | null
          stripe_session_id?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_bid_id_fkey"
            columns: ["bid_id"]
            isOneToOne: false
            referencedRelation: "bids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "public_driver_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "transfer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          created_at: string
          id: string
          message: string
          read_at: string | null
          request_id: string
          sender_id: string
          sender_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read_at?: string | null
          request_id: string
          sender_id: string
          sender_type: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read_at?: string | null
          request_id?: string
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "transfer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          coverage_areas: string[]
          created_at: string
          email: string
          full_name: string
          id: string
          insurance_number: string
          is_online: boolean | null
          license_number: string
          phone: string
          rating: number | null
          status: Database["public"]["Enums"]["driver_status"]
          total_trips: number | null
          updated_at: string
          user_id: string | null
          vehicle_class: Database["public"]["Enums"]["vehicle_class"]
          vehicle_color: string
          vehicle_make: string
          vehicle_model: string
          vehicle_plate: string
          vehicle_year: number
        }
        Insert: {
          coverage_areas: string[]
          created_at?: string
          email: string
          full_name: string
          id?: string
          insurance_number: string
          is_online?: boolean | null
          license_number: string
          phone: string
          rating?: number | null
          status?: Database["public"]["Enums"]["driver_status"]
          total_trips?: number | null
          updated_at?: string
          user_id?: string | null
          vehicle_class?: Database["public"]["Enums"]["vehicle_class"]
          vehicle_color: string
          vehicle_make: string
          vehicle_model: string
          vehicle_plate: string
          vehicle_year: number
        }
        Update: {
          coverage_areas?: string[]
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          insurance_number?: string
          is_online?: boolean | null
          license_number?: string
          phone?: string
          rating?: number | null
          status?: Database["public"]["Enums"]["driver_status"]
          total_trips?: number | null
          updated_at?: string
          user_id?: string | null
          vehicle_class?: Database["public"]["Enums"]["vehicle_class"]
          vehicle_color?: string
          vehicle_make?: string
          vehicle_model?: string
          vehicle_plate?: string
          vehicle_year?: number
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          email_notifications: boolean | null
          id: string
          push_notifications: boolean | null
          sms_notifications: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transfer_requests: {
        Row: {
          created_at: string
          customer_email: string
          customer_id: string | null
          customer_phone: string | null
          distance_km: number | null
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          estimated_duration: number | null
          flight_number: string | null
          id: string
          luggage: number
          passengers: number
          pickup_address: string
          pickup_date: string
          pickup_lat: number
          pickup_lng: number
          pickup_time: string
          selected_bid_id: string | null
          special_requirements: string | null
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_id?: string | null
          customer_phone?: string | null
          distance_km?: number | null
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          estimated_duration?: number | null
          flight_number?: string | null
          id?: string
          luggage?: number
          passengers?: number
          pickup_address: string
          pickup_date: string
          pickup_lat: number
          pickup_lng: number
          pickup_time: string
          selected_bid_id?: string | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_id?: string | null
          customer_phone?: string | null
          distance_km?: number | null
          dropoff_address?: string
          dropoff_lat?: number
          dropoff_lng?: number
          estimated_duration?: number | null
          flight_number?: string | null
          id?: string
          luggage?: number
          passengers?: number
          pickup_address?: string
          pickup_date?: string
          pickup_lat?: number
          pickup_lng?: number
          pickup_time?: string
          selected_bid_id?: string | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_selected_bid"
            columns: ["selected_bid_id"]
            isOneToOne: false
            referencedRelation: "bids"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_driver_listings: {
        Row: {
          coverage_areas: string[] | null
          created_at: string | null
          id: string | null
          is_online: boolean | null
          rating: number | null
          total_trips: number | null
          vehicle_class: Database["public"]["Enums"]["vehicle_class"] | null
          vehicle_color: string | null
          vehicle_make: string | null
          vehicle_model: string | null
          vehicle_year: number | null
        }
        Insert: {
          coverage_areas?: string[] | null
          created_at?: string | null
          id?: string | null
          is_online?: boolean | null
          rating?: number | null
          total_trips?: number | null
          vehicle_class?: Database["public"]["Enums"]["vehicle_class"] | null
          vehicle_color?: string | null
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: number | null
        }
        Update: {
          coverage_areas?: string[] | null
          created_at?: string | null
          id?: string | null
          is_online?: boolean | null
          rating?: number | null
          total_trips?: number | null
          vehicle_class?: Database["public"]["Enums"]["vehicle_class"] | null
          vehicle_color?: string | null
          vehicle_make?: string | null
          vehicle_model?: string | null
          vehicle_year?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      approve_driver: {
        Args: { driver_id: string }
        Returns: undefined
      }
      get_driver_visible_requests: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          distance_km: number
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          estimated_duration: number
          flight_number: string
          id: string
          luggage: number
          passengers: number
          pickup_address: string
          pickup_date: string
          pickup_lat: number
          pickup_lng: number
          pickup_time: string
          selected_bid_id: string
          special_requirements: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "driver" | "customer"
      bid_status: "pending" | "accepted" | "rejected" | "withdrawn"
      driver_status: "pending" | "approved" | "suspended" | "rejected"
      request_status:
        | "pending"
        | "active"
        | "completed"
        | "cancelled"
        | "confirmed"
      vehicle_class:
        | "economy"
        | "comfort"
        | "business"
        | "luxury"
        | "van"
        | "minibus"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "driver", "customer"],
      bid_status: ["pending", "accepted", "rejected", "withdrawn"],
      driver_status: ["pending", "approved", "suspended", "rejected"],
      request_status: [
        "pending",
        "active",
        "completed",
        "cancelled",
        "confirmed",
      ],
      vehicle_class: [
        "economy",
        "comfort",
        "business",
        "luxury",
        "van",
        "minibus",
      ],
    },
  },
} as const
