const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

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
        const data = await fs.readFile('portfolio-data.json', 'utf8');
        res.json(JSON.parse(data));
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
        
        // Write to file
        await fs.writeFile('portfolio-data.json', JSON.stringify(portfolioData, null, 2));
        
        res.json({ success: true, message: 'Portfolio data saved successfully' });
    } catch (error) {
        console.error('Error saving portfolio data:', error);
        res.status(500).json({ error: 'Failed to save portfolio data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
    console.log('You can now edit your portfolio content and save changes!');
});