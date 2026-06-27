export type AirdropStatus = "upcoming" | "active" | "expired";
export type EventType = "view" | "click";

export interface AirdropStep {
  title: string;
  description: string;
}

export interface Database {
  public: {
    Tables: {
      airdrops: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          category: string;
          chain: string | null;
          status: AirdropStatus;
          steps: AirdropStep[];
          reward_estimate: string | null;
          redirect_url: string;
          launch_date: string | null;
          expiry_date: string | null;
          featured: boolean;
          cover_image_url: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["airdrops"]["Row"]> & {
          title: string;
          slug: string;
          redirect_url: string;
        };
        Update: Partial<Database["public"]["Tables"]["airdrops"]["Row"]>;
        Relationships: [];
      };
      airdrop_images: {
        Row: {
          id: string;
          airdrop_id: string;
          storage_path: string;
          url: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["airdrop_images"]["Row"]> & {
          airdrop_id: string;
          storage_path: string;
          url: string;
        };
        Update: Partial<Database["public"]["Tables"]["airdrop_images"]["Row"]>;
        Relationships: [];
      };
      airdrop_events: {
        Row: {
          id: number;
          airdrop_id: string;
          event_type: EventType;
          viewer_hash: string;
          viewed_date: string;
          created_at: string;
        };
        Insert: {
          airdrop_id: string;
          event_type: EventType;
          viewer_hash: string;
        };
        Update: Partial<Database["public"]["Tables"]["airdrop_events"]["Row"]>;
        Relationships: [];
      };
      comments: {
        Row: {
          id: string;
          airdrop_id: string;
          parent_id: string | null;
          author_name: string;
          content: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          airdrop_id: string;
          parent_id?: string | null;
          author_name?: string;
          content: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Row"]>;
        Relationships: [];
      };
      ad_placements: {
        Row: {
          id: string;
          slot_key: string;
          name: string;
          script_html: string;
          active: boolean;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["ad_placements"]["Row"]> & {
          slot_key: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["ad_placements"]["Row"]>;
        Relationships: [];
      };
    };
    Views: {
      airdrop_hot_scores: {
        Row: {
          airdrop_id: string;
          views_7d: number;
          clicks_7d: number;
          hot_score: number;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
  };
}

export type Airdrop = Database["public"]["Tables"]["airdrops"]["Row"];
export type AirdropImage = Database["public"]["Tables"]["airdrop_images"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type AdPlacement = Database["public"]["Tables"]["ad_placements"]["Row"];
