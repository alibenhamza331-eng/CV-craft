import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Créer le compte admin avec le service role key
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@cvcraft.local',
      password: 'zal3x8976',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin',
        username: 'Admin'
      }
    });

    if (userError) {
      // Si l'utilisateur existe déjà, c'est OK
      if (userError.message.includes('already exists')) {
        console.log('Admin user already exists');
        
        // Récupérer l'utilisateur existant
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
        const adminUser = existingUser?.users.find(u => u.email === 'admin@cvcraft.local');
        
        if (adminUser) {
          // S'assurer qu'il a le rôle admin
          const { error: roleError } = await supabaseAdmin
            .from('user_roles')
            .upsert({ 
              user_id: adminUser.id, 
              role: 'admin' 
            }, {
              onConflict: 'user_id,role'
            });

          if (roleError) {
            console.error('Error assigning admin role:', roleError);
          }
        }

        return new Response(
          JSON.stringify({ message: 'Admin user already exists' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
      
      throw userError;
    }

    // Attribuer le rôle admin
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({ 
        user_id: userData.user.id, 
        role: 'admin' 
      });

    if (roleError) {
      console.error('Error assigning admin role:', roleError);
      throw roleError;
    }

    console.log('Admin user created successfully');

    return new Response(
      JSON.stringify({ message: 'Admin user created successfully', user: userData.user }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error in create-admin function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});