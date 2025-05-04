"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();
  
  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Add current timestamp to the form data
    const timestamp = new Date().toLocaleString();
    const formElement = formRef.current;
    
    // Create a hidden input for time if it doesn't exist yet
    if (!formElement.querySelector('input[name="time"]')) {
      const timeInput = document.createElement('input');
      timeInput.type = 'hidden';
      timeInput.name = 'time';
      formElement.appendChild(timeInput);
    }
    
    // Set the value of the time input
    formElement.querySelector('input[name="time"]').value = timestamp;

    // Replace these with your actual EmailJS Service ID, Template ID, and Public Key
    // You can get these by signing up at https://www.emailjs.com/
    const serviceId = 'service_5r8c7gf';
    const templateId = 'template_l1reqms';
    const publicKey = 'f9W8ZQKViEncuGymt';

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        // Remove the time input after sending
        const timeInput = formElement.querySelector('input[name="time"]');
        if (timeInput) timeInput.remove();
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
        setIsSubmitting(false);
        setSubmitStatus('error');
        // Remove the time input after sending
        const timeInput = formElement.querySelector('input[name="time"]');
        if (timeInput) timeInput.remove();
      });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="navbar flex justify-between items-center px-6 py-4 lg:px-20">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gradient">Harindu Weligepola</h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-[#ff3399] transition-colors">About Me</a>
          <a href="#services" className="hover:text-[#ff3399] transition-colors">Services</a>
          <a href="#projects" className="hover:text-[#ff3399] transition-colors">Projects</a>
        </div>
        <div>
          <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact Me</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-20 lg:py-20 relative">
        {/* Gradient background effect */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#ff00ff] opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff3399] opacity-20 blur-[100px] rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <h2 className="text-[#ff3399] font-medium text-lg mb-4">Digital designer</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Designed for delight<br />Built to be loved.
            </h1>
            <p className="text-gray-300 mb-8 max-w-lg">
              I'm an expert in photo and video editing, gaming, full stack development, and 
              innovative IT solutions. I push creative boundaries and create elegant user experiences.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary flex items-center gap-2" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                <span>Book a Call</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33331 8H12.6666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-xl overflow-hidden border border-[#ff3399] glow-effect">
              {/* Profile image */}
              <Image 
                src="https://media-hosting.imagekit.io/0174ba54bf704cc2/pro%20pic.jpg?Expires=1840550555&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fzqxqKOCRqBn~5L30oUp1Xosl45ozKGh07bHrhn2u1xWRWtB5D68-svnE6O86MrhGB-TLIGExF6KawbV~bCvRVWxKp0bv4GSVMd~lKwASSQpjQDQx2okHM5Svns9tpz~Jk1uVcFD5ayp502gfzwiuVDAGsjz2FCyrJjhVUMuNUqdTV8bQC-QX8HxN~TocpXlKYxCrYSgq4ApRRYMyzJJ-ub3CO~ywdWKz-UbPr1fBnvHUrqfd6OVASVQueUth1vwbqoAJWTPcFLoIxWkpZp-NyQYqGui-aG86BfmMhxfwFC8XIdTiA2msJhxmzRQJxYW4WgJUnbwc5WCEqLnyQfLpw__" 
                alt="Profile Image" 
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 lg:px-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Services <span className="text-[#ff3399]">I believe in</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Hi! I'm a multi-talented expert with skills in various digital domains.
            I create innovative solutions for fast-growing brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="card p-6 group">
            <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-[rgba(255,0,255,0.2)] text-[#ff3399]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff3399] transition-colors">Photo & Video Editing</h3>
            <p className="text-gray-400">
              I create stunning visual content with professional editing techniques, color grading, 
              and special effects for photos and videos.
            </p>
          </div>

          {/* Service 2 */}
          <div className="card p-6 group">
            <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-[rgba(255,0,255,0.2)] text-[#ff3399]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 2H7C4.79086 2 3 3.79086 3 6V18C3 20.2091 4.79086 22 7 22H17C19.2091 22 21 20.2091 21 18V6C21 3.79086 19.2091 2 17 2Z" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 8H16" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 16H12" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff3399] transition-colors">Full Stack Development</h3>
            <p className="text-gray-400">
              I build modern, responsive web applications with cutting-edge technologies
              for both frontend and backend development.
            </p>
          </div>

          {/* Service 3 */}
          <div className="card p-6 group">
            <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-[rgba(255,0,255,0.2)] text-[#ff3399]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.58984 13.5098L15.4198 17.4898" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.4098 6.50977L8.58984 10.4898" stroke="#ff3399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff3399] transition-colors">Gaming & IT Innovation</h3>
            <p className="text-gray-400">
              I combine gaming expertise with technological innovation to create
              immersive experiences and cutting-edge IT solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6 lg:px-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold">
            <span className="text-[#ff3399]">Featured</span> Projects
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl">
            A selection of my recent work across different domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div 
            className="card overflow-hidden group cursor-pointer" 
            onClick={() => openModal({
              title: "Kashly - Financial App",
              description: "A Professional finance app with a modern and clean design. That has created a new way to manage your money. Implemented using Kotlin, with Android Studio.",
              image: "https://media-hosting.imagekit.io/f4e0cb10b32f4e8b/kashly%20project.jpg?Expires=1840552851&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Tg8CvbfhrbK-xnFteIDzzx8ZzTY4Y~RzH0zzDU2jFT0NHnXipFrws64LOWOgz8x~asXuCh5phSqAyTWWkl7SymbkYdveDB5vBNJeVUhYOjnr-LF5Oep1Z0iWbBqK3cOO3~wPrxXPZZ5sopLoO1JnbLV-uobqrZqCMuM0WQmqyVlejJ4sdUvXHiBU~vtPH2gSPxKXi5KJ5Km-WAJ2pcy1Jk7DMtfaO1Ih4xuCoHAZn9hm5ccaSTnIA0VHejIhS9d8KOu9nITP~773XcWUdMDf7C2GuXLgDMOmUlaZHd6gjpqNCpCZgZRh~LzzS0hiKCybiGTSUJnJCOwwmbBOBS~KTQ__",
              repoUrl: "https://github.com/HarinduWeligepola/Kashly-_Personal-Expense-Tracker-App"
            })}
          >
            <div className="h-48 relative">
              <Image 
                src="https://media-hosting.imagekit.io/f4e0cb10b32f4e8b/kashly%20project.jpg?Expires=1840552851&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Tg8CvbfhrbK-xnFteIDzzx8ZzTY4Y~RzH0zzDU2jFT0NHnXipFrws64LOWOgz8x~asXuCh5phSqAyTWWkl7SymbkYdveDB5vBNJeVUhYOjnr-LF5Oep1Z0iWbBqK3cOO3~wPrxXPZZ5sopLoO1JnbLV-uobqrZqCMuM0WQmqyVlejJ4sdUvXHiBU~vtPH2gSPxKXi5KJ5Km-WAJ2pcy1Jk7DMtfaO1Ih4xuCoHAZn9hm5ccaSTnIA0VHejIhS9d8KOu9nITP~773XcWUdMDf7C2GuXLgDMOmUlaZHd6gjpqNCpCZgZRh~LzzS0hiKCybiGTSUJnJCOwwmbBOBS~KTQ__" 
                alt="Video Editing Portfolio Project" 
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff3399] transition-colors">Kashly - Financial App</h3>
              <p className="text-gray-400 mb-4">
                A Professional finance app with a modern and clean design.
                That has created a new way to manage your money.
                Implemented using Kotlin, with Android Studio.
              </p>
              <a 
                href="#" 
                className="text-[#ff3399] flex items-center gap-2 text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal({
                    title: "Kashly - Financial App",
                    description: "A Professional finance app with a modern and clean design. That has created a new way to manage your money. Implemented using Kotlin, with Android Studio.",
                    image: "https://media-hosting.imagekit.io/f4e0cb10b32f4e8b/kashly%20project.jpg?Expires=1840552851&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Tg8CvbfhrbK-xnFteIDzzx8ZzTY4Y~RzH0zzDU2jFT0NHnXipFrws64LOWOgz8x~asXuCh5phSqAyTWWkl7SymbkYdveDB5vBNJeVUhYOjnr-LF5Oep1Z0iWbBqK3cOO3~wPrxXPZZ5sopLoO1JnbLV-uobqrZqCMuM0WQmqyVlejJ4sdUvXHiBU~vtPH2gSPxKXi5KJ5Km-WAJ2pcy1Jk7DMtfaO1Ih4xuCoHAZn9hm5ccaSTnIA0VHejIhS9d8KOu9nITP~773XcWUdMDf7C2GuXLgDMOmUlaZHd6gjpqNCpCZgZRh~LzzS0hiKCybiGTSUJnJCOwwmbBOBS~KTQ__",
                    repoUrl: "https://github.com/HarinduWeligepola/Kashly-_Personal-Expense-Tracker-App"
                  });
                }}
              >
                <span>View Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33331 8H12.6666" stroke="#ff3399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#ff3399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div 
            className="card overflow-hidden group cursor-pointer" 
            onClick={() => openModal({
              title: "PlumbX - Web App",
              description: "Full stack plumbing service application with delivery management, driver assignment, and customer-facing interfaces. Built with JavaScript, React, Node.js, and MongoDB.",
              image: "https://media-hosting.imagekit.io/69e5222f259b4ff7/IMG_3236.JPEG.jpg?Expires=1840900908&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1Yh2EFTzdzhEUGE-Q0b~c~Srf-sXewBSUw-dUD7PvkMe~YQHPIgpHQWfj-De471yIVAuUN-5BvwuN~oJWOuXYv-Xvu~j2RFHr69ZgWBv3v~qp3tuDY-uC4XxP3Y0Y54KzBlseF3bf9y6ax3YGicRh~89M8lBhAAXNTKWfNpHZqQ88XUo88T~kfVzk1OvNvqix5RFypyzo1wqW7VxXPdjD1wNbWvI-JpmnSDwVotADZFKqF4BGMoVH3~NxC-1y-wwmaKLggbeGgSsIhmUb-cFS~04eUBmocG9rd2piWGN02dVV5~~MXeecUo6ywm~xAqcQ5u44Itd5Vpty76ASMhKPQ__",
              repoUrl: "https://github.com/HarinduWeligepola/PlumbX-Web-App"
            })}
          >
            <div className="h-48 relative">
              <Image 
                src="https://media-hosting.imagekit.io/69e5222f259b4ff7/IMG_3236.JPEG.jpg?Expires=1840900908&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1Yh2EFTzdzhEUGE-Q0b~c~Srf-sXewBSUw-dUD7PvkMe~YQHPIgpHQWfj-De471yIVAuUN-5BvwuN~oJWOuXYv-Xvu~j2RFHr69ZgWBv3v~qp3tuDY-uC4XxP3Y0Y54KzBlseF3bf9y6ax3YGicRh~89M8lBhAAXNTKWfNpHZqQ88XUo88T~kfVzk1OvNvqix5RFypyzo1wqW7VxXPdjD1wNbWvI-JpmnSDwVotADZFKqF4BGMoVH3~NxC-1y-wwmaKLggbeGgSsIhmUb-cFS~04eUBmocG9rd2piWGN02dVV5~~MXeecUo6ywm~xAqcQ5u44Itd5Vpty76ASMhKPQ__" 
                alt="PlumbX Web App" 
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff3399] transition-colors">PlumbX - Web App</h3>
              <p className="text-gray-400 mb-4">
                Full stack plumbing service application with delivery management, driver assignment, and customer-facing interfaces.
              </p>
              <a 
                href="#" 
                className="text-[#ff3399] flex items-center gap-2 text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal({
                    title: "PlumbX - Web App",
                    description: "Full stack plumbing service application with delivery management, driver assignment, and customer-facing interfaces. Built with JavaScript, React, Node.js, and MongoDB.",
                    image: "https://media-hosting.imagekit.io/69e5222f259b4ff7/IMG_3236.JPEG.jpg?Expires=1840900908&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1Yh2EFTzdzhEUGE-Q0b~c~Srf-sXewBSUw-dUD7PvkMe~YQHPIgpHQWfj-De471yIVAuUN-5BvwuN~oJWOuXYv-Xvu~j2RFHr69ZgWBv3v~qp3tuDY-uC4XxP3Y0Y54KzBlseF3bf9y6ax3YGicRh~89M8lBhAAXNTKWfNpHZqQ88XUo88T~kfVzk1OvNvqix5RFypyzo1wqW7VxXPdjD1wNbWvI-JpmnSDwVotADZFKqF4BGMoVH3~NxC-1y-wwmaKLggbeGgSsIhmUb-cFS~04eUBmocG9rd2piWGN02dVV5~~MXeecUo6ywm~xAqcQ5u44Itd5Vpty76ASMhKPQ__",
                    repoUrl: "https://github.com/HarinduWeligepola/PlumbX-Web-App"
                  });
                }}
              >
                <span>View Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33331 8H12.6666" stroke="#ff3399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#ff3399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div 
            className="card overflow-hidden group cursor-pointer" 
            onClick={() => openModal({
              title: "Spendly - Finance Tracker",
              description: "A finance tracking Android app similar to Kashly that helps users monitor their daily expenses with manual input. Designed and implemented using Android Studio with Kotlin.",
              image: "https://media-hosting.imagekit.io/3017aae18ebd4cbc/IMG_3241.JPEG.jpg?Expires=1840908543&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wtFVOBTajhKCZLCHzql6eVFfeBre7oscHGpjEPUcKcr39V4pvXYS6MoxLOK0NONoiOZ96OGFNtp6XVUzVK6-3MLQXTGiZuH3m6jOA1xILPb7X4C1iET-1ugHrEOUEaQ-zzmmM-jN~N1VagdliVqF9oS3PGn2eQZwu1-nPK304bl-Q5IzmPNPEWa5BSUcJL4QR830C~XDAcWehs6vD7v0qeSCRr~W1vfdeTql6MANMMY1LzZaqOfPSCgPrxxn3NH26lTrDq8XiouQonee12lP2Y5vxjSXLb~v3SmO4lQRn7ko2vSpe4H~KJBj-ho1Y4gnim1Bi3UnCdO86pIg4rBNGQ__",
              repoUrl: "https://github.com/HarinduWeligepola/Spendly-Android-app"
            })}
          >
            <div className="h-48 relative">
              <Image 
                src="https://media-hosting.imagekit.io/3017aae18ebd4cbc/IMG_3241.JPEG.jpg?Expires=1840908543&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wtFVOBTajhKCZLCHzql6eVFfeBre7oscHGpjEPUcKcr39V4pvXYS6MoxLOK0NONoiOZ96OGFNtp6XVUzVK6-3MLQXTGiZuH3m6jOA1xILPb7X4C1iET-1ugHrEOUEaQ-zzmmM-jN~N1VagdliVqF9oS3PGn2eQZwu1-nPK304bl-Q5IzmPNPEWa5BSUcJL4QR830C~XDAcWehs6vD7v0qeSCRr~W1vfdeTql6MANMMY1LzZaqOfPSCgPrxxn3NH26lTrDq8XiouQonee12lP2Y5vxjSXLb~v3SmO4lQRn7ko2vSpe4H~KJBj-ho1Y4gnim1Bi3UnCdO86pIg4rBNGQ__" 
                alt="Spendly Android App" 
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff3399] transition-colors">Spendly - Finance Tracker</h3>
              <p className="text-gray-400 mb-4">
                A finance tracking Android app that helps users monitor their daily expenses with manual input, designed using Android Studio.
              </p>
              <a 
                href="#" 
                className="text-[#ff3399] flex items-center gap-2 text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal({
                    title: "Spendly - Finance Tracker",
                    description: "A finance tracking Android app similar to Kashly that helps users monitor their daily expenses with manual input. Designed and implemented using Android Studio with Kotlin.",
                    image: "https://media-hosting.imagekit.io/3017aae18ebd4cbc/IMG_3241.JPEG.jpg?Expires=1840908543&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wtFVOBTajhKCZLCHzql6eVFfeBre7oscHGpjEPUcKcr39V4pvXYS6MoxLOK0NONoiOZ96OGFNtp6XVUzVK6-3MLQXTGiZuH3m6jOA1xILPb7X4C1iET-1ugHrEOUEaQ-zzmmM-jN~N1VagdliVqF9oS3PGn2eQZwu1-nPK304bl-Q5IzmPNPEWa5BSUcJL4QR830C~XDAcWehs6vD7v0qeSCRr~W1vfdeTql6MANMMY1LzZaqOfPSCgPrxxn3NH26lTrDq8XiouQonee12lP2Y5vxjSXLb~v3SmO4lQRn7ko2vSpe4H~KJBj-ho1Y4gnim1Bi3UnCdO86pIg4rBNGQ__",
                    repoUrl: "https://github.com/HarinduWeligepola/Spendly-Android-app"
                  });
                }}
              >
                <span>View Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33331 8H12.6666" stroke="#ff3399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#ff3399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 lg:px-20 relative">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#ff00ff] opacity-10 blur-[100px] rounded-full"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-6">
              About <span className="text-[#ff3399]">Me</span>
            </h2>
            <p className="text-gray-300 mb-4">
              I'm currently a student at SLIIT University, passionate about photo and video editing, gaming, and full stack development. 
              I'm developing my skills in creating digital experiences and building innovative IT solutions.
            </p>
            <p className="text-gray-300 mb-6">
              As I continue my education, I'm focused on expanding my expertise through hands-on projects
              and exploring new technologies. I've completed a few personal projects that have helped me 
              develop practical skills while pursuing my academic studies.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="text-[#ff3399] font-bold text-xl mb-2">02+</h4>
                <p className="text-gray-400">Years of Experience</p>
              </div>
              <div>
                <h4 className="text-[#ff3399] font-bold text-xl mb-2">10+</h4>
                <p className="text-gray-400">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-[#ff3399] font-bold text-xl mb-2">05+</h4>
                <p className="text-gray-400">University Projects</p>
              </div>
              <div>
                <h4 className="text-[#ff3399] font-bold text-xl mb-2">02+</h4>
                <p className="text-gray-400">Personal Projects</p>
              </div>
            </div>
            <a href="https://drive.google.com/file/d/1u-XDMGbbJ0HfQHxwgJIFLesRiVP_p6_4/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-primary">Download CV</a>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-xl overflow-hidden border border-[#ff3399] glow-effect">
              {/* About profile image */}
              <Image 
                src="https://media-hosting.imagekit.io/0174ba54bf704cc2/pro%20pic.jpg?Expires=1840550555&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fzqxqKOCRqBn~5L30oUp1Xosl45ozKGh07bHrhn2u1xWRWtB5D68-svnE6O86MrhGB-TLIGExF6KawbV~bCvRVWxKp0bv4GSVMd~lKwASSQpjQDQx2okHM5Svns9tpz~Jk1uVcFD5ayp502gfzwiuVDAGsjz2FCyrJjhVUMuNUqdTV8bQC-QX8HxN~TocpXlKYxCrYSgq4ApRRYMyzJJ-ub3CO~ywdWKz-UbPr1fBnvHUrqfd6OVASVQueUth1vwbqoAJWTPcFLoIxWkpZp-NyQYqGui-aG86BfmMhxfwFC8XIdTiA2msJhxmzRQJxYW4WgJUnbwc5WCEqLnyQfLpw__" 
                alt="Profile Image" 
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 lg:px-20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Let's <span className="text-[#ff3399]">Connect</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Interested in working together? Let's discuss your project and bring your ideas to life.
          </p>
        </div>

        <div className="max-w-3xl mx-auto card p-8">
          {submitStatus === 'success' && (
            <div className="bg-green-900/30 border border-green-500 text-green-100 p-4 rounded-md mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Message sent successfully! I'll get back to you soon.</span>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-900/30 border border-red-500 text-red-100 p-4 rounded-md mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>There was an error sending your message. Please try again later.</span>
            </div>
          )}
          <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#ff3399] focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#ff3399] focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-300">Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#ff3399] focus:outline-none"
                placeholder="Subject"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-300">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-md p-3 text-white focus:border-[#ff3399] focus:outline-none h-32"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#222] py-12 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4">Harindu Weligepola</h3>
              <p className="text-gray-400 mb-6">
                Creating innovative digital experiences with passion and precision.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.behance.net/harinduweligep" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ff3399] transition-colors">
                  <span className="sr-only">Behance</span>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>
                </a>
                <a href="https://github.com/HarinduWeligepola" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ff3399] transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/harindu-weligepola/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ff3399] transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
                <a href="https://www.instagram.com/__harinduu___/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#ff3399] transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#ff3399] transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-[#ff3399] transition-colors">About</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-[#ff3399] transition-colors">Services</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-[#ff3399] transition-colors">Projects</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#ff3399] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#ff3399] transition-colors">Photo Editing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#ff3399] transition-colors">Video Editing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#ff3399] transition-colors">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#ff3399] transition-colors">Game Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#ff3399] transition-colors">IT Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#ff3399] flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-gray-400">+94 70 371 28 69</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#ff3399] flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-400">harinduweligepola2002@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#ff3399] flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-400">502/20, Colombo road, Ratnapura.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#222] text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Harindu Weligepola. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={closeModal}
        >
          <div 
            className="bg-[#1a1a1a] border border-[#ff3399] rounded-lg w-full max-w-[80%] lg:max-w-[60%] max-h-[90vh] overflow-hidden shadow-glow-strong animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[50vh]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-300 mb-6">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-4">
                {selectedProject.repoUrl && (
                  <a 
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="inline-block">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                    </svg>
                    <span>View on GitHub</span>
                  </a>
                )}
                <button 
                  className="btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
