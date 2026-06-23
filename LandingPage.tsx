import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  Paper,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Styled Hero Section
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(10, 0),
  textAlign: 'center',
  borderRadius: '0 0 50px 50px',
  marginBottom: theme.spacing(6),
}));

const LandingPage = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  // Placeholder fetch for packages (matching your API structure in README)
  useEffect(() => {
    fetch('http://localhost/don-picasos-api/get_packages.php')
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error("Error fetching packages:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send to your PHP API
    console.log("Lead submitted:", formData);
    alert("Thank you! Our franchise manager will contact you soon.");
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* HERO SECTION - Put Main Title and Tagline from DOCX here */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Don Picaso's House of Franchise
          </Typography>
          <Typography variant="h5" paragraph>
            Join the fastest-growing food franchise network. Start your journey to business success today.
          </Typography>
          <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>
            Inquire Now
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        {/* ABOUT SECTION - Put the "About Us" content here */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Why Choose Don Picaso's?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
            [Insert detailed brand description from your DOCX here. Mention the heritage, 
            quality of ingredients, and the unique selling proposition of the franchise.]
          </Typography>
        </Box>

        {/* FRANCHISE PACKAGES - Fetched from your MySQL database */}
        <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
          Franchise Packages
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {packages.length > 0 ? (
            packages.map((pkg: any) => (
              <Grid item xs={12} md={4} key={pkg.id}>
                <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <StorefrontIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h5" component="div" gutterBottom>
                      {pkg.package_name}
                    </Typography>
                    <Typography variant="h6" color="secondary" gutterBottom>
                      ₱{pkg.investment_cost.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pkg.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                Loading available packages...
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* ROI / PROJECTION SECTION */}
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'primary.light', color: 'white', borderRadius: 4, mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Projected ROI
              </Typography>
              <Typography variant="body1">
                [Insert ROI details from DOCX]. Our proven business model typically sees a 
                return on investment within 12-18 months depending on location.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign="center">
              <TrendingUpIcon sx={{ fontSize: 100, opacity: 0.8 }} />
            </Grid>
          </Grid>
        </Paper>

        {/* CONTACT / LEAD FORM */}
        <Box id="contact" sx={{ mb: 10 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Be Our Next Partner
          </Typography>
          <Typography align="center" sx={{ mb: 4 }} color="text.secondary">
            Fill out the form below to receive the full franchise kit.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
            <Stack spacing={3}>
              <TextField 
                fullWidth 
                label="Full Name" 
                required 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <TextField 
                fullWidth 
                label="Email Address" 
                type="email" 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <TextField 
                fullWidth 
                label="Phone Number" 
                required 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <TextField 
                fullWidth 
                label="Target Location" 
                multiline 
                rows={2} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                type="submit"
                startIcon={<AssignmentIcon />}
              >
                Request Franchise Details
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;