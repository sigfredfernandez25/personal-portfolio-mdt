const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./config/supabase');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

// API endpoint to get portfolio data
app.get('/api/portfolio-data', async (req, res) => {
    try {
        // Fetch portfolio data from Supabase
        const { data, error } = await supabase
            .from('portfolio')
            .select('portfolio_data')
            .eq('id', 1)
            .maybeSingle(); // Use maybeSingle() instead of single() to handle 0 rows gracefully

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to read portfolio data' });
        }

        if (!data) {
            // Return empty portfolio structure if no data exists yet
            return res.json({
                personal: {
                    name: "",
                    degree: "",
                    major: "",
                    email: "",
                    phone: "",
                    address: "",
                    facebook: "",
                    linkedin: "",
                    nationality: "",
                    age: "",
                    introduction: "",
                    teachingPhilosophy: "",
                    closingMessage: ""
                },
                education: [],
                skills: [],
                works: [],
                contact: {
                    sectionDescription: "",
                    aboutDescription: "",
                    skillsDescription: "",
                    worksDescription: ""
                }
            });
        }

        // Return only the portfolio_data column (maintains same API response structure)
        res.json(data.portfolio_data);
    } catch (error) {
        console.error('Error reading portfolio data:', error);
        res.status(500).json({ error: 'Failed to read portfolio data' });
    }
});

// API endpoint to save portfolio data
app.post('/api/portfolio-data', async (req, res) => {
    try {
        const portfolioData = req.body;
        
        // Validate data structure (basic validation)
        if (!portfolioData.personal || !portfolioData.education || !portfolioData.skills) {
            return res.status(400).json({ error: 'Invalid data structure' });
        }
        
        // Upsert portfolio data in Supabase (insert if not exists, update if exists)
        const { error } = await supabase
            .from('portfolio')
            .upsert({ 
                id: 1,
                portfolio_data: portfolioData,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id'
            });

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to save portfolio data' });
        }
        
        res.json({ success: true, message: 'Portfolio data saved successfully' });
    } catch (error) {
        console.error('Error saving portfolio data:', error);
        res.status(500).json({ error: 'Failed to save portfolio data' });
    }
});

// PATCH endpoints for granular updates (optional but recommended)
app.patch('/api/portfolio/personal', async (req, res) => {
    try {
        // Get current portfolio data
        const { data: currentData, error: fetchError } = await supabase
            .from('portfolio')
            .select('portfolio_data')
            .eq('id', 1)
            .single();

        if (fetchError || !currentData) {
            return res.status(500).json({ error: 'Failed to fetch current portfolio data' });
        }

        // Update only personal section
        const updatedPortfolio = {
            ...currentData.portfolio_data,
            personal: { ...currentData.portfolio_data.personal, ...req.body }
        };

        // Save back to Supabase
        const { error: updateError } = await supabase
            .from('portfolio')
            .update({ 
                portfolio_data: updatedPortfolio,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        if (updateError) {
            return res.status(500).json({ error: 'Failed to update personal data' });
        }

        res.json({ success: true, data: updatedPortfolio });
    } catch (error) {
        console.error('Error updating personal data:', error);
        res.status(500).json({ error: 'Failed to update personal data' });
    }
});

app.patch('/api/portfolio/education', async (req, res) => {
    try {
        const { data: currentData, error: fetchError } = await supabase
            .from('portfolio')
            .select('portfolio_data')
            .eq('id', 1)
            .single();

        if (fetchError || !currentData) {
            return res.status(500).json({ error: 'Failed to fetch current portfolio data' });
        }

        const updatedPortfolio = {
            ...currentData.portfolio_data,
            education: req.body
        };

        const { error: updateError } = await supabase
            .from('portfolio')
            .update({ 
                portfolio_data: updatedPortfolio,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        if (updateError) {
            return res.status(500).json({ error: 'Failed to update education data' });
        }

        res.json({ success: true, data: updatedPortfolio });
    } catch (error) {
        console.error('Error updating education data:', error);
        res.status(500).json({ error: 'Failed to update education data' });
    }
});

app.patch('/api/portfolio/skills', async (req, res) => {
    try {
        const { data: currentData, error: fetchError } = await supabase
            .from('portfolio')
            .select('portfolio_data')
            .eq('id', 1)
            .single();

        if (fetchError || !currentData) {
            return res.status(500).json({ error: 'Failed to fetch current portfolio data' });
        }

        const updatedPortfolio = {
            ...currentData.portfolio_data,
            skills: req.body
        };

        const { error: updateError } = await supabase
            .from('portfolio')
            .update({ 
                portfolio_data: updatedPortfolio,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        if (updateError) {
            return res.status(500).json({ error: 'Failed to update skills data' });
        }

        res.json({ success: true, data: updatedPortfolio });
    } catch (error) {
        console.error('Error updating skills data:', error);
        res.status(500).json({ error: 'Failed to update skills data' });
    }
});

app.patch('/api/portfolio/works', async (req, res) => {
    try {
        const { data: currentData, error: fetchError } = await supabase
            .from('portfolio')
            .select('portfolio_data')
            .eq('id', 1)
            .single();

        if (fetchError || !currentData) {
            return res.status(500).json({ error: 'Failed to fetch current portfolio data' });
        }

        const updatedPortfolio = {
            ...currentData.portfolio_data,
            works: req.body
        };

        const { error: updateError } = await supabase
            .from('portfolio')
            .update({ 
                portfolio_data: updatedPortfolio,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        if (updateError) {
            return res.status(500).json({ error: 'Failed to update works data' });
        }

        res.json({ success: true, data: updatedPortfolio });
    } catch (error) {
        console.error('Error updating works data:', error);
        res.status(500).json({ error: 'Failed to update works data' });
    }
});

app.patch('/api/portfolio/contact', async (req, res) => {
    try {
        const { data: currentData, error: fetchError } = await supabase
            .from('portfolio')
            .select('portfolio_data')
            .eq('id', 1)
            .single();

        if (fetchError || !currentData) {
            return res.status(500).json({ error: 'Failed to fetch current portfolio data' });
        }

        const updatedPortfolio = {
            ...currentData.portfolio_data,
            contact: { ...currentData.portfolio_data.contact, ...req.body }
        };

        const { error: updateError } = await supabase
            .from('portfolio')
            .update({ 
                portfolio_data: updatedPortfolio,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        if (updateError) {
            return res.status(500).json({ error: 'Failed to update contact data' });
        }

        res.json({ success: true, data: updatedPortfolio });
    } catch (error) {
        console.error('Error updating contact data:', error);
        res.status(500).json({ error: 'Failed to update contact data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
    console.log('Connected to Supabase database');
    console.log('You can now edit your portfolio content and save changes!');
});