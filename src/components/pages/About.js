

import React from 'react';
import { Users, Target, Heart, Award, Mail, Linkedin, Twitter } from 'lucide-react';
import '../../assets/css/AboutUs.css';

export const AboutUs = () => {
  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '10+', label: 'Years Experience' },
    { number: '50+', label: 'Team Members' },
    { number: '1000+', label: 'Projects Completed' }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that drive success.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong relationships with our clients.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion',
      description: 'Our dedication and enthusiasm fuel everything we do, ensuring exceptional results.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards of quality in every project we undertake.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      bio: 'Visionary leader with 15+ years in tech industry'
    },
    {
      name: 'Priya Sharma',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: 'Expert in cutting-edge technologies and innovation'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      bio: 'Creative genius behind our stunning designs'
    },
    {
      name: 'Sneha Reddy',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Strategic thinker driving brand growth'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About Our Company</h1>
          <p className="hero-subtitle">
            Building tomorrow's solutions today with innovation, passion, and dedication
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p className="story-text">
                Founded in 2014, our company began with a simple vision: to transform businesses 
                through innovative technology solutions. What started as a small team of passionate 
                developers has grown into a leading tech firm serving clients worldwide.
              </p>
              <p className="story-text">
                Over the years, we've helped hundreds of companies achieve their digital transformation 
                goals, delivering exceptional results and building lasting partnerships.
              </p>
              <p className="story-text">
                Today, we continue to push boundaries, embracing new technologies and methodologies 
                to stay at the forefront of innovation.
              </p>
            </div>
            <div className="story-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Team collaboration"
                className="story-image"
              />
              <div className="story-badge">
                <p className="story-badge-number">10+</p>
                <p className="story-badge-text">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="mission-vision-icon mission-icon-bg">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="mission-vision-title">Our Mission</h3>
              <p className="mission-vision-text">
                To empower businesses with cutting-edge technology solutions that drive growth, 
                efficiency, and innovation. We're committed to delivering excellence in every 
                project and building lasting relationships with our clients.
              </p>
            </div>
            <div className="vision-card">
              <div className="mission-vision-icon vision-icon-bg">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="mission-vision-title">Our Vision</h3>
              <p className="mission-vision-text">
                To be the global leader in technology innovation, recognized for our exceptional 
                solutions, outstanding customer service, and positive impact on businesses worldwide. 
                We envision a future where technology seamlessly enhances every aspect of business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="values-container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do and shape our company culture
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            The talented individuals behind our success
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-image"
                />
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-social">
                    <button className="social-button">
                      <Linkedin className="social-icon" />
                    </button>
                    <button className="social-button">
                      <Twitter className="social-icon" />
                    </button>
                    <button className="social-button">
                      <Mail className="social-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Work With Us?</h2>
          <p className="cta-text">
            Let's collaborate and bring your vision to life. Get in touch with our team today!
          </p>
          <div className="cta-buttons">
            <button className="cta-button-primary">Contact Us</button>
            <button className="cta-button-secondary">View Portfolio</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Default export
export default AboutUs;