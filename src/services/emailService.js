import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend('re_59RKGz6A_PxKkMjkqgyjaiuebsBBN4gsP');

export const sendContactEmail = async (formData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Interior Villa <onboarding@resend.dev>',
      to: ['bdtechnocrats@gmail.com'],
      subject: 'New Contact Form Submission - Interior Villa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #75BF44; margin: 0; font-size: 28px;">Interior Villa</h1>
              <p style="color: #666; margin: 5px 0 0 0;">New Contact Form Submission</p>
            </div>
            
            <div style="border-left: 4px solid #75BF44; padding-left: 20px; margin-bottom: 25px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Contact Details</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Name:</strong>
                <span style="color: #333; margin-left: 10px;">${formData.name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Email:</strong>
                <span style="color: #333; margin-left: 10px;">${formData.email}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Message:</strong>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border: 1px solid #e9ecef;">
                  <p style="color: #333; margin: 0; line-height: 1.6;">${formData.message}</p>
                </div>
              </div>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 14px;">
                This email was sent from the Interior Villa website contact form.
              </p>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
                Received on: ${new Date().toLocaleString('en-US', { 
                  timeZone: 'Asia/Dhaka',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} (Bangladesh Time)
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission - Interior Villa
        
        Name: ${formData.name}
        Email: ${formData.email}
        
        Message:
        ${formData.message}
        
        Received on: ${new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Dhaka',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} (Bangladesh Time)
      `
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error(error.message || 'Failed to send email');
  }
};

export const sendAppointmentEmail = async (formData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Interior Villa <onboarding@resend.dev>',
      to: ['bdtechnocrats@gmail.com'],
      subject: 'New Appointment Request - Interior Villa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #75BF44; margin: 0; font-size: 28px;">Interior Villa</h1>
              <p style="color: #666; margin: 5px 0 0 0;">New Appointment Request</p>
            </div>
            
            <div style="border-left: 4px solid #EE5428; padding-left: 20px; margin-bottom: 25px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Appointment Details</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Name:</strong>
                <span style="color: #333; margin-left: 10px;">${formData.name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Mobile Number:</strong>
                <span style="color: #333; margin-left: 10px;">${formData.mobile}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #555;">Address:</strong>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border: 1px solid #e9ecef;">
                  <p style="color: #333; margin: 0; line-height: 1.6;">${formData.address}</p>
                </div>
              </div>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; border: 1px solid #ffeaa7; margin-bottom: 20px;">
              <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">📅 Action Required</h3>
              <p style="color: #856404; margin: 0; font-size: 14px;">
                Please contact the client within 24 hours to schedule their appointment.
              </p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 14px;">
                This appointment request was submitted through the Interior Villa website.
              </p>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
                Received on: ${new Date().toLocaleString('en-US', { 
                  timeZone: 'Asia/Dhaka',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} (Bangladesh Time)
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Appointment Request - Interior Villa
        
        Name: ${formData.name}
        Mobile Number: ${formData.mobile}
        
        Address:
        ${formData.address}
        
        Action Required: Please contact the client within 24 hours to schedule their appointment.
        
        Received on: ${new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Dhaka',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} (Bangladesh Time)
      `
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error(error.message || 'Failed to send email');
  }
};