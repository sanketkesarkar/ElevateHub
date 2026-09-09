import React, { useState } from "react";
import "./Aboutus.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SchoolIcon from "@mui/icons-material/School";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import StarsIcon from "@mui/icons-material/Stars";
import Grid from "@mui/material/Grid";

const Aboutus = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    setFormData({
      name: "",
      phone: "",
      email: "",
      notes: "",
    });

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Hritik Singh",
      role: "Co-founder",
      organization: "ElevateHub",
      email: "singh.hr@northeastern.edu",
      imageUrl: "/images/founder1.jpg",
    },
    {
      id: 2,
      name: "Vivek Mishra",
      role: "Co-founder",
      organization: "ElevateHub",
      email: "mishra.viv@northeastern.edu",
      imageUrl: "/images/founder2.jpg",
    },
    {
      id: 3,
      name: "Reva Pethe",
      role: "Co-founder",
      organization: "ElevateHub",
      email: "pethe.r@northeastern.edu",
      imageUrl: "/images/founder3.jpg",
    },
    {
      id: 4,
      name: "Neha Mahangade",
      role: "Co-founder",
      organization: "ElevateHub",
      email: "mahangade.n@northeastern.edu",
      imageUrl: "/images/founder4.jpg",
    },
    {
      id: 5,
      name: "Sanket Kesarkar",
      role: "Co-founder",
      organization: "ElevateHub",
      email: "kesarkar.s@northeastern.edu",
      imageUrl: "/images/founder5.jpg",
    },
  ];

  return (
    <div className="aboutus-container">
      {/* Combined Mission and Vision Section */}
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          marginBottom: "40px",
          backgroundColor: "#6A1B9A",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://source.unsplash.com/random/1600x900/?education,technology')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
            zIndex: 0,
          }}
        />
        <CardContent
          sx={{
            position: "relative",
            zIndex: 1,
            color: "#fff",
            paddingY: { xs: '20px', md:'40px' },
            paddingX:{ xs:'10px', md:'20px' }
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign:'center', color: '#fff' }}>
            Our Mission & Vision
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#FFD700" }}>
                  Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  At ElevateHub, we aim to transform the learning experience by making education more accessible, engaging, and impactful.
                </Typography>
                <Typography variant="body1">
                  We believe that education should be accessible to everyone, regardless of location, financial limitations, or time restrictions.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#FFD700" }}>
                  Vision
                </Typography>
                <Typography variant="body1" paragraph>
                  Our vision is to build a world where quality education is within reach for all, no matter their background or where they live.
                </Typography>
                <Typography variant="body1">
                  We strive to be a trusted ally in the development of learners globally through innovation, inclusivity, and excellence.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Meet Our Team Section */}
      <h1 className="page-title">Meet the Team</h1>
      <div className="team-row">
        {teamMembers.map((person) => (
          <div key={person.id} className="team-card">
            <div className="team-image">
              <img src={person.imageUrl} alt={person.name} className="profile-image" />
            </div>
            <div className="team-details">
              <h3 className="team-name">{person.name}</h3>
              <p className="role">{person.role} at {person.organization}</p>
              <p className="description">{person.description}</p>
              <a href={`mailto:${person.email}`} className="email-button">Contact</a>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Us Form */}
      <div className="contact-us-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Message</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Your message"
              required
            />
          </div>

          <button type="submit" className="submit-button">Send</button>
        </form>

        {isSubmitted && (
          <p className="submission-feedback">Thanks for reaching out to us!</p>
        )}
      </div>
    </div>
  );
};

export default Aboutus;
