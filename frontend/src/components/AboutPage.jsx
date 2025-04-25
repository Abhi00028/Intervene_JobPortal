import React from "react";
import { motion } from "framer-motion";
import "./AboutPage.css";

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Abhishek Bhardwaj",
      role: "Project Lead, Lead Developer",
      bio: "Orchestrated the entire project architecture and led the development team to build a robust, scalable application with cutting-edge technologies.",
      image: "../assets/abhishek.jpeg",
      color: "rgba(56, 182, 255, 0.2)",
    },
    {
      id: 2,
      name: "Kavreet Kaur",
      role: "Lead Web Designer",
      bio: "Crafted the stunning UI/UX design with intuitive user flows and modern aesthetics that elevate the user experience to premium standards.",
      image: "../assets/kavreet.jpeg",
      color: "rgba(255, 56, 182, 0.2)",
    },
    {
      id: 3,
      name: "Vinyake Rattan",
      role: "Documentation Expert, Cross-Platform Analysis",
      bio: "Ensured seamless documentation and conducted comprehensive cross-platform testing to guarantee flawless performance across all devices.",
      image: "../assets/vinyake.jpeg",
      color: "rgba(182, 56, 255, 0.2)",
    },
    {
      id: 4,
      name: "Onyeka",
      role: "Database Engineer, Technical Documentation",
      bio: "Architected the high-performance database systems and maintained meticulous technical documentation for future scalability.",
      image: "../assets/onyeka.jpeg",
      color: "rgba(56, 255, 182, 0.2)",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="about-page">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Meet The Team</h1>
        <p>The brilliant minds behind this project</p>
      </motion.div>

      <motion.div
        className="team-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            className="team-card"
            variants={itemVariants}
            whileHover="hover"
            style={{ "--card-color": member.color }}
          >
            <div className="card-image-container">
              <div className="image-border"></div>
              <img src={member.image} alt={member.name} className="team-image" />
              <div className="glow-effect"></div>
            </div>
            <div className="card-content">
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
            <div className="card-background"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AboutPage;