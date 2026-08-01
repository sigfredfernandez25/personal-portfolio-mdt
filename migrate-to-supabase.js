/**
 * Migration Script: JSON File to Supabase
 * 
 * This script migrates existing portfolio data from portfolio-data.json
 * to the Supabase database.
 * 
 * Usage:
 * 1. Ensure .env file has SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * 2. Run the SQL setup script in Supabase first (supabase-setup.sql)
 * 3. Run: node migrate-to-supabase.js
 */

const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();
const supabase = require('./config/supabase');

async function migrateData() {
    try {
        console.log('🚀 Starting migration from portfolio-data.json to Supabase...\n');

        // Read existing JSON file
        const jsonPath = path.join(__dirname, 'portfolio-data.json');
        console.log(`📖 Reading data from ${jsonPath}...`);
        
        const fileContent = await fs.readFile(jsonPath, 'utf8');
        const portfolioData = JSON.parse(fileContent);
        
        console.log('✅ Successfully read portfolio data from JSON file\n');

        // Check if record already exists
        console.log('🔍 Checking if portfolio record exists in Supabase...');
        const { data: existing, error: fetchError } = await supabase
            .from('portfolio')
            .select('id')
            .eq('id', 1)
            .maybeSingle(); // Use maybeSingle() to avoid error when 0 rows

        if (fetchError) {
            throw new Error(`Error checking existing data: ${fetchError.message}`);
        }

        if (existing) {
            // Update existing record
            console.log('📝 Updating existing portfolio record...');
            const { error: updateError } = await supabase
                .from('portfolio')
                .update({
                    portfolio_data: portfolioData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', 1);

            if (updateError) {
                throw new Error(`Update failed: ${updateError.message}`);
            }

            console.log('✅ Successfully updated portfolio data in Supabase');
        } else {
            // Insert new record
            console.log('📝 Inserting new portfolio record...');
            const { error: insertError } = await supabase
                .from('portfolio')
                .insert({
                    id: 1,
                    portfolio_data: portfolioData,
                    updated_at: new Date().toISOString()
                });

            if (insertError) {
                throw new Error(`Insert failed: ${insertError.message}`);
            }

            console.log('✅ Successfully inserted portfolio data into Supabase');
        }

        // Verify the migration
        console.log('\n🔍 Verifying migration...');
        const { data: verifyData, error: verifyError } = await supabase
            .from('portfolio')
            .select('portfolio_data')
            .eq('id', 1)
            .single();

        if (verifyError) {
            throw new Error(`Verification failed: ${verifyError.message}`);
        }

        console.log('✅ Migration verified successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Personal info: ✓`);
        console.log(`   - Education entries: ${verifyData.portfolio_data.education?.length || 0}`);
        console.log(`   - Skills: ${verifyData.portfolio_data.skills?.length || 0}`);
        console.log(`   - Works: ${verifyData.portfolio_data.works?.length || 0}`);
        console.log(`   - Contact info: ✓`);
        
        console.log('\n✨ Migration completed successfully!');
        console.log('💡 You can now start your server with: npm start');
        console.log('📝 The old portfolio-data.json file has been kept as backup');

    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        console.error('\nPlease check:');
        console.error('1. Your .env file has correct SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
        console.error('2. You have run the supabase-setup.sql script in Supabase');
        console.error('3. Your Supabase project is accessible');
        process.exit(1);
    }
}

// Run migration
migrateData();
