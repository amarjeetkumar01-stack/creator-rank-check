import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SHEET_ID = "10EySb221TzSn8zDzmAyMg16jvdiwmA1TAtxnzGdEuGw";

// Tier priority from highest to lowest
const TIER_PRIORITY = ["titan", "commander", "warrior", "degen"];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!apiKey) {
      console.error("GOOGLE_SHEETS_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email } = await req.json();
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Looking up email: ${email}`);

    // Fetch all data from Sheet1
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${apiKey}`;
    const sheetsRes = await fetch(url);

    if (!sheetsRes.ok) {
      const errorText = await sheetsRes.text();
      console.error(`Google Sheets API error [${sheetsRes.status}]: ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from sheet" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sheetsData = await sheetsRes.json();
    const rows: string[][] = sheetsData.values || [];

    if (rows.length < 2) {
      console.log("Sheet has no data rows");
      return new Response(
        JSON.stringify({ found: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Headers: name, degen, warrior, commander, titan, x username, telegram, gmail
    const headers = rows[0].map((h: string) => h.toLowerCase().trim());
    const gmailIdx = headers.findIndex((h: string) => h === "gmail" || h === "email");
    const nameIdx = headers.findIndex((h: string) => h === "name" || h === "creator_name" || h === "creator name");

    // Find tier column indices
    const tierIndices: Record<string, number> = {};
    for (const tier of TIER_PRIORITY) {
      const idx = headers.findIndex((h: string) => h === tier);
      if (idx !== -1) tierIndices[tier] = idx;
    }

    console.log(`Column indices - gmail: ${gmailIdx}, name: ${nameIdx}, tiers:`, tierIndices);

    if (gmailIdx === -1) {
      console.error("Gmail/email column not found in sheet. Headers:", headers);
      return new Response(
        JSON.stringify({ error: "Sheet format error: email column not found" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Search for the email
    const normalizedEmail = email.toLowerCase().trim();
    const matchRow = rows.slice(1).find(
      (row: string[]) => row[gmailIdx] && row[gmailIdx].toLowerCase().trim() === normalizedEmail
    );

    if (!matchRow) {
      console.log(`No match found for ${normalizedEmail}`);
      return new Response(
        JSON.stringify({ found: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const creatorName = nameIdx !== -1 ? matchRow[nameIdx] || "Creator" : "Creator";

    // Determine tier: check each tier column for a truthy value (highest priority first)
    let tier = "Degen"; // default
    for (const t of TIER_PRIORITY) {
      const idx = tierIndices[t];
      if (idx !== undefined && matchRow[idx]) {
        const val = matchRow[idx].trim().toLowerCase();
        // Consider any non-empty, non-zero, non-"no", non-"false" value as truthy
        if (val && val !== "0" && val !== "no" && val !== "false" && val !== "n/a") {
          tier = t.charAt(0).toUpperCase() + t.slice(1); // Capitalize
          break;
        }
      }
    }

    console.log(`Match found - name: ${creatorName}, tier: ${tier}`);

    return new Response(
      JSON.stringify({
        found: true,
        creator_name: creatorName,
        tier: tier,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
